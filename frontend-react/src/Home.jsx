import { useNavigate } from 'react-router-dom'
import Contador from './Contador.jsx'

function Home() {
  const navegar = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-verde">
        Bienvenido a TechStore Pro
      </h1>
      <p className="text-texto-dim max-w-md text-lg">
        Tecnología de calidad, al mejor precio. Explora nuestro catálogo de productos.
      </p>
      
      {/* Ejercicio 3: Navegación programática con código */}
      <button
        onClick={() => navegar("/productos")}
        className="bg-verde text-white py-3 px-8 rounded-lg font-bold text-lg hover:opacity-90 transition shadow-md hover:shadow-lg mt-4"
      >
        Ver catálogo
      </button>

      {/* Contador visible (solicitado anteriormente para seguir probando estados) */}
      <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-100 w-full max-w-sm">
        <p className="text-sm text-texto-dim mb-3 font-medium">Prueba de estado (Sesión 23):</p>
        <Contador />
      </div>
    </div>
  )
}

export default Home
