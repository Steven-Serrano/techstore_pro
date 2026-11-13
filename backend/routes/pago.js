const express        = require('express');
const crypto         = require('crypto');
const Orden          = require('../models/Orden');
const Producto       = require('../models/Producto'); // <-- NUEVO: Para calcular el total real
const Transaccion    = require('../models/Transaccion');
const verificarToken = require('../middleware/auth');
const router         = express.Router();

// ====================================================================
// POST /api/pagos/firma
// El navegador solo dice QUÉ productos y CUÁNTOS. 
// El servidor calcula el total con los precios de la base de datos.
// ====================================================================
router.post('/firma', verificarToken, async (req, res) => {
  const { productos } = req.body; // <-- Ya no leemos 'total' del body

  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'Carrito vacío' });
  }

  // 1. Validar que cada línea tenga id y cantidad válidos (números enteros >= 1)
  const lineas = [];
  for (const p of productos) {
    const id = Number(p?.id);
    const cantidad = Number(p?.cantidad);
    if (!Number.isInteger(id) || !Number.isInteger(cantidad) || cantidad < 1) {
      return res.status(400).json({ error: 'Carrito con productos inválidos' });
    }
    lineas.push({ id, cantidad });
  }

  try {
    // 2. Traer de la base de datos los productos del carrito con sus precios reales
    const ids = lineas.map((l) => l.id);
    const enBase = await Producto.find({ id: { $in: ids } });

    // 3. Calcular el total en el servidor y armar las líneas para la Orden
    let total = 0;
    const items = [];
    for (const l of lineas) {
      const prod = enBase.find((x) => x.id === l.id);
      if (!prod) return res.status(400).json({ error: 'Carrito con productos inválidos' });
      
      // Quitamos '$' y '.' del precio (ej: "$1.200.000" -> 1200000) y multiplicamos por cantidad
      const precioNumerico = Number(prod.precio.replace(/[$.]/g, ''));
      total += precioNumerico * l.cantidad;
      
      // Guardamos el _id de MongoDB para el modelo Orden
      items.push({ producto: prod._id, cantidad: l.cantidad });
    }
    
    if (!total) return res.status(400).json({ error: 'No se pudo calcular el total' });

    // 4. Generar datos para Wompi
    const reference = `TS-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const amountInCents = Math.round(total * 100); // Wompi trabaja en centavos
    const currency = 'COP';

    // 5. Calcular firma de integridad (fórmula oficial de Wompi)
    const raw = `${reference}${amountInCents}${currency}${process.env.WOMPI_INTEGRITY_SECRET}`;
    const signature = crypto.createHash('sha256').update(raw).digest('hex');

    // 6. Guardar la transacción en estado PENDING con los datos validados por el servidor
    await Transaccion.create({
      wompiReference: reference, 
      amountInCents, 
      currency,
      status: 'PENDING',
      pendingOrderData: { 
        usuario: req.usuario.id, 
        productos: items, // Usamos los items validados con _id de MongoDB
        total 
      }
    });

    // 7. Devolver los datos al frontend para que abra el Widget de Wompi
    res.json({
      reference, 
      amountInCents, 
      currency, 
      signature,
      publicKey: process.env.WOMPI_PUBLIC_KEY
    });

  } catch (err) {
    console.error('Error en /api/pagos/firma:', err);
    res.status(500).json({ error: 'Error al generar la firma' });
  }
});

// ====================================================================
// Función auxiliar: Crea la Orden cuando Wompi confirma APPROVED
// ====================================================================
async function confirmarAprobado(transaccion, wompiTx) {
  transaccion.status = wompiTx.status;
  transaccion.wompiTransactionId = wompiTx.id;

  if (wompiTx.status === 'APPROVED' && !transaccion.orden) {
    const pod = transaccion.pendingOrderData;
    const orden = await Orden.create({
      usuario: pod.usuario, 
      productos: pod.productos, 
      total: pod.total,
      wompiTransactionId: wompiTx.id, 
      wompiReference: wompiTx.reference,
      estado: 'PAGO_CONFIRMADO'
    });
    transaccion.orden = orden._id;
  }
  await transaccion.save();
}

// ====================================================================
// GET /api/pagos/estado/:reference (Polling)
// El frontend consulta cada 3 segundos. Si está PENDING, preguntamos a Wompi.
// ====================================================================
router.get('/estado/:reference', verificarToken, async (req, res) => {
  try {
    const tx = await Transaccion.findOne({ wompiReference: req.params.reference });
    if (!tx) return res.status(404).json({ error: 'Transacción no encontrada' });

    if (tx.status === 'PENDING') {
      // Consultamos a la API de Wompi usando la LLAVE PRIVADA
      const wompiRes = await fetch(
        `https://sandbox.wompi.co/v1/transactions?reference=${tx.wompiReference}`,
        { headers: { Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}` } }
      );

      if (wompiRes.ok) {
        const wompiJson = await wompiRes.json();
        const wompiTx = wompiJson.data?.[0];

        if (wompiTx && wompiTx.status !== 'PENDING') {
          await confirmarAprobado(tx, wompiTx);
        }
      } else {
        console.error('Error consultando Wompi:', wompiRes.status);
      }
    }

    res.json({ status: tx.status, ordenId: tx.orden ?? null });
  } catch (err) {
    console.error('Error en /api/pagos/estado:', err);
    res.status(500).json({ error: 'Error interno' });
  }
});

// ====================================================================
// POST /api/pagos/webhook
// Wompi llama a esta ruta en producción (no se usa en localhost, pero se deja listo)
// ====================================================================
router.post('/webhook', async (req, res) => {
  const { signature, timestamp, data } = req.body;
  const secret = process.env.WOMPI_EVENTS_SECRET;
  
  if (!secret) return res.status(200).json({ ok: true }); // Modo dev sin secreto

  const tx = data?.transaction;
  if (!tx) return res.status(400).json({ error: 'Payload inválido' });

  // Verificar firma del webhook
  const props = (signature?.properties || []).map((prop) => {
    const path = prop.split('.').slice(1);
    let v = tx; 
    for (const k of path) v = v?.[k]; 
    return v;
  }).join('');

  const computed = crypto.createHash('sha256')
    .update(`${props}${timestamp}${secret}`).digest('hex');
    
  if (computed !== signature?.checksum) {
    return res.status(400).json({ error: 'Firma inválida' });
  }

  const transaccion = await Transaccion.findOne({ wompiReference: tx.reference });
  if (!transaccion) return res.status(404).json({ error: 'Transacción no encontrada' });

  await confirmarAprobado(transaccion, tx);
  res.json({ ok: true });
});

module.exports = router;