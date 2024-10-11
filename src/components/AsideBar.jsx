import { Link } from 'react-router-dom';

function AsideBar() {
  return (
    <aside className="AsideBar">
      <nav className="AsideNav">
        <ul className="AsideList">
          <li><Link className="AsideLink" to="/category/remera"><img className='logoAsideBar' src="https://i.ibb.co/0JsWfk5/icon-Remera-Aside.png"></img>REMERAS</Link></li>
          <li><Link className="AsideLink" to="/category/campera"><img className='logoAsideBar' src="https://i.ibb.co/gZzCk6B/icon-Campera-Aside.png" ></img>CAMPERAS</Link></li>          
          <li><Link className="AsideLink" to="/category/pantalon"><img className='logoAsideBar' src="https://i.ibb.co/yS1z06z/icon-Pantalon-Aside.png" ></img>PANTALONES</Link></li>
          <li><Link className="AsideLink" to="/category/articulos"><img className='logoAsideBar' src="https://i.ibb.co/n6JB9xt/icon-Articulos-Aside.png" ></img>ARTÍCULOS</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default AsideBar;