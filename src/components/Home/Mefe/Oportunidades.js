import React, {useState, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import Modal from '../../Home/Modal';
import { v4 as uuidv4 } from "uuid";
import {redondearDecimalPuro} from '../../../helpers'
import '../../../styles/Home/Mefi.css';

const Oportunidades = ({oportunidades, changeOportunidades, total, matriz}) => {
    const [oportunidad, changeOportunidad] = useState({
          name: '',
          value: '',
          error: '',
          ponderado: ''
    })
     
     const {name, value, error} = oportunidad;
     const handleOportunidad = (e) => {
          changeOportunidad({
               ...oportunidad,
               [e.target.name]: e.target.value
          })
     }

      const handleSubmit = (e) => {
          e.preventDefault();
          if(name.trim() === '' || value.trim() === ''){
               changeOportunidad({
                    ...oportunidad,
                    error: 'Todos los campos son obligatorios'
               })
               return null;
          }
          changeOportunidad({
               ...oportunidad,
               error: ''
          })
          const busqueda = oportunidades.find((oportunicito) => oportunicito.name.trim() === oportunidad.name.toLowerCase().trim());
          if(busqueda){
               changeOportunidad({
                    ...oportunidad,
                    error: 'La oportunidad ya existe'
               })
               return null;
          }
          changeOportunidad({
               ...oportunidad,
               error: ''
          })
          if (parseFloat(value) <= 0 || parseFloat(value) >= 1 || isNaN(parseFloat(value))){
               changeOportunidad({
                    ...oportunidad,
                    error: 'La valoración debe tener un valor entre 0 y 1'
               })
               return null;
          }
          changeOportunidad({
               ...oportunidad,
               error: ''
          })
          if (total === 1) {
                changeOportunidad({
                     ...oportunidad,
                     error: 'La valoración ha llegado a su límite 1.'
                })
                return null;
          }
          changeOportunidad({
               ...oportunidad,
               error: ''
          })
          if(value > redondearDecimalPuro(1 - total)){
               changeOportunidad({
                    ...oportunidad,
                    error: 'Ha sobrepasado la valoración restante. Por favor asigne un valor menor !!!'
               })
               return null;
          }
          
          changeOportunidades([
               ...oportunidades,
               {
                    ...oportunidad,
                    _id: uuidv4(),
                    value: parseFloat(value)
               }
          ])
          changeOportunidad({
               ...oportunidad,
               name: '',
               value: '',
               error: ''
          })
     }

     const borrarOportunidad = (_id) => {
          const restOportunidades = oportunidades.filter(oportunidad => oportunidad._id !== _id);
          changeOportunidades([
               ...restOportunidades
          ])
     }

      const capturarOportunidad = (e) => {
          changeOportunidad({
               ...oportunidad,
               name: e.target.value
          })
     }
     return (
           <div className="oportunidades mb-3">
               <h4>Oportunidades: </h4>
               <form onSubmit={handleSubmit} className="mb-3">
                    <div className="row">
                         {matriz.estado
                         ?
                         ''
                         :
                         <Fragment>
                              <div className="col-md-5">
                                   <input type="text" name="name" value={name} placeholder="Ejem: Buena gestión de los empleados" className="form-control form-control-lg mb-2" onChange={handleOportunidad} autoComplete="off"/>
                              </div>
                              <div className="col-md-3">
                                   <input type="text" name="value" value={value} placeholder="Ejem: 0.08" className="form-control form-control-lg mb-2" onChange={handleOportunidad} autoComplete="off"/>
                              </div>
                              <Modal plural='Oportunidades' singular='Oportunidad' accion={capturarOportunidad} modal='modalOportunidad' factores={['Rápido crecimiento de la demanda', 'Apertura de mercados regionales', 'Cambios sociales', 'Nuevas tecnologías de comunicación', 'Alianza con empresas']}/>
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
                              <th scope="col">Oportunidad</th>
                              <th scope="col">Valoración (Restante: {redondearDecimalPuro(1 - total)})</th>
                              <th scope="col" className="text-center">Opciones</th>
                         </tr>
                    </thead>
                    <tbody>
                         {Object.keys(oportunidades).length !== 0 
                         ?
                              <Fragment>
                                   <TransitionGroup className="oportunidades" component={null}>
                                             {oportunidades.map((oportunidad, i) => 
                                                  <CSSTransition
                                                  key={i}
                                                  timeout={500}
                                                  classNames="oportunidad"
                                                  >   
                                                       <tr >
                                                            <th scope="row">{i+1}</th>
                                                            <td>{oportunidad.name}</td>
                                                            <td>{oportunidad.value}</td>
                                                            {matriz.estado
                                                            ?
                                                            <td>-</td>
                                                            :
                                                            <td className="text-center"><Link to="#" onClick={() => borrarOportunidad(oportunidad._id)}><i className="fas fa-trash-alt text-primary"></i></Link></td>
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
 
export default Oportunidades;