import React from 'react'
import carroIcon from './assets/carritoIcon.png'
import { cartContext, useCartContext } from '../../context/cartContext';

function Carrito() {
  const { cart } = useCartContext()

  return (
  <div className="carritoWidget">
   <img className="carritoIcon" src={carroIcon}></img>
    <p className="carritoCantidad">{cart.length}</p>   
  </div>
  );
}

export default Carrito