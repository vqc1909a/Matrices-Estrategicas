import React, {useState, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Modal from '../Modal';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const FuerzaIndustria = ({fuerzasindustrias, changeFuerzasIndustrias, matriz}) => {

  const [fuerzaindustria, changeFuerzaIndustria] = useState({
      name: '',
      value: 0,
      error: ''
  })
  const {name, error} = fuerzaindustria;

  const handleFuerzaIndustria  = (e) => {
      changeFuerzaIndustria({
            ...fuerzaindustria,
            name: e.target.value
      })
  }
  const handleSubmit = (e)=> {
      e.preventDefault();
      if(name.trim() === ''){
            changeFuerzaIndustria({
                ...fuerzaindustria,
                error: 'El campo es requerido'
            })
            return null;
      }
      changeFuerzaIndustria({
            ...fuerzaindustria,
            error: ''
      })
      const search  = fuerzasindustrias.find(fuercita => fuercita.name.toLowerCase().trim() === fuerzaindustria.name.toLowerCase().trim());
      if(search){
            changeFuerzaIndustria({
                ...fuerzaindustria,
                error: 'La Fuerza en la Industria ya existe'
            })
            return null;
      }
      changeFuerzaIndustria({
            ...fuerzaindustria,
            error: ''
      })
      changeFuerzasIndustrias([
            ...fuerzasindustrias,
            {
              ...fuerzaindustria,
              _id: uuidv4()
            }
      ])
      changeFuerzaIndustria({
            name: '',
            value: 0,
            error: ''
      })
  }
  const borrarFuerzaIndustria = (_id) => {
      const restfuerzasindustrias = fuerzasindustrias.filter(fuerzaindustria => fuerzaindustria._id !== _id) 
      changeFuerzasIndustrias([
            ...restfuerzasindustrias
      ])
  }

  const capturarFuerzaIndustria = (e) => {
        changeFuerzaIndustria({
            ...fuerzaindustria,
            name: e.target.value
        })
  }
  return (
     <div className="fuerza-industria">
        <h5>FUERZA EN LA INDUSTRIA (FI)</h5>
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="row">
                  <div className="col-md-8">
                      <input type="text" name="name" value={fuerzaindustria.name} placeholder="Ejem: Aprovechamiento de Recursos" className="form-control form-control-lg mb-2" onChange={handleFuerzaIndustria}/>
                  </div>
                  {matriz.estado
                  ?
                  ''
                  :
                  <Modal plural='Fuerzas en la Industria' singular='Fuerza en la Industria' accion={capturarFuerzaIndustria} modal='modalFuerzaIndustria' factores={['Potencial de Crecimiento', 'Conocimientos tecnológicos', 'Productividad y Aprovechamiento de la Capacidad', 'Facilidad para entrar al mercado', 'Abundancia y Diversidad de Insumos']} />
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
                  <th scope="col">Fuerza de la Indutria</th>
                  <th scope="col" className="text-center">Opciones</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(fuerzasindustrias).length !== 0 
            ?
                  <Fragment>
                      <TransitionGroup className="factores" component={null}>
                                {fuerzasindustrias.map((fuerzaindustria, i) => 
                                      <CSSTransition
                                      key={fuerzaindustria._id}
                                      timeout={500}
                                      classNames="fuerzaindustria"
                                      >   
                                          <tr>
                                                <th scope="row">{i+1}</th>
                                                <td>{fuerzaindustria.name}</td>
                                                <td className="text-center"><Link to="#" onClick={() => borrarFuerzaIndustria(fuerzaindustria._id)}><i className="fas fa-trash-alt text-primary"></i></Link></td>
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
 
export default FuerzaIndustria;