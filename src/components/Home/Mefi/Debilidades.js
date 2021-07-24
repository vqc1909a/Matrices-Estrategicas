import React, {useState, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import Modal from '../../Home/Modal';
import { v4 as uuidv4 } from "uuid";
import {redondearDecimalPuro} from '../../../helpers';
import '../../../styles/Home/Mefi.css';


const Debilidades = ({debilidades, changeDebilidades, total, matriz}) => {
     const [debilidad, changeDebilidad] = useState({
          name: '',
          value: '',
          error: '',
          ponderado: ''
     })
     const {name, value, error} = debilidad;

     const handleDebilidad = (e) => {
          changeDebilidad({
               ...debilidad,
               [e.target.name]: e.target.value
          })
     }

      const handleSubmit = (e) => {
         e.preventDefault();
          if(name.trim() === '' || value.trim() === ''){
               changeDebilidad({
                    ...debilidad,
                    error: 'Todos los campos son obligatorios'
               })
               return null;
          }
          changeDebilidad({
               ...debilidad,
               error: ''
          })
          const busqueda = debilidades.find((debilcito) => debilcito.name.trim() === name.toLowerCase().trim());
          if(busqueda){
               changeDebilidad({
                    ...debilidad,
                    error: 'La debilidad ya existe'
               })
               return null;
          }
          changeDebilidad({
               ...debilidad,
               error: ''
          })
          if (parseFloat(value) <= 0 || parseFloat(value) >= 1 || isNaN(parseFloat(value))){
               changeDebilidad({
                    ...debilidad,
                    error: 'La valoración debe tener un valor entre 0 y 1'
               })
               return null;
          }
          changeDebilidad({
               ...debilidad,
               error: ''
          })
          if (total === 1) {
                changeDebilidad({
                     ...debilidad,
                     error: 'La valoración ha llegado a su límite 1.'
                })
                return null;
          }
          changeDebilidad({
               ...debilidad,
               error: ''
          })
          if(debilidad.value > redondearDecimalPuro(1 - total)){
               changeDebilidad({
                    ...debilidad,
                    error: 'Ha sobrepasado la valoración restante. Por favor asigne un valor menor !!!'
               })
               return null;
          }
          changeDebilidades([
               ...debilidades,
               {
                    ...debilidad,
                    _id: uuidv4(),
                    value: parseFloat(debilidad.value)
               }
          ])
          changeDebilidad({
               ...debilidad,
               name: '',
               value: '',
               error: ''
          })
     }

      const borrarDebilidad = (_id) => {
          const restDebilidades = debilidades.filter(debilidad => debilidad._id !== _id);
          changeDebilidades([
               ...restDebilidades
          ])
     }

      const capturarDebilidad = (e) => {
          changeDebilidad({
               ...debilidad,
               name: e.target.value
          })
     }
     
     return (
           <div className="debilidades mb-3">
               <h4>Debilidades: </h4>
               <form onSubmit={handleSubmit} className="mb-3">
                    <div className="row">
                         {matriz.estado
                         ?
                         ''
                         :
                         <Fragment>
                              <div className="col-md-5">
                                   <input type="text" name="name" value={name} placeholder="Ejem: Mala calidad de los productos" className="form-control form-control-lg mb-2" onChange={handleDebilidad} autoComplete="off"/>
                              </div>
                              <div className="col-md-3">
                                   <input type="text" name="value" value={value} placeholder="Ejem: 0.02" className="form-control form-control-lg mb-2" onChange={handleDebilidad} autoComplete="off"/>
                              </div>
                              <Modal plural='Debilidades' singular='Debilidades' accion={capturarDebilidad} modal='modalDebilidad' factores={['Recursos financieros limitados', 'Bajo nivel de internacionalización', 'Mala calidad de los productos', 'Falta de oficina en países de la región', 'Personal con resistencia a las nuevas tecnologías']} />
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
                              <th scope="col">Debilidad</th>
                              <th scope="col">Valoración (Restante: {redondearDecimalPuro(1 - total)})</th>
                              <th scope="col" className="text-center">Opciones</th>
                         </tr>
                    </thead>
                    <tbody>
                         {Object.keys(debilidades).length !== 0 
                         ?
                              <Fragment>
                                   <TransitionGroup className="factores" component={null}>
                                             {debilidades.map((debilidad, i) => 
                                                  <CSSTransition
                                                  key={i}
                                                  timeout={500}
                                                  classNames="debilidad"
                                                  >   
                                                       <tr >
                                                            <th scope="row">{i+1}</th>
                                                            <td>{debilidad.name}</td>
                                                            <td>{debilidad.value}</td>
                                                            {matriz.estado
                                                            ?
                                                            <td>-</td>
                                                            :
                                                            <td className="text-center"><Link to="#" onClick={() => borrarDebilidad(debilidad._id)}><i className="fas fa-trash-alt text-primary"></i></Link></td>
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
 
export default Debilidades;