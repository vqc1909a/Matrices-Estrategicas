import React, {useState, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Modal from '../Modal';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const EstabilidadAmbiente = ({estabilidadesambientes, changeEstabilidadesAmbientes, matriz}) => {

  const [estabilidadambiente, changeEstabilidadAmbiente] = useState({
      name: '',
      value: 0,
      error: ''
  })
  const {name, error} = estabilidadambiente;

  const handleSubmit  = (e) => {
      changeEstabilidadAmbiente({
            ...estabilidadambiente,
            name: e.target.value
      })
  }
  const agregarEstabilidadAmbiente = (e)=> {
      e.preventDefault();
      if(estabilidadambiente.name.trim() === ''){
            changeEstabilidadAmbiente({
                ...estabilidadambiente,
                error: 'El campo es requerido'
            })
            return null;
      }
      changeEstabilidadAmbiente({
            ...estabilidadambiente,
            error: ''
      })
      const search  = estabilidadesambientes.find(estabilcito => estabilcito.name.toLowerCase() === estabilidadambiente.name.toLowerCase());
      if(search){
            changeEstabilidadAmbiente({
                ...estabilidadambiente,
                error: 'La Estabilidad del Ambiente ya existe'
            })
            return null;
      }
      changeEstabilidadAmbiente({
            ...estabilidadambiente,
            error: ''
      })
      changeEstabilidadesAmbientes([
            ...estabilidadesambientes,
            {
              ...estabilidadambiente,
              _id: uuidv4()
            }
      ])
      changeEstabilidadAmbiente({
            name: '',
            value: 0,
            error: ''
      })
  }

  const borrarEstabilidadAmbiente = (_id) => {
      const restestabilidadesambientes = estabilidadesambientes.filter(estabilidadambiente => estabilidadambiente._id !== _id) 
      changeEstabilidadesAmbientes([
            ...restestabilidadesambientes
      ])
  }

  const capturarEstabilidadAmbiente = (e) => {
        changeEstabilidadAmbiente({
            ...estabilidadambiente,
            name: e.target.value
        })
  }


  return (
      <div className="estabilidad-ambiente">
        <h5>ESTABILIDAD DEL AMBIENTE (EA)</h5>
        <form onSubmit={agregarEstabilidadAmbiente} className="mb-3">
            <div className="row">
                  {matriz.estado
                  ?
                  ''
                  :
                  <Fragment>
                  <div className="col-md-8">
                      <input type="text" name="name" value={name} placeholder="Ejem: Cambios Tecnológicos" className="form-control form-control-lg mb-2" onChange={handleSubmit}/>
                  </div>
                  <Modal plural='Estabilidades del Ambiente' singular='Estabilidades del Ambiente' accion={capturarEstabilidadAmbiente} modal='modalEstabilidadAmbiente' factores={['Cambios Tecnológicos', 'Tasa de Inflación', 'Presión Competitiva', 'Estabilidad política y social', 'Barreras para entrar en el mercado']} />
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
                  <th scope="col">Estabilidad del Ambiente</th>
                  <th scope="col" className="text-center">Opciones</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(estabilidadesambientes).length !== 0 
            ?
                  <Fragment>
                      <TransitionGroup className="factores" component={null}>
                                {estabilidadesambientes.map((estabilidadambiente, i) => 
                                      <CSSTransition
                                      key={estabilidadambiente._id}
                                      timeout={500}
                                      classNames="estabilidadambiente"
                                      >   
                                          <tr>
                                                <th scope="row">{i+1}</th>
                                                <td>{estabilidadambiente.name}</td>
                                                <td className="text-center"><Link to="#" onClick={() => borrarEstabilidadAmbiente(estabilidadambiente._id)}><i className="fas fa-trash-alt text-primary"></i></Link></td>
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
 
export default EstabilidadAmbiente;