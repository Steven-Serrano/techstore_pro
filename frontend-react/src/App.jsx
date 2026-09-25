function App() {
  return (

  <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">

    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
      <div className="text-xl font-extrabold text-verde">
        TechStore Pro
      </div>
      <ul className=" hidden md:flex flex gap-6 text-sm font-semibold text-texto-dim">
        <li>Inicio</li>
        <li>Productos</li>
        <li>Nosotros</li>
        <li>Contacto</li>
      </ul>
      <button className="bg-verde text-white py-2 px-5 rounded-lg font-bold text-sm">
        Ingresar
      </button>
    </nav>

    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {/* Tarjeta 1 */}
  <div className="flex flex-col gap-2 p-4 rounded-xl shadow-md bg-white">
    <img src="https://placehold.co/300x200" className="rounded-lg" />
    <h3 className="font-bold text-lg">Mouse Inalámbrico</h3>
    <p className="text-texto-dim text-sm">Mouse ergonómico, conexión Bluetooth</p>
    <p className="text-verde font-extrabold">$89.900</p>
  </div>

  {/* Tarjeta 2 */}
  <div className="flex flex-col gap-2 p-4 rounded-xl shadow-md bg-white">
    <img src="https://placehold.co/300x200" className="rounded-lg" />
    <h3 className="font-bold text-lg">Teclado Mecánico</h3>
    <p className="text-texto-dim text-sm">Switches azules, retroiluminado RGB</p>
    <p className="text-verde font-extrabold">$149.900</p>
  </div>

  {/* Tarjeta 3 */}
  <div className="flex flex-col gap-2 p-4 rounded-xl shadow-md bg-white">
    <img src="https://placehold.co/300x200" className="rounded-lg" />
    <h3 className="font-bold text-lg">Monitor 24"</h3>
    <p className="text-texto-dim text-sm">Full HD, 75Hz, panel IPS</p>
    <p className="text-verde font-extrabold">$899.900</p>
  </div>

   {/* Tarjeta 4 */}
  <div className="flex flex-col gap-2 p-4 rounded-xl shadow-md bg-white">
    <img src="https://placehold.co/300x200" className="rounded-lg" />
    <h3 className="font-bold text-lg">Audífonos Bluetooth</h3>
    <p className="text-texto-dim text-sm">Cancelación de ruido,20h de batería</p>
    <p className="text-verde font-extrabold">$199.900</p>
  </div>

</section>

     <footer className="flex  flex-col md:flex-row justify-between items-center gap-2 md:gap-0 p-6 bg-texto text-white">
        <p>© 2026 TechStore Pro</p>
        <p className="text-sm">Hecho con Tailwind CSS</p>
     </footer>

  </main>
  )
}

export default App