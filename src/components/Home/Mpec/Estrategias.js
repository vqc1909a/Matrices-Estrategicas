import React, {Fragment, useState} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { v4 as uuidv4 } from "uuid";
import {Link} from 'react-router-dom';

const Estrategias = ({matriz, estrategiasDA, estrategiasDO, estrategiasFA, estrategiasFO, estrategiasseleccionadas, changeEstrategiasSeleccionadas}) => {

  const [error, changeError] = useState('');
  const seleccionarEstrategias = (estra) => {
    let estrategia = estrategiasseleccionadas.find((estrai) => estrai.estrategia.toLowerCase().trim() === estra.estrategia.toLowerCase().trim());

    if(estrategia){ 
      changeError("La estrategia ya ha sido seleccionada")
      return null;
    }
    changeError("");
    changeEstrategiasSeleccionadas([...estrategiasseleccionadas, {...estra, ponderados: [], _id: uuidv4()}])
  }

  const borrarEstrategia = (_id) => {
    const restestrategias = estrategiasseleccionadas.filter((estrategia)=> estrategia._id !== _id);
    changeEstrategiasSeleccionadas([...restestrategias])
  }
  
  return (
    <div className="estrategias pt-4">
      <h3>Paso  N°2: Seleccionar Estrategias</h3>
      <p>Luego de completar los pasos anteriores deberá de seleccionar las estrategias a comparar para su posterior análisis. <br /><strong>Las estrategias a comparar no necesariamente tienen que ser del mismo tipo.</strong></p>
      <div className="container-fluid">
        <div className="row">
          <h4 className="mt-3">Estrategias Seleccionadas:</h4>
          <table className="table table-hover">
              <thead className="bg-secondary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Estrategias</th>
                        <th scope="col" className="text-center">Opciones</th>
                    </tr>
              </thead>
              <tbody>
                    {Object.keys(estrategiasseleccionadas).length !== 0 
                    ?
                        <Fragment>
                              <TransitionGroup className="oportunidades" component={null}>
                                        {estrategiasseleccionadas.map((estrategia, i) => 
                                            <CSSTransition
                                            key={estrategia._id}
                                            timeout={500}
                                            classNames="oportunidad"
                                            >   
                                                  <tr >
                                                      <th scope="row">{i+1}</th>
                                                      <td>{estrategia.estrategia}</td>
                                                      {matriz.estado
                                                      ?
                                                      <td>-</td>
                                                      :
                                                      <td className="text-center"><Link to="#" onClick={() => borrarEstrategia(estrategia._id)}><i className="fas fa-trash-alt text-primary"></i></Link></td>
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
      </div>
      <div className="modal fade" id="modalEstrategiasDA">
          <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-warning">
                    <div className="modal-header">
                          <h4 className="modal-title">Estrategias DA</h4>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                          <div className="list-group text-primary">

                              {estrategiasDA.length !== 0 
                              ? 
                              <Fragment>
                              <li className="list-group-item list-group-item-action active px-0">Seleccionar Estrategias DA</li>
                              {estrategiasDA.map(estrategia =>  <button key={estrategia.estrategia} className="list-group-item list-group-item-action" data-dismiss="modal" value={estrategia.estrategia} onClick={() => seleccionarEstrategias(estrategia)}>{estrategia.estrategia}</button>)}
                              </Fragment>
                              :
                              <li className="list-group-item list-group-item-action active px-0">No Se Encuentran Estrategias DA</li>
                              }
                          </div>
                    </div>
                </div>
          </div>
      </div>
      <div className="modal fade" id="modalEstrategiasDO">
          <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-warning">
                    <div className="modal-header">
                          <h4 className="modal-title">Estrategias DO</h4>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                          <div className="list-group text-primary">
                              {estrategiasDO.length !== 0 
                              ? 
                              <Fragment>
                              <li className="list-group-item list-group-item-action active px-0">Seleccionar Estrategias DO</li>
                              {estrategiasDO.map(estrategia =>  <button key={estrategia.estrategia} className="list-group-item list-group-item-action" data-dismiss="modal" value={estrategia.estrategia} onClick={() => seleccionarEstrategias(estrategia)}>{estrategia.estrategia}</button>)}
                              </Fragment>
                              :
                              <li className="list-group-item list-group-item-action active px-0">No Se Encuentran Estrategias DO</li>

                              }
                          </div>
                    </div>
                </div>
          </div>
      </div>
      <div className="modal fade" id="modalEstrategiasFA">
          <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-warning">
                    <div className="modal-header">
                          <h4 className="modal-title">Estrategias FA</h4>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                          <div className="list-group text-primary">
                              {estrategiasFA.length !== 0 
                              ? 
                              <Fragment>
                              <li className="list-group-item list-group-item-action active px-0">Seleccionar Estrategias FA</li>
                              {estrategiasFA.map(estrategia =>  <button key={estrategia.estrategia} className="list-group-item list-group-item-action" data-dismiss="modal" value={estrategia.estrategia} onClick={() => seleccionarEstrategias(estrategia)}>{estrategia.estrategia}</button>)}
                              </Fragment>
                              :
                              <li className="list-group-item list-group-item-action active px-0">No Se Encuentran Estrategias FA</li>
                              }
                          </div>
                    </div>
                </div>
          </div>
      </div>
      <div className="modal fade" id="modalEstrategiasFO">
          <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-warning">
                    <div className="modal-header">
                          <h4 className="modal-title">Estrategias FO</h4>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                          <div className="list-group text-primary">
                              {estrategiasFO.length !== 0 
                              ? 
                              <Fragment>
                              <li className="list-group-item list-group-item-action active px-0">Seleccionar Estrategias FO</li>
                              {estrategiasFO.map(estrategia =>  <button key={estrategia.estrategia} className="list-group-item list-group-item-action" data-dismiss="modal" value={estrategia.estrategia} onClick={() => seleccionarEstrategias(estrategia)}>{estrategia.estrategia}</button>)}
                              </Fragment>
                              :
                              <li className="list-group-item list-group-item-action active px-0">No Se Encuentran Estrategias FO</li>

                              }
                          </div>
                    </div>
                </div>
          </div>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
            {matriz.estado
            ?
            ''
            :
            <Fragment>

              <div className="col-md-3">
                <button type="button" className="btn btn-primary btn-lg btn-block mb-2" data-toggle="modal" data-target={`#modalEstrategiasDA`}>Estrategias DA</button>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn btn-primary btn-lg btn-block mb-2" data-toggle="modal" data-target={`#modalEstrategiasDO`}>Estrategias DO</button>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn btn-primary btn-lg btn-block mb-2" data-toggle="modal" data-target={`#modalEstrategiasFA`}>Estrategias FA</button>
              </div>
                <div className="col-md-3">
                <button type="button" className="btn btn-primary btn-lg btn-block mb-2" data-toggle="modal" data-target={`#modalEstrategiasFO`}>Estrategias FO</button>
              </div>

             
              
            </Fragment>
            }
      </div>
    </div>  
  );
}
 
export default Estrategias;