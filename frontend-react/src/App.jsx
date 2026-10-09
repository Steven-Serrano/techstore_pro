import { useState } from 'react'
import Navbar from './Navbar.jsx'
import ProductCard from './ProductCard.jsx'
import Footer from './Footer.jsx'
import Contador from './Contador.jsx'

const productos = [
  {
    nombre: 'Mouse Inalámbrico',
    descripcion: 'Mouse ergonómico, conexión Bluetooth',
    precio: '$89.900',
    imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
    stock: 12
  },
  {
    nombre: 'Teclado Mecánico',
    descripcion: 'Switches azules, retroiluminado RGB',
    precio: '$149.900',
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop',
    stock: 5
  },
  {
    nombre: 'Monitor 24"',
    descripcion: 'Full HD, 75Hz, panel IPS',
    precio: '$899.900',
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop',
    stock: 8
  },
  {
    nombre: 'Audífonos Bluetooth',
    descripcion: 'Cancelación de ruido, 20h de batería',
    precio: '$199.900',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    stock: 20
  }
]

function App() {
  const [busqueda, setBusqueda] = useState("")

  const productosFiltrados = productos.filter((p) => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto p-6 flex-grow">
        {/* Contador visible para probar el límite en 0 */}
        <div className="mb-8 flex justify-center">
          <Contador />
        </div>

        {/* Buscador y contador de resultados */}
        <div className="flex items-center gap-3 mb-6 justify-center">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full max-w-md px-4 py-2 border-2 border-slate-200 rounded-lg"
          />
          <p className="text-sm text-texto-dim whitespace-nowrap">
            {productosFiltrados.length} producto(s) encontrado(s)
          </p>
        </div>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFiltrados.map((p) => (
            <ProductCard
              key={p.nombre}
              nombre={p.nombre}
              descripcion={p.descripcion}
              precio={p.precio}
              imagen={p.imagen}
              stock={p.stock}
            />
          ))}
        </section>

        {/* Mensaje cuando no hay resultados */}
        {productosFiltrados.length === 0 && (
          <p className="text-center text-texto-dim py-10">
            No se encontraron productos con ese nombre.
          </p>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
