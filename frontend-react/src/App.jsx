import { useState, useEffect } from 'react'
import Navbar from './Navbar.jsx'
import ProductCard from './ProductCard.jsx'
import Footer from './Footer.jsx'
import Contador from './Contador.jsx'

function App() {
  const [busqueda, setBusqueda] = useState("")
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // EJERCICIO 1: Lógica extraída a una función reutilizable
  const cargarProductos = () => {
    setCargando(true)
    setError(null)
    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((datos) => setProductos(datos))
      .catch(() => setError("No se pudo conectar al servidor. ¿Está el backend corriendo?"))
      .finally(() => setCargando(false))
  }

  // Se ejecuta al montar el componente
  useEffect(() => {
    cargarProductos()
  }, [])

  const productosFiltrados = productos.filter((p) => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto p-6 flex-grow">
        <div className="mb-8 flex justify-center">
          <Contador />
        </div>

        {/* Controles: Buscador, Limpiar, Recargar y Contadores */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 justify-center">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full sm:max-w-md px-4 py-2 border-2 border-slate-200 rounded-lg"
          />
          
          <button 
            onClick={() => setBusqueda("")}
            className="w-full sm:w-auto px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition"
          >
            Limpiar
          </button>

          {/* EJERCICIO 1: Botón de recarga manual */}
          <button
            onClick={cargarProductos}
            disabled={cargando}
            className="w-full sm:w-auto px-4 py-2 bg-verde text-white rounded-lg font-bold text-sm whitespace-nowrap hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {cargando ? "Cargando..." : "↻ Recargar"}
          </button>
          
          {/* EJERCICIO 2: Contadores de resultados */}
          {!cargando && !error && (
            <div className="text-sm text-texto-dim whitespace-nowrap flex flex-col items-end">
              <span className="font-medium">{productosFiltrados.length} encontrado(s)</span>
              <span className="text-xs">({productos.length} en total en la BD)</span>
            </div>
          )}
        </div>
        
        {/* Estados de carga y error */}
        {cargando && <p className="text-center py-10 text-lg text-slate-500 animate-pulse">Cargando productos desde el backend...</p>}
        {error && <p className="text-center text-red-600 py-10 text-lg font-bold">{error}</p>}
        
        {/* Renderizado del catálogo */}
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
                  stock={p.stock || 0}
                />
              ))}
            </section>

            {productosFiltrados.length === 0 && (
              <p className="text-center text-texto-dim py-10 text-lg">
                No se encontraron productos con ese nombre.
              </p>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
