import React, {useState, Fragment} from 'react';
import {Link} from 'react-router-dom';

const Empresa = ({empresas, changeEmpresas, matriz}) => {
     const [empresa, changeEmpresa] = useState({
          name: '',
          error: ''
     })

     const {name, error} = empresa;
     const handleEmpresa = (e) => {
          changeEmpresa({
               ...empresa,
               name: e.target.value
          });
     }

      const handleSubmit = (e) => {
          e.preventDefault();
          if(empresas.length === 1){
               changeEmpresa({
                    ...empresa,
                    error: 'Solo se requiere el nombre de una empresa'
               });
               return null;
          }
          
          if(empresa.name.trim() === ''){
               changeEmpresa({
                    ...empresa,
                    error: 'El campo es requerido'
               });
               return null;
          }
          changeEmpresas([empresa]);   
          changeEmpresa({
               name: '',
               error: ''
          });
     }

     const eliminarEmpresa = () => {
          changeEmpresas([]);
     }

     return (

         <div className="empresa">
               <h3>Paso  N°1: Lista el nombre de la empresa a evaluar</h3>         
               <p className="text-muted"><strong>NOTA:</strong> En esta matriz solo se evalúa a una empresa</p>
               <form onSubmit={handleSubmit} className="mb-3">
               <div className="row">
                    {matriz.estado
                    ?
                    ''
                    :
                    <Fragment>
                         <div className="col-md-4">
                              <input type="text" name="name" value={name} placeholder="Ejem: CIRO S.A.C" className="form-control form-control-lg mb-2" onChange={handleEmpresa}  autoComplete="off"/>
                         </div>
                         <div className="col-md-4">
                              <input type="submit" value="Agregar" className="btn btn-outline-primary btn-lg btn-block mb-2"/>
                         </div>
                    </Fragment>
                    }
               </div>
          </form>
          {
               error ? <div className="alert alert-danger">{error}</div> : ''
          }
          <table className="table table-hover">
               <thead className="bg-secondary">
                    <tr>
                         <th scope="col">Empresa</th>
                         <th scope="col" className="text-center">Opciones</th>
                    </tr>
               </thead>
               <tbody>
                    {Object.keys(empresas).length !== 0 
                    ?
                         <tr>
                              <td>{empresas[0].name}</td>
                              {matriz.estado
                              ?     
                              ''
                              :
                                   <td className="text-center"><Link to="#" onClick={eliminarEmpresa}><i className="fas fa-trash-alt text-primary"></i></Link></td>
                              }
                         </tr>
                    :
                         <tr>
                              <td>-</td>
                              <td>-</td>
                         </tr>
                    }
               </tbody>
          </table>
     </div>
);
}
 
export default Empresa;