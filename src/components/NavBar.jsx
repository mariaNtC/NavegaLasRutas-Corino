import { Navbar, Container, Nav } from 'react-bootstrap';
import Carrito from './Carrito/Carrito.jsx'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <Navbar expand="lg" className= "NavBar">
      <Container className= "NavBarContainer">
        <Navbar.Brand className="NavListBrand" to="/" as={Link}>TIENDA</Navbar.Brand>
        <Navbar.Toggle className="NavListToggle"  />
        <Navbar.Collapse className="NavListCollapse" id="basic-navbar-nav">
          <Nav className="NavList me-auto">
            <Link className="NavLink" to={'/category/Remeras'} >Remeras</Link>
            <Link className="NavLink" to={'/category/Camperas'}>Camperas</Link>
            <Link className="NavLink" to={'/category/Articulos'}>Artículos</Link>
            <Link className="NavLink" to={'/category/Pantalon'}>Pantalones</Link>
          </Nav>
        </Navbar.Collapse>

        <Carrito/>
        
      </Container>    
    </Navbar>
  );
}

export default NavBar