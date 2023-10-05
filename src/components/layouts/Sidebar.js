import React , {Fragment}from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'

const Sidebar = (props) => {

     console.log(props.location.pathname)
     return (
       <Fragment>
         {/*<!-- Main Sidebar Container -->*/}
         <aside className="main-sidebar elevation-4 bg-light">
           {/*<!-- Brand Logo -->*/}
           <Link to="/" className="brand-link bg-primary py-3">
             <img
               src="images/Logo-fis.png"
               alt="UNCP Logo"
               className="brand-image img-circle elevation-3"
               style={{ opacity: ".8" }}
             />
             <p className="brand-text small text-white font-weight-bolder m-0 mt-1">Matrices Estratégicas</p>
           </Link>

           {/*<!-- Sidebar -->*/}
           <div className="sidebar">
             {/*<!-- Sidebar user panel (optional) -->*/}
             <div className="user-panel mt-3 mb-3">
               {/* <div className="image">
                    <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
               </div> */}
               {/* <div className="info">
                    <a href="#index" className="d-block">Alexander Pierce</a>
               </div>  */}
               <div className="info d-flex justify-content-center">
                 <p className="text-muted text-center mb-0 text-uppercase">
                    matrices
                 </p>
               </div>
             </div>

             {/*<!-- Sidebar Menu -->*/}
             <nav className="mt-2">
               <ul
                 className="nav nav-pills nav-sidebar flex-column"
                 data-widget="treeview"
                 role="menu"
                 data-accordion="false"
               >
                 {/*<!-- Add icons to the links using the .nav-icon className
                         with font-awesome or any other icon font library -->*/}
                 <li className="nav-item has-treeview menu-open">
                   <Link to="#" className="nav-link active">
                     <i className="nav-icon fas fa-tools"></i>
                     <p>
                       ETAPA 1
                       <i className="right fas fa-angle-left"></i>
                     </p>
                   </Link>
                   <ul className="nav nav-treeview">
                     <li className="nav-item">
                       <Link to="/mpc"
                         className={`nav-link ${props.location.pathname === "/mpc" ? "subactive text-white" : ""}`}
                       >
                         <i className="fas fa-hammer nav-icon"></i>
                         <p>MPC</p>
                       </Link>
                     </li>
                     <li className="nav-item">
                       <Link to="/mefi" className={`nav-link ${props.location.pathname === "/mefi" ? "subactive text-white" : ""}`}>
                         <i className="fas fa-screwdriver nav-icon"></i>
                         <p>MEFI</p>
                       </Link>
                     </li>
                      <li className="nav-item">
                       <Link to="/mefe" className={`nav-link ${props.location.pathname === "/mefe" ? "subactive text-white" : ""}`}>
                         <i className="fas fa-screwdriver nav-icon"></i>
                         <p>MEFE</p>
                       </Link>
                     </li>
                   </ul>
                 </li>
               </ul>
             </nav>

             <nav className="mt-2">
               <ul
                 className="nav nav-pills nav-sidebar flex-column"
                 data-widget="treeview"
                 role="menu"
                 data-accordion="false"
               >
                 {/*<!-- Add icons to the links using the .nav-icon className
                         with font-awesome or any other icon font library -->*/}
                 <li className="nav-item has-treeview">
                   <Link to="#" className="nav-link active">
                     <i className="nav-icon fas fa-toolbox"></i>
                     <p>
                       ETAPA 2
                       <i className="right fas fa-angle-left"></i>
                     </p>
                   </Link>
                   <ul className="nav nav-treeview">
                      <li className="nav-item">
                       <Link to="/foda" className={`nav-link ${props.location.pathname === "/foda" ? "subactive text-white" : ""}`}>
                         <i className="fas fa-wrench nav-icon"></i>
                         <p>FODA</p>
                       </Link>
                     </li>
                     <li className="nav-item">
                       <Link to="/peyea" className={`nav-link ${props.location.pathname === "/peyea" ? "subactive text-white" : ""}`}>
                         <i className="fas fa-fan nav-icon"></i>
                         <p>PEYEA</p>
                       </Link>
                     </li>
                   </ul>
                 </li>
               </ul>
             </nav>

             <nav className="mt-2">
               <ul
                 className="nav nav-pills nav-sidebar flex-column"
                 data-widget="treeview"
                 role="menu"
                 data-accordion="false"
               >
                 {/*<!-- Add icons to the links using the .nav-icon className
                         with font-awesome or any other icon font library -->*/}
                 <li className="nav-item has-treeview">
                   <Link to="#" className="nav-link active">
                     <i className="nav-icon fas fa-toolbox"></i>
                     <p>
                       ETAPA 3
                       <i className="right fas fa-angle-left"></i>
                     </p>
                   </Link>
                   <ul className="nav nav-treeview">
                      <li className="nav-item">
                       <Link to="/mpec" className={`nav-link ${props.location.pathname === "/mpec" ? "subactive text-white" : ""}`}>
                         <i className="fas fa-wrench nav-icon"></i>
                         <p>MPEC</p>
                       </Link>
                     </li>
                   </ul>
                 </li>
               </ul>
             </nav>
             {/*<!-- /.sidebar-menu -->*/}
           </div>
           {/*<!-- /.sidebar -->*/}
         </aside>
       </Fragment>
     );
}
 
export default withRouter(Sidebar);