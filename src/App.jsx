import { useState } from 'react'
import React from 'react'
import './App.css'
import NavBar from './components/NavBar.jsx'
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx'
import ItemDetailContainer from './components/ItemListContainer/ItemDetailContainer.jsx'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    
    <BrowserRouter>

    <NavBar/>    

      <Routes>
        
        <Route path="/*" element={<ItemListContainer />} />
        <Route path="/remeras" element={<p>Hola</p>}></Route>
        <Route path="/producto/:id" element={<ItemDetailContainer />}></Route>
        <Route path="/category/:categoriaId" element={<ItemListContainer />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
