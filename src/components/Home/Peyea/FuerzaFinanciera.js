import React, {Fragment, useState} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Modal from '../Modal';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";


const FuerzaFinanciera = ({fuerzasfinancieras, changeFuerzasFinancieras, matriz}) => {
   const [fuerzafinanciera, changeFuerzaFinanciera] = useState({
        name: '',
        value: 0,
        error: ''
    })
    const {name, error} = fuerzafinanciera;

    const handleFuerzaFinanciera  = (e) => {
        changeFuerzaFinanciera({
              ...fuerzafinanciera,
              name: e.target.value
        })
    }

    const handleSubmit = (e)=> {
          e.preventDefault();
          if(name.trim() === ''){
               changeFuerzaFinanciera({
                    ...fuerzafinanciera,
                    error: 'El campo es requerido'
               })
               return null;
          }
          changeFuerzaFinanciera({
               ...fuerzafinanciera,
               error: ''
          })
          const search  = fuerzasfinancieras.find(fuerzita => fuerzita.name.toLowerCase().trim() === fuerzafinanciera.name.toLowerCase().trim());
          if(search){
               changeFuerzaFinanciera({
                    ...fuerzafinanciera,
                    error: 'La Fuerza Financiera ya existe'
               })
               return null;
          }
          changeFuerzaFinanciera({
               ...fuerzafinanciera,
               error: ''
          })
          changeFuerzasFinancieras([
               ...fuerzasfinancieras,
               {
                 ...fuerzafinanciera,
                 _id: uuidv4(),
               }
          ])
          changeFuerzaFinanciera({
               name: '',
               value: 0,
               error: ''
          })
     }

     const borrarFuerzaFinanciera = (_id) => {
          const restfuerzasfinancieras = fuerzasfinancieras.filter(fuerzafinanciera => fuerzafinanciera._id !== _id) 
          changeFuerzasFinancieras([
               ...restfuerzasfinancieras
          ])
     }

     const capturarFuerzaFinanciera = (e) => {
          changeFuerzaFinanciera({
               ...fuerzafinanciera,
               name: e.target.value
          })
     }
  return (
    <div className="fuerza-financiera">
        <h5>FUERZA FINANCIERA (FF)</h5>
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="row">
                  {matriz.estado
                  ?
                  ''
                  :
                  <Fragment>
                  <div className="col-md-8">
                      <input type="text" name="name" value={name} placeholder="Ejem: Capital de Trabajo" className="form-control form-control-lg mb-2" onChange={handleFuerzaFinanciera}/>
                  </div>
                  <Modal plural='Fuerzas Financieras' singular='Fuerzas Financieras' accion={capturarFuerzaFinanciera} modal='modalFuerzaFinanciera' factores={['Capital de Trabajo', 'Liquidez', 'Flujos de Efectivo', 'Riesgos Implícitos del Negocio', 'Solvencia']} />
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
                  <th scope="col">Fuerza Financiera</th>
                  <th scope="col" className="text-center">Opciones</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(fuerzasfinancieras).length !== 0 
            ?
                  <Fragment>
                      <TransitionGroup className="factores" component={null}>
                                {fuerzasfinancieras.map((fuerzafinanciera, i) => 
                                      <CSSTransition
                                      key={fuerzafinanciera._id}
                                      timeout={500}
                                      classNames="fuerzafinanciera"
                                      >   
                                          <tr>
                                                <th scope="row">{i+1}</th>
                                                <td>{fuerzafinanciera.name}</td>
                                                <td className="text-center"><Link to="#" onClick={() => borrarFuerzaFinanciera(fuerzafinanciera._id)}><i className="fas fa-trash-alt text-primary"></i></Link></td>
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
 
export default FuerzaFinanciera;