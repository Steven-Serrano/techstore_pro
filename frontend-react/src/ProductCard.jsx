function ProductCard(props) {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4">
      {/* Imagen con altura fija y object-cover */}
      <div className="mb-4">
        <img 
          src={props.imagen} 
          alt={props.nombre}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      
      {/* Contenido */}
      <div className="flex flex-col flex-grow gap-2">
        <h3 className="font-bold text-lg text-gray-800">
          {props.nombre}
        </h3>
        
        <p className="text-texto-dim text-sm flex-grow">
          {props.descripcion}
        </p>
        
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-100">
          <p className="text-verde font-extrabold">
            {props.precio}
          </p>
          <p className="text-texto-dim text-xs">
            Stock: {props.stock || 0} unidades
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
