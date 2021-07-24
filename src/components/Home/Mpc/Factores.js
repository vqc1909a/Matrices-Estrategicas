import React, {useState, Fragment} from 'react';
import Modal from '../../../components/Home/Modal';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import { redondearDecimalPuro } from '../../../helpers';
const Factores = ({factores, changeFactores, total, matriz}) => {
     const [factor, changeFactor] = useState({
          name: '',
          value: '',
          error: ''
     });
     const  {name, value, error} = factor
     const handleFactor= (e) => {          
          changeFactor({
               ...factor,
               [e.target.name]: e.target.value
          })
     }
     const handleSubmit = (e) =>{
          e.preventDefault();
         
          if(name.trim() === '' || value.trim() === ''){
                changeFactor({
                    ...factor,
                    error: 'Todos los campos son obligatorios'
                })
                 return null;
          }
          changeFactor({
               ...factor,
               error: '',
          });
          const busqueda = factores.find((fact) => fact.name.toLowerCase().trim() === name.toLowerCase().trim());
          if (busqueda) {
               changeFactor({
                    ...factor,
                    error: 'El factor crítico ya existe'
               })
               return null;
          }
          changeFactor({
               ...factor,
               error: '',
          });

          if (parseFloat(value) <= 0 || parseFloat(value) >= 1 || isNaN(parseFloat(value))) {
                 changeFactor({
                      ...factor,
                      error: 'La valoración debe tener un valor entre 0 y 1'
                 })
                 return null;
          }
          changeFactor({
               ...factor,
               error: '',
          });
          if (total === 1) {
               changeFactor({
                    ...factor,
                    error: 'La valoración ha llegado a su límite 1.'
               })
               return null;
          }
          changeFactor({
               ...factor,
               error: '',
          });
          if ( value > redondearDecimalPuro(1 - total)) {
               changeFactor({
                    ...factor,
                    error: 'Ha sobrepasado la valoración restante. Por favor asigne un valor menor !!!'
               })
               return null;
          }
          changeFactores([
               ...factores,
               {
                    ...factor,
                    _id: uuidv4(),
                    value: parseFloat(value)
               }
          ])
          changeFactor({
               name: '',
               value: '',
               error: ''
          })
     }

     const borrarFactor = (_id) => {
          const restFactores = factores.filter(factor => factor._id !== _id);
          changeFactores([
               ...restFactores
          ])
     }

     const capturarFactorCritico = (e) => {
          changeFactor({
               ...factor,
               name: e.target.value
          })
     }
     return (
          <div className="factores-criticos pt-4">
               <h3>Paso  N°1: Agregar Factores Críticos de Éxito (FCE)</h3>
               <p className="mb-0">Agregue cuantos factores críticos crea conveniente a evaluar con respecto a la industria perteneciente de su empresa, así como también deberá de asignar una valoración entre 0 <strong>(sin importancia)</strong> y 1 <strong>(muy importante)</strong> para cada factor</p>
               <p className="text-muted"><strong>NOTA 1:</strong> El puntaje asignado es en función de la relevancia del factor en el éxito en la industria en donde participa la empresa.</p>
               <p className="text-muted"><strong>NOTA 2:</strong> La suma de cada valor de los factores deberá de ser en total de 1</p>
               {matriz.estado
               ?
               ''
               :
               <form onSubmit={handleSubmit} className="mb-3">
                    <div className="row">
                         <div className="col-md-5">
                              <input type="text" name="name" value={name} placeholder="Ejem: Tecnología" className="form-control form-control-lg mb-2" onChange={handleFactor} autoComplete="off"/>
                         </div>
                         <div className="col-md-3">
                              <input type="text" name="value" value={value} placeholder="Ejem: 0.4" className="form-control form-control-lg mb-2" onChange={handleFactor} autoComplete="off"/>
                         </div>
                        
                         <Modal plural='Factores Críticos' singular='Factor Crítico' accion={capturarFactorCritico} modal='modalFactorCritico' industrias={[{ name: 'Industria del automóvil', factores: ['Estilo del vehículo', 'Ahorro de combustible', 'Control sobre los costos de producción']}, { name: 'Industria de la computación', factores: ['Capacidad de Innovación', 'Calidad de las ventas', 'Facilidad del uso de los productos']}, { name: 'Industria alimentaria', factores: ['Eficiencia en la publicidad', 'Eficacia en la distribución del producto', 'Capacidad de innovación de los productos']}]} />
                    </div>
               </form>
               }
               
               {error ? <div className="alert alert-danger">{error}</div> : ''}
               <table className="table table-hover">
                    <thead className="bg-secondary">
                         <tr>
                              <th scope="col">#</th>
                              <th scope="col">Factor Crítico</th>
                              <th scope="col">Valoración (Restante: {redondearDecimalPuro(1 - total)})</th>
                              <th scope="col" className="text-center">Opciones</th>
                         </tr>
                    </thead>
                    <tbody>
                         {Object.keys(factores).length !== 0 
                         ?
                              <Fragment>
                                   <TransitionGroup className="factores" component={null}>
                                             {factores.map((factor, i) => 
                                                  <CSSTransition
                                                  key={factor._id}
                                                  timeout={500}
                                                  classNames="factor"
                                                  >   
                                                       <tr >
                                                            <th scope="row">{i+1}</th>
                                                            <td>{factor.name}</td>
                                                            <td>{factor.value}</td>
                                                            {matriz.estado
                                                            ?
                                                            <td>-</td>
                                                            :
                                                            <td className="text-center"><Link to="#" onClick={() => borrarFactor(factor._id)}><i className="fas fa-trash-alt text-primary"></i></Link></td>
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
                                   <td>-</td>
                              </tr>
                         }
                    </tbody>
               </table>
          </div>

     );
}
 
export default Factores;  