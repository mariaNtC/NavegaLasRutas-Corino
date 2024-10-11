import { cartContext } from "./cartContext"
import { useState } from 'react'
import Swal from 'sweetalert2'

function CartProvider ({children}) {
    const [cart, setCart] = useState([])

    const isDuplicate = producto => cart.some(prod => prod.id === producto.id)

    const addToCart = (producto) => {
        if (isDuplicate(producto)) {
            const updateCart = cart.map((prod) =>
            prod.id === producto.id ? { ...prod, qty: prod.qty + producto.qty } : prod
            );
           
        setCart(updateCart)   

        Swal.fire({
            icon: "success",
            title: "Producto actualizado",
            text:
              producto.qty === 1
                ? `Se le ha sumado 1 unidad al producto '${producto.name}', que ya tenías en el carrito.`
                : `Se le han sumado ${producto.qty} unidades al producto '${producto.name}', que ya tenías en el carrito.`,
            confirmButtonText: "Aceptar",
          });
        
    } else {
        setCart([...cart, producto])
        Swal.fire({
            icon: "success",
            title: "Producto añadido",
            text: `Se ha añadido el producto '${producto.name}' al carrito con ${producto.qty} unidades.`,
            confirmButtonText: "Aceptar",
          });
      }
    }

    const getTotal = () => {
        const pricesOnly = cart.map(prod => prod.price*prod.qty)
        const totalPrice = pricesOnly.reduce((acc, current) => acc + current, 0)        

        return totalPrice
    }
    
    const removeFromCart = (id) => {
        const updatedCart = cart.filter(prod => prod.id !== id);         
        setCart(updatedCart); 
        Swal.fire({
            icon: "info",
            title: "Producto eliminado",
            text: `Se ha eliminado el producto con ID '${id}' del carrito.`,
            confirmButtonText: "Aceptar",
          });
    };

    const clearCart = () => {
        setCart([]);
      };
    
    return (
        <cartContext.Provider value={{cart, addToCart, getTotal, removeFromCart, clearCart}}>
            {children}
        </cartContext.Provider>    
    )
}

export default CartProvider