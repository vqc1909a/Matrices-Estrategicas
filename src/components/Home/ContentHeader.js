import React from 'react';
import {Link} from 'react-router-dom';
const ContentHeader = ({matriz}) => {
  const {name, subname, description} = matriz
     return (
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="order-2 order-sm-1 col-sm-6">
                <h1 className="m-0 text-secondary">{name} {subname}</h1>
              </div>
              <div className="order-1 order-sm-2 col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item active">{name}</li>
                </ol>
              </div>
            </div>
            <div className="row">
               <div className="col col-sm-10">
                <p className="lead">{description}</p>
              </div>
            </div>
          </div>
        </div>
     );
}
 
export default ContentHeader;