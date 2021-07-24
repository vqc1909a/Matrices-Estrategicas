import React, {Fragment, useState} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Modal from '../../../components/Home/Modal';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const Empresas = ({empresas, changeEmpresas, matriz}) => {
     const [empresa, changeEmpresa] = useState({
          name: '',
          error: '',
          puntajes: []
     });
     const {name, error} = empresa;
     const handleEmpresa = (e) => {
          changeEmpresa({
               ...empresa,
               name: e.target.value
          });
     }
     const handleSubmit = (e) => {
          e.preventDefault();
          if(name.trim() === ''){
               changeEmpresa({
                    ...empresa,
                    error: 'El campo es requerido'
               });
               return null;
          }
          changeEmpresa({
               ...empresa,
               error: ''
          });
           const busqueda = empresas.find((empresa) => empresa.name.toLowerCase().trim() === name.toLowerCase().trim());
           if (busqueda) {
                changeEmpresa({
                     ...empresa,
                     error: 'La empresa ya existe'
                })
                return null;
           }
          changeEmpresas([
               ...empresas,
               {
                    _id: uuidv4(),
                    ...empresa
               }
          ])
          changeEmpresa({
                ...empresa,
               name: '',
               error: ''
           });
     }
     const borrarEmpresa = (_id) => {
          const restEmpresas = empresas.filter(empresa => empresa._id !== _id);
          changeEmpresas([
               ...restEmpresas
          ])
     }

      const capturarEmpresa = (e) => {
          changeEmpresa({
               ...empresa,
               name: e.target.value
          })
     }
     return (

          <div className="empresas pt-4">
               <h3>Paso  N°2: Agregar Empresas de su Competencia</h3>
               <p className="mb-0">Agregue el nombre de su empresa asi como también las empresas que estan relacionadas directamente con su competencia</p>
               <p className="text-muted">NOTA: La cantidad mínima de empresas a evaluar es 2 y la cantidad maxima recomendada es 4 </p>
               {matriz.estado
                    ?
                    ''
                    :
                    <form onSubmit={handleSubmit} className="mb-3">
                         <div className="row">
                              <div className="col-md-8">
                                   <input type="text" name="name" value={name} placeholder="Ejem: Netflix" className="form-control form-control-lg mb-2" onChange={handleEmpresa} autoComplete="off"/>
                              </div>

                               <Modal plural='Empresas' singular='Empresas en Competencia' accion={capturarEmpresa} modal='modalEmpresa' factores={["HBO Go", "Amazon Prime", "Disney+", "Youtube", "Twitch"]} />
                         </div>
                    </form>
               }
               {error ? <div className="alert alert-danger">{error}</div> : ''}
               <table className="table table-hover">
                    <thead className="bg-secondary">
                         <tr>
                              <th scope="col">#</th>
                              <th scope="col">Empresa</th>
                              <th scope="col" className="text-center">Opciones</th>
                         </tr>
                    </thead>
                    <tbody>
                         {Object.keys(empresas).length !== 0 
                         ?
                              <Fragment>
                                   <TransitionGroup className="empresas" component={null}>
                                             {empresas.map((empresa, i) => 
                                                  <CSSTransition
                                                  key={empresa._id}
                                                  timeout={500}
                                                  classNames="empresa"
                                                  >
                                                       <tr >
                                                            <th scope="row">{i+1}</th>
                                                            <td>{empresa.name}</td>
                                                            {
                                                                 matriz.estado
                                                                 ?
                                                                 <td>-</td>
                                                                 :
                                                                 <td className="text-center"><Link to="#" onClick={() => borrarEmpresa(empresa._id)}><i className="fas fa-trash-alt text-primary"></i></Link></td>
                                                            }      
                                                       </tr>
                                                  </CSSTransition>
                                             )}
                                   </TransitionGroup>
                              </Fragment>
                         :
                              <tr>
                                   <th scope="row">-</th>
                                   <td>-</td>
                                   <td>-</td>
                              </tr>
                         }
                    </tbody>
               </table>
          </div>
     );
}
 
export default Empresas;