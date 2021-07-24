import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import Puntuacion from './Puntuacion';
import {redondearDecimalPuro} from '../../../helpers';

const Matriz = ({matriz, changeMatriz, estrategias, estrategiasseleccionadas, changeEstrategiasSeleccionadas, factoresinternos, factoresexternos, resultados, sumaEstrategiasSeleccionadas}) => {

  const [spinermatriz, changeSpinerMatriz] = useState(false);
  const [butonmatriz, changeButonMatriz] = useState(true);
  const [inMatriz, setInMatriz] = useState(false);
  
   const generarMatriz = () => {
        changeSpinerMatriz(true);
        if (estrategias.estrategiasDA.length === 0) {
              changeMatriz({
                  ...matriz,
                  error: 'Regrese Al Paso N°1: Complete la MATRIZ FODA'
              })
              changeSpinerMatriz(false);
              return null;
        }
        changeMatriz({
              ...matriz,
              error: ''
        })

        if (estrategiasseleccionadas.length === 0) {
              changeMatriz({
                  ...matriz,
                  error: 'Regrese Al Paso N°2: Seleccione las estrategias a comparar'
              })
              changeSpinerMatriz(false);
              return null;
        }
        changeMatriz({
              ...matriz,
              error: ''
        })

        changeButonMatriz(false);
        setTimeout(() => {
              changeSpinerMatriz(false);
              changeMatriz({
                  estado: true,
                  error: ''
              });
              setInMatriz(true);
        }, 5000);
    }

    useEffect(() => {
        if(spinermatriz){
              const matriztag = document.querySelector('.matriz-mpec');
              matriztag.scrollIntoView({behavior: 'smooth', alignTo:false});
        }
    }, [spinermatriz])

    
  return (
    
      <div className="matriz-mpec pt-4">
            <h3>Paso  N°3: Generar Matriz MPEC</h3>
            <p>Una vez completado el PASO N°1 y N°2 proceda a generar la matriz MPEC, luego de generar la matriz deberá de especificar un valor siguiendo la siguiente pregunta <strong>"¿Afecta este factor a la selección de la estrategia?"</strong></p>
            <p>Si la respuesta es positiva se asigna un valor del 1 al 4 donde: </p>
            <ul className="list-group list-group-flush my-3">
                <li className="list-group-item"><strong>1-Atractivo</strong></li>
                <li className="list-group-item"><strong>2-Algo Atractivo</strong></li>
                <li className="list-group-item"><strong>3-Mas o menos atractivo</strong></li>
                <li className="list-group-item"><strong>4-Muy Atractivo</strong></li>
            </ul>
            <p><strong>NOTA 1:</strong> Si la respuesta a la pregunta es negativa, entonces se asigna el valor de 0</p>
            <p><strong>NOTA 2:</strong> Este valor especifica el <strong>(Puntaje del Grado de Atracción)</strong> del factor hacia la estrategia</p>

            { matriz.error 
                ? 
                <div className="alert alert-danger my-3">{matriz.error}</div> 
                : 
                ''
            }
            { butonmatriz 
                ?
                <div className="generacion-matriz d-flex justify-content-center my-3">
                          <Link to="#" onClick={generarMatriz} className="btn btn-lg btn-outline-primary">Generar Matriz</Link>
                </div>
                :
                ''  
            }
            {
                spinermatriz
                ?
                      <div className="sk-cube-grid">
                          <div className="sk-cube sk-cube1"></div>
                          <div className="sk-cube sk-cube2"></div>
                          <div className="sk-cube sk-cube3"></div>
                          <div className="sk-cube sk-cube4"></div>
                          <div className="sk-cube sk-cube5"></div>
                          <div className="sk-cube sk-cube6"></div>
                          <div className="sk-cube sk-cube7"></div>
                          <div className="sk-cube sk-cube8"></div>
                          <div className="sk-cube sk-cube9"></div>
                      </div>
                :
                ''
            }

            {matriz.estado
                ?
                <Fragment>
                      <CSSTransition
                          in={inMatriz}
                          timeout={500}
                          classNames="matriz"
                          >
                      <table className="table table-bordered table-sm my-3" id="matriz-table">
                          <thead>
                                <tr>
                                    <th colspan="1"></th>
                                    <th colspan="1"></th>
                                    <th colspan="1"></th>
                                    <th colspan={`${2 * estrategiasseleccionadas.length}`} align="center" className="text-center bg-primary">Estrategias a Comparar</th>
                                </tr>
                          </thead>
                          <tbody>
                                <tr>
                                    <th colSpan="1"></th>
                                    <th colSpan="1" className="bg-primary">Factores clave de éxito en laa industria</th>
                                    <th colSpan="1" className="bg-primary">Ponderación</th>
                                    {estrategiasseleccionadas.map((estrategia) => (
                                      <td colSpan="2" className="bg-secondary">
                                        <table className="table table-sm m-0" key={estrategia.estrategia}>
                                          <tr><td><strong>Estrategia:</strong> {estrategia.estrategia}</td></tr>
                                          <tbody>
                                            {estrategia.fortalezas 
                                            ?
                                            <Fragment>
                                            <tr><th>Fortalezas</th></tr>
                                            {estrategia.fortalezas.map((estr)=>(
                                              <tr key={estr}><td>{estr}</td></tr>
                                            ))}
                                            </Fragment>
                                            :
                                            ''
                                            }
                                            {estrategia.debilidades 
                                            ?
                                            <Fragment>
                                            <tr><th>Debilidades</th></tr>
                                            {estrategia.debilidades.map((estr)=>(
                                              <tr key={estr}><td>{estr}</td></tr>
                                            ))}
                                            </Fragment>
                                            :
                                            ''
                                            }
                                            {estrategia.oportunidades 
                                              ?
                                              <Fragment>
                                                <tr><th>Oportunidades</th></tr>
                                                {estrategia.oportunidades.map((estr)=>(
                                                  <tr key={estr}><td>{estr}</td></tr>
                                                ))}
                                              </Fragment>
                                              :
                                              ''
                                            }
                                             {estrategia.amenazas 
                                              ?
                                              <Fragment>
                                                <tr><th>Amenazas</th></tr>
                                                {estrategia.amenazas.map((estr)=>(
                                                  <tr key={estr}><td>{estr}</td></tr>
                                                ))}
                                              </Fragment>
                                              :
                                              ''
                                            }
                                          </tbody>
                                        </table>
                                      </td>
                                    ))}
                                </tr>
                                {/* Factores Externos */}
                                <tr>
                                  <th rowSpan={`${factoresexternos.oportunidades.length + factoresexternos.amenazas.length + 3}`} className="bg-primary" style={{'text-align': 'center', 'vertical-align': 'middle', 'width': '150px'}}>Factores Externos</th>
                                  <th colSpan="2" className="bg-secondary">Oportunidades</th>
                                  {estrategiasseleccionadas.map((i) => (
                                    <Fragment key={i}>
                                      <th className="bg-secondary">PA</th>          
                                      <th className="bg-secondary">PTA</th>          
                                    </Fragment>
                                  ))}
                                </tr>
                                {factoresexternos.oportunidades.map((oportunidad, i) => 
                                  <tr key={oportunidad._id}>
                                    <td><strong>{i+1}.-</strong>{oportunidad.name}</td>
                                    <td>{oportunidad.ponderado}</td>
                                    {estrategiasseleccionadas.map((estrategia) => (
                                      <Puntuacion factor={oportunidad} estrategia={estrategia} estrategiasseleccionadas={estrategiasseleccionadas} changeEstrategiasSeleccionadas={changeEstrategiasSeleccionadas} resultados={resultados}></Puntuacion>
                                    ))}
                                  </tr>
                                )}
                                <tr>
                                  <th colSpan="2" className="bg-secondary">Amenazas</th>
                                  {estrategiasseleccionadas.map((i) => (
                                    <Fragment key={i}>
                                      <th></th>          
                                        <th></th>        
                                    </Fragment>
                                  ))}
                                </tr>
                                {factoresexternos.amenazas.map((amenaza, i) => 
                                  <tr key={amenaza._id}>
                                    <td><strong>{i+1}.-</strong>{amenaza.name}</td>
                                    <td>{amenaza.ponderado}</td>
                                    {estrategiasseleccionadas.map((estrategia) => (
                                      <Puntuacion factor={amenaza} estrategia={estrategia} estrategiasseleccionadas={estrategiasseleccionadas} changeEstrategiasSeleccionadas={changeEstrategiasSeleccionadas} resultados={resultados}></Puntuacion>
                                    ))}
                                  </tr>
                                )}
                                <tr>
                                  <th>Total</th>
                                  <th>1</th>
                                  {estrategiasseleccionadas.map((i) => (
                                    <Fragment key={i}>
                                      <th></th>          
                                      <th></th>        
                                    </Fragment>
                                  ))} 
                                </tr>

                                {/* Factores Internos */}
                                 <tr>
                                  <th rowSpan={`${factoresinternos.fortalezas.length + factoresinternos.debilidades.length + 4}`} className="bg-primary" style={{'text-align': 'center', 'vertical-align': 'middle', 'width': '150px'}}>Factores Internos</th>
                                  <th colSpan="2" className="bg-secondary">Fortalezas</th>
                                  {estrategiasseleccionadas.map((i) => (
                                    <Fragment key={i}>
                                      <th></th>          
                                      <th></th>        
                                    </Fragment>
                                  ))}          
                                </tr>
                                {factoresinternos.fortalezas.map((fortaleza, i) => 
                                  <tr key={fortaleza._id}>
                                    <td><strong>{i+1}.-</strong>{fortaleza.name}</td>
                                    <td>{fortaleza.ponderado}</td>
                                    {estrategiasseleccionadas.map((estrategia) => (
                                      <Puntuacion factor={fortaleza} estrategia={estrategia} estrategiasseleccionadas={estrategiasseleccionadas} changeEstrategiasSeleccionadas={changeEstrategiasSeleccionadas} resultados={resultados}></Puntuacion>
                                    ))}
                                  </tr>
                                )}
                                <tr>
                                  <th colSpan="2" className="bg-secondary">Debilidades</th>
                                  {estrategiasseleccionadas.map((i) => (
                                    <Fragment key={i}>
                                      <th></th>          
                                      <th></th>        
                                    </Fragment>
                                  ))} 
                                </tr>
                                {factoresinternos.debilidades.map((debilidad, i) => 
                                  <tr key={debilidad._id}>
                                    <td><strong>{i+1}.-</strong>{debilidad.name}</td>
                                    <td>{debilidad.ponderado}</td>
                                    {estrategiasseleccionadas.map((estrategia) => (
                                      <Puntuacion factor={debilidad} estrategia={estrategia} estrategiasseleccionadas={estrategiasseleccionadas} changeEstrategiasSeleccionadas={changeEstrategiasSeleccionadas} resultados={resultados}></Puntuacion>
                                    ))}
                                  </tr>
                                )}
                                <tr>
                                  <th>Total</th>
                                  <th>1</th>

                                  {estrategiasseleccionadas.map((i) => (
                                    <Fragment key={i}>
                                      <th></th>          
                                      <th></th>        
                                    </Fragment>
                                  ))} 
                                </tr>
                                <tr>
                                  <th colSpan="2" className="bg-primary">Suma del puntaje total del grado de atracción</th>
                                  {estrategiasseleccionadas.map((estrategia, i) => (
                                    <Fragment key={estrategia._id}>
                                      <th></th>          
                                      <th className="bg-secondary">{redondearDecimalPuro(sumaEstrategiasSeleccionadas[i])}</th>        
                                    </Fragment>
                                  ))} 
                                </tr>
                          </tbody>
                      </table>
                      </CSSTransition>
                </Fragment>
                :
                ''
            }

      </div>
  );
}
 
export default Matriz;