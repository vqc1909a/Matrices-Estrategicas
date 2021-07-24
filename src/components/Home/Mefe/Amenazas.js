import React, {useState, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import Modal from '../../Home/Modal';
import { v4 as uuidv4 } from "uuid";
import {redondearDecimalPuro} from '../../../helpers';
import '../../../styles/Home/Mefi.css';


const Amenazas = ({amenazas, changeAmenazas, total, matriz}) => {
     const [amenaza, changeAmenaza] = useState({
          name: '',
          value: '',
          error: '',
          ponderado: ''
     })

     const {name, value, error} = amenaza;

     const handleAmenaza = (e) => {
          changeAmenaza({
               ...amenaza,
               [e.target.name]: e.target.value
          })
     }

      const handleSubmit = (e) => {
         e.preventDefault();
          if(name.trim() === '' || value.trim() === ''){
               changeAmenaza({
                    ...amenaza,
                    error: 'Todos los campos son obligatorios'
               })
               return null;
          }
          changeAmenaza({
               ...amenaza,
               error: ''
          })
          const busqueda = amenazas.find((amenacito) => amenacito.name.trim() === name.toLowerCase().trim());
          if(busqueda){
               changeAmenaza({
                    ...amenaza,
                    error: 'La amenaza ya existe'
               })
               return null;
          }
          changeAmenaza({
               ...amenaza,
               error: ''
          })
          if (parseFloat(value) <= 0 || parseFloat(value) >= 1 || isNaN(parseFloat(value))){
               changeAmenaza({
                    ...amenaza,
                    error: 'La valoración debe tener un valor entre 0 y 1'
               })
               return null;
          }
          changeAmenaza({
               ...amenaza,
               error: ''
          })
          if (total === 1) {
                changeAmenaza({
                     ...amenaza,
                     error: 'La valoración ha llegado a su límite 1.'
                })
                return null;
          }
          changeAmenaza({
               ...amenaza,
               error: ''
          })
          if(value > redondearDecimalPuro(1 - total)){
               changeAmenaza({
                    ...amenaza,
                    error: 'Ha sobrepasado la valoración restante. Por favor asigne un valor menor !!!'
               })
               return null;
          }
          changeAmenazas([
               ...amenazas,
               {
                    ...amenaza,
                    _id: uuidv4(),
                    value: parseFloat(value)
               }
          ])
          changeAmenaza({
               ...amenaza,
               name: '',
               value: '',
               error: ''
          })
     }

      const borrarAmenaza = (_id) => {
          const restAmenazas = amenazas.filter(amenaza => amenaza._id !== _id);
          changeAmenazas([
               ...restAmenazas
          ])
     }

      const capturarAmenaza = (e) => {
          changeAmenaza({
               ...amenaza,
               name: e.target.value
          })
     }
     
     return (
           <div className="amenazas mb-3">
               <h4>Amenazas: </h4>
               <form onSubmit={handleSubmit} className="mb-3">
                    <div className="row">
                         {matriz.estado
                         ?
                         ''
                         :
                         <Fragment>
                              <div className="col-md-5">
                                   <input type="text" name="name" value={name} placeholder="Ejem: Crisis económica" className="form-control form-control-lg mb-2" onChange={handleAmenaza} autoComplete="off"/>
                              </div>
                              <div className="col-md-3">
                                   <input type="text" name="value" value={value} placeholder="Ejem: 0.02" className="form-control form-control-lg mb-2" onChange={handleAmenaza} autoComplete="off"/>
                              </div>
                              <Modal plural='Amenazas' singular='Amenazas' accion={capturarAmenaza} modal='modalAmenaza' factores={['Entrada de competidores globales', 'Barreras para el comercio exterior', 'Recesión Económica', 'Reducción de la confianza del consumidor', 'Mayor regulación gubernamental']} />
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
                              <th scope="col">Amenaza</th>
                              <th scope="col">Valoración (Restante: {redondearDecimalPuro(1 - total)})</th>
                              <th scope="col" className="text-center">Opciones</th>
                         </tr>
                    </thead>
                    <tbody>
                         {Object.keys(amenazas).length !== 0 
                         ?
                              <Fragment>
                                   <TransitionGroup className="factores" component={null}>
                                             {amenazas.map((amenaza, i) => 
                                                  <CSSTransition
                                                  key={i}
                                                  timeout={500}
                                                  classNames="amenaza"
                                                  >   
                                                       <tr >
                                                            <th scope="row">{i+1}</th>
                                                            <td>{amenaza.name}</td>
                                                            <td>{amenaza.value}</td>
                                                            {matriz.estado
                                                            ?
                                                            <td>-</td>
                                                            :
                                                            <td className="text-center"><Link to="#" onClick={() => borrarAmenaza(amenaza._id)}><i className="fas fa-trash-alt text-primary"></i></Link></td>
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
 
export default Amenazas;