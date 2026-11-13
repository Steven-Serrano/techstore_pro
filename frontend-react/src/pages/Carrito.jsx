import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCarrito } from "../context/CarritoContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"

function precioANumero(precioTexto) {
  return Number(precioTexto.replace(/\D/g, ""))
}

function numeroAPrecio(numero) {
  return "$" + numero.toLocaleString("es-CO")
}

function Carrito() {
  const { carrito, aumentarCantidad, disminuirCantidad, quitarDelCarrito, vaciarCarrito } = useCarrito()
  const { usuario } = useAuth()
  const navegar = useNavigate()
  const [confirmando, setConfirmando] = useState(false)
  const [pagando, setPagando] = useState(false)
  const [error, setError] = useState("")

  const unidades = carrito.reduce((suma, item) => suma + item.cantidad, 0)
  const total = carrito.reduce((suma, item) => suma + precioANumero(item.precio) * item.cantidad, 0)

  function irAIngresar() {
    navegar("/login", { state: { aviso: "Inicia sesión para continuar con tu compra", desde: "/carrito" } })
  }

  async function pagar() {
    setError("")
    setPagando(true)
    try {
      const respuesta = await fetch("http://localhost:3000/api/pagos/firma", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ✅ AHORA (Toma el token del objeto usuario que ya tienes)
          Authorization: "Bearer " + usuario.token,
        },
        body: JSON.stringify({
          productos: carrito.map((item) => ({ id: item.id, cantidad: item.cantidad })),
        }),
      })
      const datos = await respuesta.json()

      if (!respuesta.ok) {
        setError(datos.error || "No se pudo preparar el pago")
        setPagando(false)
        return
      }

      const checkout = new window.WidgetCheckout({
        currency: datos.currency,
        amountInCents: datos.amountInCents,
        reference: datos.reference,
        publicKey: datos.publicKey,
        signature: { integrity: datos.signature },
      })

      checkout.open(() => navegar("/pago/" + datos.reference))
    } catch {
      setError("No se pudo conectar con el servidor. Revisa que el backend esté encendido.")
      setPagando(false)
    }
  }

  if (carrito.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="font-display font-bold text-3xl mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-6">Parece que aún no has agregado nada.</p>
        <Link to="/productos" className="bg-ink text-paper px-6 py-3 rounded-card font-semibold hover:bg-accent transition">Ver productos</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="font-display font-bold text-4xl mb-8">Tu Carrito</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          {carrito.map((producto) => (
            <div key={producto.id} className="flex items-center gap-4 bg-paper p-4 rounded-card shadow-sm border border-gray-100">
              <img src={producto.imagen} alt={producto.nombre} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{producto.nombre}</h3>
                <p className="font-mono text-accent font-bold">{producto.precio}</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                <button onClick={() => disminuirCantidad(producto.id)} className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-gray-100 font-bold text-gray-700">−</button>
                <span className="w-6 text-center font-semibold">{producto.cantidad}</span>
                <button onClick={() => aumentarCantidad(producto.id)} className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-gray-100 font-bold text-gray-700">+</button>
              </div>
              <button onClick={() => quitarDelCarrito(producto.id)} className="text-gray-400 hover:text-red-500 transition p-2">🗑️</button>
            </div>
          ))}
          <div className="mt-4">
            {!confirmando ? (
              <button onClick={() => setConfirmando(true)} className="text-sm text-red-600 hover:text-red-800 underline font-semibold">Vaciar todo el carrito</button>
            ) : (
              <div className="flex items-center gap-3 bg-red-50 p-3 rounded-card">
                <p className="text-sm text-red-800 font-semibold">¿Estás seguro?</p>
                <button onClick={() => { vaciarCarrito(); setConfirmando(false); }} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700">Sí, vaciar</button>
                <button onClick={() => setConfirmando(false)} className="text-xs bg-gray-200 text-gray-800 px-3 py-1.5 rounded hover:bg-gray-300">Cancelar</button>
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-80">
          <div className="bg-gray-50 p-6 rounded-card border border-gray-100 sticky top-24">
            <h2 className="font-display font-bold text-xl mb-4">Resumen</h2>
            <div className="flex justify-between mb-2 text-gray-600"><span>Subtotal</span><span className="font-mono">{numeroAPrecio(total)}</span></div>
            <div className="flex justify-between mb-4 text-gray-600"><span>Envío</span><span className="font-mono">Gratis</span></div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="font-mono text-accent">{numeroAPrecio(total)}</span></div>
            </div>
            
            {usuario ? (
              <>
                <button onClick={pagar} disabled={pagando} className="w-full bg-ink text-paper py-3.5 rounded-card font-bold hover:bg-accent transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {pagando ? "Preparando pago…" : "Pagar con Wompi"}
                </button>
                {error && <p className="text-sm text-accent-dark mt-2 text-center">{error}</p>}
              </>
            ) : (
              <button onClick={irAIngresar} className="w-full bg-ink text-paper py-3.5 rounded-card font-bold hover:bg-accent transition">
                Inicia sesión para pagar
              </button>
            )}
            
            <Link to="/productos" className="block text-center text-sm text-gray-600 hover:text-ink mt-4 underline">Seguir comprando</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Carrito