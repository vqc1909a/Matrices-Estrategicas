import React, {Fragment} from 'react';
import { Link } from "react-router-dom";
const Navbar = () => {
     return (
          <Fragment>
          {/*<!-- Navbar -->*/}
          <nav className="main-header navbar navbar-expand navbar-white navbar-light bg-primary">
          {/*<!-- Left navbar links -->*/}
          <ul className="navbar-nav">
               <li className="nav-item">
               <a className="nav-link" data-widget="pushmenu" href="#index" role="button"><i className="fas fa-bars"></i></a>
               </li>
               <li className="nav-item d-none d-sm-inline-block">
               <Link to="/" className="nav-link">Home</Link>
               </li>
               {/* <li className="nav-item d-none d-sm-inline-block">
               <a href="#index" className="nav-link">Contact</a>
               </li> */}
          </ul>

          {/*<!-- SEARCH FORM -->*/}
          {/* <form className="form-inline ml-3">
               <div className="input-group input-group-sm">
               <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
               <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search"></i>
                    </button>
               </div>
               </div>
          </form> */}

          {/*<!-- Right navbar links -->*/}
         
          {/* Aqui va el componente Navbar */}
           
          </nav>
          {/*<!-- /.navbar -->*/}
          </Fragment>
     );
}
 
export default Navbar;