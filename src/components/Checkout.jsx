import { useCartContext } from "../context/cartContext";
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from "react";
import { createOrder, updateProductStock, getProductById } from "../firebase/db";
import { serverTimestamp } from "firebase/firestore";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


function Checkout() {
  const { cart, getTotal, clearCart } = useCartContext();
  const total = getTotal();
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const [errors, setErrors] = useState({});
  const [cartError, setCartError] = useState(null);   
  
  const manejarCambios = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }
    
    if (!formData.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = "El formato del correo es inválido";
    }

    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio";
    }

    return nuevosErrores;
  };

  const verificarStockDisponible = async () => {
    // Verifica el stock de cada producto en el carrito
    for (const prod of cart) {
      const productRef = await getProductById(prod.id); // Debes implementar la función `getProductById` que obtenga el producto de la base de datos
      if (productRef.data().stock < prod.qty) {
        return false; // Si no hay stock suficiente
      }
    }
    return true; // Si hay stock suficiente para todos los productos
  };

  const finalizarCompra = async (e) => {
    e.preventDefault();    
        
    if (cart.length === 0) {
      setCartError(<div className="setCartError">No puedes finalizar la compra sin productos en el carrito.</div>);
      return; 
    }

    setCartError(null); 

    const validationErrors = validarFormulario();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const stockDisponible = await verificarStockDisponible();
      if (!stockDisponible) {
        Swal.fire({
          title: 'Error',
          text: 'Uno o más productos no tienen suficiente stock disponible.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }

      const name = formData.nombre;
      const email = formData.email;
      const telefono = formData.telefono;

      const order = {
        buyer: { name, email, telefono },
        items: cart, 
        date: serverTimestamp(),
        total: getTotal(),
      };

      try {
        const orderId = await createOrder(order);        
        
        await Promise.all(
          cart.map(async (prod) => {
            await updateProductStock(prod.id, prod.qty); 
          })
        );
        
        Swal.fire({
          title: 'Compra Exitosa',
          text: `¡Gracias por tu compra! Tu número de orden es: ${orderId}`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        clearCart();
        setErrors({});
        handleReset();
        navigate("/");

      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al procesar tu compra. Por favor, intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };

  const handleReset = () => {
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
    });
    setErrors({});
    setCartError(null);
  };

  return (
    <div className="containerCheckout">
      <div className="containerResumenCompra">
        <div className="containerh2Resumen">
          <img className="imgResumenCompra" src="https://i.ibb.co/Sn213VS/facturacion-Pago.png"></img>
          <h2 className="h2ResumenCompra">RESUMEN DE LA COMPRA</h2>
        </div>
      </div>
        <ListGroup className="datProductosResumen">
          {cart.map(prod => (
            <ListGroup.Item key={prod.id}>
              <div className="containerDatosResumen">
                <img className="resumenItemImage" src={prod.image} alt={prod.name} />
                <div className="containerResumenPrecio">
                    <p className="textResumen">{prod.name} x {prod.qty}</p>                    
                    <p className="textResumenPrecio"> PRECIO: ${prod.price * prod.qty}</p>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div className="containerTotalCompra">
          <h4 className="textPrecioTotal">Total de la compra: ${total}</h4>
        </div>
      

      {cartError && <div className="alert alert-danger">{cartError}</div>} 
      
        <div className="containerDatosComprador">
          <div className="containerh3DatosComprador">
            <img className="imgDatosComprador" src="https://i.ibb.co/1qRywRN/icon-Id-Aside.png"></img>
            <h3 className="h3DatosComprador">DATOS DEL COMPRADOR</h3>
          </div>
            <form className="formContainer" onSubmit={finalizarCompra}>
              <div className="inputFormDatosComprador mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                  placeholder="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={manejarCambios}                        
                />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>
              <div className="inputFormDatosComprador mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Correo Electrónico"
                  name="email"
                  value={formData.email}
                  onChange={manejarCambios}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="inputFormDatosComprador mb-3">
                <input
                  type="tel"
                  className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                  placeholder="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (/^\d*$/.test(value)) {  
                      setFormData({
                        ...formData,
                        [name]: value,
                      });
                    }
                  }}
                />
                {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
              </div>
              <button className="btnBorrarForm" type="button" onClick={handleReset}>Borrar formulario</button>
              <button className="btnFinalizarCompra" type="submit">Finalizar compra</button>
              
            </form>
      </div>
    </div>
  );
}

export default Checkout;