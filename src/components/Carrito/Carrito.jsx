import React from 'react'
import carroIcon from './assets/carritoIcon.png'

function Carrito() {
  return (
  <div className="carritoWidget">
   <img className="carritoIcon" src={carroIcon}></img>
    <p className="carritoCantidad">10</p>   
  </div>
  );
}

export default Carrito