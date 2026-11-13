import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useCarrito } from "../context/CarritoContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"

const MENSAJES = {
  PENDING:   { titulo: "Confirmando tu pago",        texto: "Estamos esperando la respuesta de Wompi. No cierres esta página." },
  APPROVED:  { titulo: "Pago aprobado",              texto: "Tu compra quedó registrada y tu carrito está vacío." },
  DECLINED:  { titulo: "Pago rechazado",             texto: "El banco no aprobó el pago. Tu carrito sigue como estaba." },
  ERROR:     { titulo: "El pago no se pudo completar", texto: "Hubo un error en el proceso. Tu carrito sigue como estaba." },
  VOIDED:    { titulo: "El pago fue anulado",        texto: "La transacción se anuló. Tu carrito sigue como estaba." },
  TIMEOUT:   { titulo: "Todavía no tenemos respuesta", texto: "No pudimos confirmar el pago. Si no pagaste, tu carrito sigue como estaba." },
}

function PagoResultado() {
  const { referencia } = useParams()
  const { vaciarCarrito } = useCarrito()
  const { usuario } = useAuth()
  const [estado, setEstado] = useState("PENDING")

  // Preguntar cada 3 segundos, con el token CORRECTO (usuario.token)
  useEffect(() => {
    let intentos = 0
    const intervalo = setInterval(async () => {
      intentos++
      if (intentos > 20) {
        clearInterval(intervalo)
        setEstado("TIMEOUT")
        return
      }
      try {
        const respuesta = await fetch(
          "http://localhost:3000/api/pagos/estado/" + referencia,
          { headers: { Authorization: "Bearer " + (usuario?.token || "") } }
        )
        const datos = await respuesta.json()
        if (datos.status && datos.status !== "PENDING") {
          clearInterval(intervalo)
          setEstado(datos.status)
        }
      } catch (e) {
        console.error("No se pudo consultar el pago", e)
      }
    }, 3000)

    return () => clearInterval(intervalo)
  }, [referencia, usuario])

  // SOLO vaciar cuando el pago esté APROBADO (nunca en PENDING)
  // ✅ DESPUÉS (solo depende de `estado`)
    useEffect(() => {
  if (estado === "APPROVED") vaciarCarrito()
}, [estado])

  const mensaje = MENSAJES[estado] || MENSAJES.ERROR

  return (
    <section className="max-w-md mx-auto text-center flex flex-col items-center gap-5 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-gray-500">Pago</p>
      <h1 className="font-display font-bold text-4xl tracking-tighter">
        {mensaje.titulo}<span className="text-accent">.</span>
      </h1>
      <p className="text-gray-700">{mensaje.texto}</p>
      <p className="font-mono text-xs text-gray-500">Referencia: {referencia}</p>

      {estado === "APPROVED" && (
        <Link to="/productos" className="bg-ink text-paper px-6 py-3 rounded-card text-sm font-semibold hover:bg-accent transition-colors">
          Seguir comprando
        </Link>
      )}
      {estado !== "PENDING" && estado !== "APPROVED" && (
        <Link to="/carrito" className="bg-ink text-paper px-6 py-3 rounded-card text-sm font-semibold hover:bg-accent transition-colors">
          Volver al carrito
        </Link>
      )}
    </section>
  )
}

export default PagoResultado