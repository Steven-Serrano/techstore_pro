import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-20">
      <h1 className="text-6xl font-extrabold text-texto-dim">404</h1>
      <p className="text-texto-dim text-xl">Esta página no existe.</p>
      <Link to="/" className="text-verde font-bold underline hover:opacity-80 transition mt-4">
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound
