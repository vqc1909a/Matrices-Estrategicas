import React, {useState, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import Modal from '../../Home/Modal';
import { v4 as uuidv4 } from "uuid";
import {redondearDecimalPuro} from '../../../helpers'
import '../../../styles/Home/Mefi.css';

const Fortalezas = ({fortalezas, changeFortalezas, total, matriz}) => {
     const [fortaleza, changeFortaleza] = useState({
          name: '',
          value: '',
          error: '',
          ponderado: ''
     })
     const {name, value, error} = fortaleza;
     const handleFortaleza = (e) => {
          changeFortaleza({
               ...fortaleza,
               [e.target.name]: e.target.value
          })
     }

      const handleSubmit = (e) => {
          e.preventDefault();
          if(name.trim() === '' || value.trim() === ''){
               changeFortaleza({
                    ...fortaleza,
                    error: 'Todos los campos son obligatorios'
               })
               return null;
          }
          changeFortaleza({
               ...fortaleza,
               error: ''
          })
          const busqueda = fortalezas.find((fortalecita) => fortalecita.name.trim() === fortaleza.name.toLowerCase().trim());
          if(busqueda){
               changeFortaleza({
                    ...fortaleza,
                    error: 'La fortaleza ya existe'
               })
               return null;
          }
          changeFortaleza({
               ...fortaleza,
               error: ''
          })
          if (parseFloat(value) <= 0 || parseFloat(value) >= 1 || isNaN(parseFloat(value))){
               changeFortaleza({
                    ...fortaleza,
                    error: 'La valoración debe tener un valor entre 0 y 1'
               })
               return null;
          }
          changeFortaleza({
               ...fortaleza,
               error: ''
          })
          if (total === 1) {
                changeFortaleza({
                     ...fortaleza,
                     error: 'La valoración ha llegado a su límite 1.'
                })
                return null;
          }
          changeFortaleza({
               ...fortaleza,
               error: ''
          })
          if(fortaleza.value > redondearDecimalPuro(1 - total)){
               changeFortaleza({
                    ...fortaleza,
                    error: 'Ha sobrepasado la valoración restante. Por favor asigne un valor menor !!!'
               })
               return null;
          }
          
          changeFortalezas([
               ...fortalezas,
               {
                    ...fortaleza,
                    _id: uuidv4(),
                    value: parseFloat(fortaleza.value)
               }
          ])
          changeFortaleza({
               ...fortaleza,
               name: '',
               value: '',
               error: ''
          })
     }

     const borrarFortaleza = (_id) => {
          const restFortalezas = fortalezas.filter(fortaleza => fortaleza._id !== _id);
          changeFortalezas([
               ...restFortalezas
          ])
     }

      const capturarFortaleza = (e) => {
          changeFortaleza({
               ...fortaleza,
               name: e.target.value
          })
     }
     return (
           <div className="fortalezas mb-3">
               <h4>Fortalezas: </h4>
               <form onSubmit={handleSubmit} className="mb-3">
                    <div className="row">
                         {matriz.estado
                         ?
                         ''
                         :
                         <Fragment>
                              <div className="col-md-5">
                                   <input type="text" name="name" value={name} placeholder="Ejem: Buena gestión de los empleados" className="form-control form-control-lg mb-2" onChange={handleFortaleza} autoComplete="off"/>
                              </div>
                              <div className="col-md-3">
                                   <input type="text" name="value" value={value} placeholder="Ejem: 0.08" className="form-control form-control-lg mb-2" onChange={handleFortaleza} autoComplete="off"/>
                              </div>
                              <Modal plural='Fortalezas' singular='Fortalezas' accion={capturarFortaleza} modal='modalFortaleza' factores={['Nombre de marca reconocida', 'Costos operativos más bajos', 'Talento administrativo superior', 'Nuevas tecnologías de comunicación', 'Buena gestión de los empleados']} />

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
                              <th scope="col">#</th>
                              <th scope="col">Fortaleza</th>
                              <th scope="col">Valoración (Restante: {redondearDecimalPuro(1 - total)})</th>
                              <th scope="col" className="text-center">Opciones</th>
                         </tr>
                    </thead>
                    <tbody>
                         {Object.keys(fortalezas).length !== 0 
                         ?
                              <Fragment>
                                   <TransitionGroup className="factores" component={null}>
                                             {fortalezas.map((fortaleza, i) => 
                                                  <CSSTransition
                                                  key={i}
                                                  timeout={500}
                                                  classNames="fortaleza"
                                                  >   
                                                       <tr >
                                                            <th scope="row">{i+1}</th>
                                                            <td>{fortaleza.name}</td>
                                                            <td>{fortaleza.value}</td>
                                                            {matriz.estado
                                                            ?
                                                            <td>-</td>
                                                            :
                                                            <td className="text-center"><Link to="#" onClick={() => borrarFortaleza(fortaleza._id)}><i className="fas fa-trash-alt text-primary"></i></Link></td>
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
 
export default Fortalezas;