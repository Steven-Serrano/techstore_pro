const estiloInput = "w-full px-4 py-3 rounded-card border bg-paper text-sm focus:outline-none focus:border-ink transition-colors"

function claseInput(error) {
  return estiloInput + (error ? " border-accent" : " border-gray-300")
}

function Campo({ etiqueta, nombre, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={nombre} className="text-sm font-semibold">{etiqueta}</label>
      {children}
      {error && <span className="text-xs text-accent-dark">{error}</span>}
    </div>
  )
}

export default Campo
export { claseInput }