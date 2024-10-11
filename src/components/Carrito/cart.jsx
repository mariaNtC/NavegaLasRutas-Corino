import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

function Cart () {
    const { cart, removeFromCart } = useCartContext(); 
    
    return (
        
        <div className="containerCart">
           {cart.map(prod => 
                <div className="cartItem" key={prod.id}>
                    <div className="containerDatosProducto">
                        <img className="cartItemImage" src={prod.image} alt={prod.name} />
                        <p className="textCart">{prod.name} x {prod.qty}</p>  
                    </div>  
                    <div className="containerBtnQuitar">
                        <button className="btnQuitar" alt="Quitar producto" onClick={() => removeFromCart(prod.id)}>
                                <img className="btnQuitarImg" title="Quitar producto" alt="Quitar producto" src="https://i.ibb.co/ngcKsv1/tacho-Tienda.png"></img>
                        </button> 
                    </div>
                </div>
            )} 
           {cart.length > 0 ? (
               
                   <Link className="linkFinalizarCompra" to='/checkout'>
                        <button className="btnFinalizarCompra">
                            Finalizar compra
                        </button>
                    </Link>
               
           ) : (
               <button className="btnFinalizarCompraDisabled" disabled>NO TIENES PRODUCTOS EN EL CARRITO</button>
           )}
        </div>
        
    );
    
}

export default Cart;