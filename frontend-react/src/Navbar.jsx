import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const ubicacion = useLocation()

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white border-b border-slate-200 rounded-xl shadow-sm">
      <Link to="/" className="text-xl font-extrabold text-verde hover:opacity-80 transition">
        TechStore Pro
      </Link>
      
      <ul className="hidden md:flex gap-6 text-sm font-semibold text-texto-dim">
        <li>
          <Link 
            to="/" 
            className={`transition ${ubicacion.pathname === '/' ? 'text-verde font-extrabold' : 'hover:text-verde'}`}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link 
            to="/productos" 
            className={`transition ${ubicacion.pathname === '/productos' ? 'text-verde font-extrabold' : 'hover:text-verde'}`}
          >
            Productos
          </Link>
        </li>
        <li className="text-slate-300 cursor-not-allowed">Nosotros</li>
        <li className="text-slate-300 cursor-not-allowed">Contacto</li>
      </ul>
      
      <button className="bg-verde text-white py-2 px-5 rounded-lg font-bold text-sm hover:opacity-90 transition">
        Ingresar
      </button>
    </nav>
  )
}

export default Navbar
