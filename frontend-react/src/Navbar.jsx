import { Link, useLocation } from 'react-router-dom'
import { useCarrito } from './context/CarritoContext.jsx'
import { useAuth } from './context/AuthContext.jsx'

function Navbar() {
  const ubicacion = useLocation()
  const { carrito, vaciarCarrito } = useCarrito()
  const { usuario, login, logout } = useAuth()

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-4 bg-paper border-b border-gray-100 rounded-xl shadow-sm sticky top-0 z-50">
      <Link to="/" className="font-wordmark text-xl text-ink hover:text-accent transition">
        TechStore Pro
      </Link>
      
      <ul className="hidden md:flex gap-6 text-sm font-display font-medium text-gray-500">
        <li><Link to="/" className={`transition ${ubicacion.pathname === '/' ? 'text-accent font-bold' : 'hover:text-ink'}`}>Inicio</Link></li>
        <li><Link to="/productos" className={`transition ${ubicacion.pathname === '/productos' ? 'text-accent font-bold' : 'hover:text-ink'}`}>Productos</Link></li>
        <li><Link to="/nosotros" className={`transition ${ubicacion.pathname === '/nosotros' ? 'text-accent font-bold' : 'hover:text-ink'}`}>Nosotros</Link></li>
        <li><Link to="/contacto" className={`transition ${ubicacion.pathname === '/contacto' ? 'text-accent font-bold' : 'hover:text-ink'}`}>Contacto</Link></li>
      </ul>
      
      <div className="flex items-center gap-4">
        <div className="relative flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          {carrito.length > 0 && (
            <>
              <span className="absolute -top-2 -right-2 bg-accent text-paper text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-sm">
                {carrito.length}
              </span>
              <button onClick={vaciarCarrito} className="text-xs text-gray-500 hover:text-accent font-bold ml-4 transition" title="Vaciar carrito">🗑️</button>
            </>
          )}
        </div>
        <button onClick={() => usuario ? logout() : login('Admin')} className="bg-ink text-paper py-2 px-5 rounded-lg font-display font-bold text-sm hover:bg-accent transition">
          {usuario ? `Salir (${usuario.nombre})` : 'Ingresar'}
        </button>
      </div>
    </nav>
  )
}
export default Navbar
