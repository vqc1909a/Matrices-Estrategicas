import React, {Fragment, useState, useEffect} from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {CSSTransition} from 'react-transition-group';
import {Link} from 'react-router-dom';

const Resultados = ({estrategiasDA, estrategiasDO, estrategiasFA, estrategiasFO, resultados, changeResultados}) => {
  const [spinerresultados, changeSpinerResultados] = useState(false);
  const [butonresultados, changeButonResultados] = useState(true);
  const [inResultados, setInResultados] = useState(false);

  const {estado, error} = resultados;

   const generarResultados = () => {
        changeSpinerResultados(true);
        if (estrategiasFO.length === 0 || estrategiasDO.length === 0 || estrategiasFA.length === 0 || estrategiasDA.length === 0) {
            changeResultados({
                  ...resultados,
                  error: 'Regrese Al Paso N°3: Debe asignar por lo menos una estrategia de cada tipo '
            })
            changeSpinerResultados(false);
            return null;
        }
        changeResultados({
            ...resultados,
            error: ''
        });
        changeButonResultados(false);
        setTimeout(() => {
            changeSpinerResultados(false);
            changeResultados({
                  estado: true,
                  error: ''
            });
            setInResultados(true);
        }, 5000);
  }
  useEffect(() => {
      if(spinerresultados){
            const resultadostag = document.querySelector('.resultados');
            resultadostag.scrollIntoView({behavior: 'smooth', alignTo:false});
      }
  }, [spinerresultados]);

  const [estrategias, changeEstrategias] = useState(false);
    const guardarEstrategias = () => {
        sessionStorage.setItem('estrategias', JSON.stringify({estrategiasDA, estrategiasDO, estrategiasFA, estrategiasFO}))
        changeEstrategias(true);
    }
  return (
    <div className="resultados pt-4">
      <h3>Paso  N°4: Ver Resultados</h3>
      <p>Una vez haya asignado por lo menos una estrategia de cada tipo, <strong>por favor genere sus resultados</strong></p>
      {
            error ? <div className="alert alert-danger my-3">{error}</div> : ''
      }
      {butonresultados 
            ?
            <div className="generacion-resultados d-flex justify-content-center my-3">
                      <Link to="#" onClick={generarResultados} className="btn btn-lg btn-outline-primary">Generar Resultados</Link>
            </div>
            :
            ''
      }
      {
            spinerresultados ? 
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
      {estado
      ?
      <Fragment>
            <CSSTransition
                in={inResultados}
                timeout={500}
                classNames="resultados"
                >
            <table className="table table-bordered py-3" id="resultados-table">
                <tbody className="bg-primary">
                      <tr className="bg-secondary">
                          <th scope="col">Estrategias FO</th>
                          <th scope="col">Fortalezas</th>
                          <th scope="col">Oportunidades</th>
                      </tr>
                      {Object.keys(estrategiasFO).length !== 0
                          ?
                          estrategiasFO.map((estrategiaFO, i) => 
                          <tr key={i}>
                          <td>{estrategiaFO.estrategia}</td>
                          <td className="p-0">
                                <table className="table table-bordered  m-0">
                                    <tbody>
                                    {estrategiaFO.fortalezas.map((fortaleza, i) => <tr key={i}><td><strong>{i+1}.-</strong> {fortaleza}</td></tr>)}
                                    </tbody>
                                </table>
                          </td>
                          <td className="p-0">
                                <table className="table table-bordered  m-0">
                                    <tbody>
                                    {estrategiaFO.oportunidades.map((oportunidad, i) => <tr key={i}><td><strong>{i+1}.-</strong> {oportunidad}</td></tr>)}
                                    </tbody>
                                </table>
                          </td>  
                          </tr>
                          )
                          :
                          <tr>
                          <td>-</td> 
                          <td>-</td>
                          <td>-</td>
                          </tr>
                      }

                      <tr className="bg-secondary">
                          <th scope="col">Estrategias DO</th>
                          <th scope="col">Debilidades</th>
                          <th scope="col">Oportunidades</th>
                      </tr>
                      {Object.keys(estrategiasDO).length !== 0
                          ?
                          estrategiasDO.map((estrategiaDO, i) => 
                          <tr key={i}>
                          <td>{estrategiaDO.estrategia}</td>
                          <td className="p-0">
                                <table className="table table-bordered  m-0">
                                    <tbody>
                                    {estrategiaDO.debilidades.map((debilidad, i) => <tr key={i}><td><strong>{i+1}.-</strong> {debilidad}</td></tr>)}
                                    </tbody>
                                </table>
                          </td>
                          <td className="p-0">
                                <table className="table table-bordered  m-0">
                                    <tbody>
                                    {estrategiaDO.oportunidades.map((oportunidad, i) => <tr key={i}><td><strong>{i+1}.-</strong> {oportunidad}</td></tr>)}
                                    </tbody>
                                </table>
                          </td>  
                          </tr>
                          )
                          :
                          <tr>
                          <td>-</td> 
                          <td>-</td>
                          <td>-</td>
                          </tr>
                      }

                      <tr className="bg-secondary">
                          <th scope="col">Estrategias FA</th>
                          <th scope="col">Fortalezas</th>
                          <th scope="col">Amenazas</th>
                      </tr>
                      {Object.keys(estrategiasFA).length !== 0
                          ?
                          estrategiasFA.map((estrategiaFA, i) => 
                          <tr key={i}>
                          <td>{estrategiaFA.estrategia}</td>
                          <td className="p-0">
                                <table className="table table-bordered  m-0">
                                    <tbody>
                                    {estrategiaFA.fortalezas.map((fortaleza, i) => <tr key={i}><td><strong>{i+1}.-</strong> {fortaleza}</td></tr>)}
                                    </tbody>
                                </table>
                          </td>
                          <td className="p-0">
                                <table className="table table-bordered  m-0">
                                    <tbody>
                                    {estrategiaFA.amenazas.map((amenaza, i) => <tr key={i}><td><strong>{i+1}.-</strong> {amenaza}</td></tr>)}
                                    </tbody>
                                </table>
                          </td>  
                          </tr>
                          )
                          :
                          <tr>
                          <td>-</td> 
                          <td>-</td>
                          <td>-</td>
                          </tr>
                      }

                      <tr className="bg-secondary">
                          <th scope="col">Estrategias DA</th>
                          <th scope="col">Debilidades</th>
                          <th scope="col">Amenazas</th>
                      </tr>
                      {Object.keys(estrategiasDA).length !== 0
                          ?
                          estrategiasDA.map((estrategiaDA, i) => 
                          <tr key={i}>
                          <td>{estrategiaDA.estrategia}</td>
                          <td className="p-0">
                                <table className="table table-bordered  m-0">
                                    <tbody>
                                    {estrategiaDA.debilidades.map((debilidad, i) => <tr key={i}><td><strong>{i+1}.-</strong> {debilidad}</td></tr>)}
                                    </tbody>
                                </table>
                          </td>
                          <td className="p-0">
                                <table className="table table-bordered  m-0">
                                    <tbody>
                                    {estrategiaDA.amenazas.map((amenaza, i) => <tr key={i}><td><strong>{i+1}.-</strong> {amenaza}</td></tr>)}
                                    </tbody>
                                </table>
                          </td>  
                          </tr>              
                          )
                          :
                          <tr>
                          <td>-</td> 
                          <td>-</td>
                          <td>-</td>
                          </tr>
                      }
                </tbody>
            </table>
            </CSSTransition>
            {estrategias
                    ?
                    <div className="alert alert-success my-3">Estrategias Guardados Correctamente</div>
                    :
                    ''
            }
            <div className="d-flex justify-content-around py-3">
                {!estrategias
                    ?
                        <button className="btn btn-lg btn-secondary" data-toggle="tooltip" data-placement="top" title="Guarde estas estrategias para su uso en la matriz MPEC" onClick={guardarEstrategias} >Guardar Estrategias</button>
                    :
                    ''
                }
                <ReactHTMLTableToExcel
                id="resultados-buton"
                className="btn btn-primary btn-lg"
                table="resultados-table"
                filename="resultadosxls"
                sheet="resultadosxls"
                buttonText="Descargar Resultados"/>
            </div>
      </Fragment>
      :
      ''
      }
  </div>
  );
}
 
export default Resultados;