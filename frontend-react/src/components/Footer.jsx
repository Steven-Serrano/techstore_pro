function Footer() {
  return (
    <footer className="bg-ink text-gray-300 py-8 px-6 rounded-t-2xl mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-wordmark text-xl text-paper">
          TechStore <span className="text-accent">Pro</span>
        </div>
        <p className="text-sm font-display text-gray-500">
          © 2026 TechStore Pro. Todos los derechos reservados.
        </p>
        <div className="flex gap-4 text-sm font-display">
          <a href="#" className="hover:text-accent transition">Términos</a>
          <a href="#" className="hover:text-accent transition">Privacidad</a>
        </div>
      </div>
    </footer>
  )
}
export default Footer
