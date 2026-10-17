import { useState, useEffect } from 'react'
import ProductCard from './ProductCard.jsx'

function Productos() {
  const [busqueda, setBusqueda] = useState("")
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const cargarProductos = () => {
    setCargando(true)
    setError(null)
    
    fetch("http://localhost:3000/api/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error del servidor: " + res.status)
        return res.json()
      })
      .then((datos) => setProductos(datos))
      .catch(() => setError("No se pudo conectar al servidor. ¿Está el backend corriendo?"))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  const productosFiltrados = productos.filter((p) => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-8">
      {/* Barra de controles */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-verde transition"
        />
        
        <button 
          onClick={() => setBusqueda("")}
          className="w-full sm:w-auto px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition"
        >
          Limpiar
        </button>

        <button
          onClick={cargarProductos}
          disabled={cargando}
          className="w-full sm:w-auto px-4 py-2 bg-verde text-white rounded-lg font-bold text-sm whitespace-nowrap hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {cargando ? "Cargando..." : "↻ Recargar"}
        </button>
        
        {!cargando && !error && (
          <div className="text-sm text-texto-dim whitespace-nowrap flex flex-col items-end min-w-[120px]">
            <span className="font-medium text-gray-700">{productosFiltrados.length} encontrado(s)</span>
            <span className="text-xs">({productos.length} en total en la BD)</span>
          </div>
        )}
      </div>

      {/* Estados */}
      {cargando && <p className="text-center py-10 text-lg text-slate-500 animate-pulse">Cargando productos desde el backend...</p>}
      {error && <p className="text-center text-red-600 py-10 text-lg font-bold bg-red-50 rounded-lg border border-red-200">⚠️ {error}</p>}
      
      {/* Catálogo */}
      {!cargando && !error && (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosFiltrados.map((p) => (
              <ProductCard
                key={p.id || p.nombre}
                nombre={p.nombre}
                descripcion={p.descripcion}
                precio={p.precio}
                imagen={p.imagen}
                icono={p.icono}
                stock={p.stock || 0}
              />
            ))}
          </section>

          {productosFiltrados.length === 0 && (
            <p className="text-center text-texto-dim py-10 text-lg bg-white rounded-xl border border-gray-100">
              No se encontraron productos con ese nombre.
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default Productos
