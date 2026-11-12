import { createContext, useState, useContext, useEffect } from "react"

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito")
    return guardado ? JSON.parse(guardado) : []
  })

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
  }, [carrito])

  function agregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id)
      if (existe) {
        return prev.map((p) => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p)
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  function aumentarCantidad(id) {
    setCarrito((prev) => prev.map((p) => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
  }

  function disminuirCantidad(id) {
    setCarrito((prev) =>
      prev.map((p) => p.id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p)
          .filter((p) => p.cantidad > 0)
    )
  }

  function quitarDelCarrito(id) {
    setCarrito((prev) => prev.filter((p) => p.id !== id))
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, aumentarCantidad, disminuirCantidad, quitarDelCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => useContext(CarritoContext)