import { useState } from 'react'
import { useCartContext } from '../../context/cartContext'

function ItemCount({ producto }) {
  const [count, setCount] = useState(1)

  const { addToCart } = useCartContext() 
  
  const add = () => {
    if (count < producto.stock) {  
      setCount(count + 1)
    } else {
      alert('No hay suficiente stock disponible')
    }
  }
 
  const subtract = () => setCount(count > 1 ? count - 1 : count)
  
  const handleAddToCart = () => {
    if (count <= producto.stock) {
      addToCart({...producto, qty: count})
      setCount(1)
    } else {
      alert('Cantidad seleccionada supera el stock disponible')
    }
  }

  return (
    <div className="containerItemCount">      
      <p className="cantItemCount">Cantidad</p>
      <div className="containerControlCount">
        
        <button className="btnSubtractCount" onClick={subtract} disabled={count <= 1}>-</button>
        <p className="cantCount">{count}</p>
       
        <button className="btnAddCount" onClick={add} disabled={count >= producto.stock}>+</button>   
      </div>      
      
      <button 
        className="btnAgregarCarro" 
        onClick={handleAddToCart}
        disabled={producto.stock === 0 || count > producto.stock}
      >
        {producto.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>        
    </div>
  )
}

export default ItemCount