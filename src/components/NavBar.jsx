import { Navbar, Container } from 'react-bootstrap';
import Carrito from './Carrito/Carrito.jsx'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <Navbar expand="lg" className= "NavBar">
      <Container className= "NavBarContainer">

        <Navbar.Brand className="NavListBrand" to="/" as={Link}><img className='logoNavBar' src="https://i.ibb.co/sthcwVm/logo-Nav-Bar.png"></img>TIENDA</Navbar.Brand>
       
          <Link className="linkToCarrito" to='/cart'>
            <Carrito/>
          </Link>        
        
      </Container>    
    </Navbar>
  );
}

export default NavBar