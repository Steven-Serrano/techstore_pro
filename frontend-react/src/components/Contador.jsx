import { useState } from 'react'

function Contador() {
  const [cuenta, setCuenta] = useState(0)

  return (
    <div className="flex flex-col items-center gap-3 p-6 bg-paper rounded-xl shadow-md border border-gray-100">
      <p className="text-4xl font-mono font-extrabold text-accent">{cuenta}</p>
      <div className="flex gap-3">
        <button
          onClick={() => setCuenta(cuenta > 0 ? cuenta - 1 : 0)}
          className="w-10 h-10 bg-gray-100 text-ink rounded-lg font-bold text-xl hover:bg-gray-300 transition"
        >
          −
        </button>
        <button
          onClick={() => setCuenta(cuenta + 1)}
          className="w-10 h-10 bg-accent text-paper rounded-lg font-bold text-xl hover:bg-accent-dark transition"
        >
          +
        </button>
        <button
          onClick={() => setCuenta(0)}
          className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-300 transition"
          title="Resetear a 0"
        >
          ↺
        </button>
      </div>
    </div>
  )
}
export default Contador
