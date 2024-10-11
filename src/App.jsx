import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar.jsx';
import AsideBar from './components/AsideBar.jsx'; // Importamos el AsideBar
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import ItemDetailContainer from './components/ItemListContainer/ItemDetailContainer.jsx';
import Cart from './components/Carrito/cart.jsx';
import Checkout from './components/Checkout.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    
      <NavBar />    

      <div className="MainLayout">
       
        <AsideBar /> 
        
        <div className="ContentLayout">
          <Routes>
            <Route path="/*" element={<ItemListContainer />} />
            <Route path="/producto/:id" element={<ItemDetailContainer />}></Route>
            <Route path="/category/:categoriaId" element={<ItemListContainer />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;