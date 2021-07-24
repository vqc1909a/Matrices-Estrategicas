import React, {Fragment, useState} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Modal from '../Modal';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const VentajaCompetitiva = ({ventajascompetitivas, changeVentajasCompetitivas, matriz}) => {

  const [ventajacompetitiva, changeVentajaCompetitiva] = useState({
      name: '',
      value: 0,
      error: ''
  })
  const {name, error} = ventajacompetitiva;

  const handleVentajaCompetitiva  = (e) => {
      changeVentajaCompetitiva({
            ...ventajacompetitiva,
            name: e.target.value
      })
  }

   const handleSubmit = (e)=> {
      e.preventDefault();
      if(name.trim() === ''){
            changeVentajaCompetitiva({
                ...ventajacompetitiva,
                error: 'El campo es requerido'
            })
            return null;
      }
      changeVentajaCompetitiva({
            ...ventajacompetitiva,
            error: ''
      })
      const search  = ventajascompetitivas.find(ventajita => ventajita.name.toLowerCase().trim() === ventajacompetitiva.name.toLowerCase().trim());
      if(search){
            changeVentajaCompetitiva({
                ...ventajacompetitiva,
                error: 'La Ventaja Competitiva ya existe'
            })
            return null;
      }
      changeVentajaCompetitiva({
            ...ventajacompetitiva,
            error: ''
      })
      changeVentajasCompetitivas([
            ...ventajascompetitivas,
            {
              ...ventajacompetitiva,
              _id: uuidv4()
            }
      ])
      changeVentajaCompetitiva({
            name: '',
            value: 0,
            error: ''
      })
  }

  const borrarVentajaCompetitiva = (_id) => {
      const restventajascompetitivas = ventajascompetitivas.filter(ventajacompetitiva => ventajacompetitiva._id !== _id) 
      changeVentajasCompetitivas([
            ...restventajascompetitivas
      ])
  }
  const capturarVentajaCompetitiva = (e) => {
          changeVentajaCompetitiva({
               ...ventajacompetitiva,
               name: e.target.value
          })
     }
  return (
    <div className="ventaja-competitiva">
        <h5>VENTAJA COMPETITIVA (VC)</h5>
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="row">
                  {matriz.estado
                  ?
                  ''
                  :
                  <Fragment>
                  <div className="col-md-8">
                      <input type="text" name="name" value={name} placeholder="Ejem: Calidad del producto" className="form-control form-control-lg mb-2" onChange={handleVentajaCompetitiva}/>
                  </div>
                  <Modal plural='Ventajas Competitivas' singular='Ventajas Competitivas' accion={capturarVentajaCompetitiva} modal='modalVentajaCompetitiva' factores={['Participación en el mercado', 'Calidad del producto', 'Lealtad de los clientes', 'Control sobre proveedores y distribuidores', 'Conocimiento tecnológicos']} />
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
                  <th scope="col">Ventaja Competitiva</th>
                  <th scope="col" className="text-center">Opciones</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(ventajascompetitivas).length !== 0 
            ?
                  <Fragment>
                      <TransitionGroup className="factores" component={null}>
                                {ventajascompetitivas.map((ventajacompetitiva, i) => 
                                      <CSSTransition
                                      key={ventajacompetitiva._id}
                                      timeout={500}
                                      classNames="ventajacompetitiva"
                                      >   
                                          <tr>
                                                <th scope="row">{i+1}</th>
                                                <td>{ventajacompetitiva.name}</td>
                                                <td className="text-center"><Link to="#" onClick={() => borrarVentajaCompetitiva(ventajacompetitiva._id)}><i className="fas fa-trash-alt text-primary"></i></Link></td>
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
 
export default VentajaCompetitiva;