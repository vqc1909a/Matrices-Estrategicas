import React, {Fragment, useState, useEffect} from 'react';
import ContentHeader from '../../components/Home/ContentHeader';
import {CSSTransition} from 'react-transition-group';
import {Link} from 'react-router-dom';

import EstrategiaFO from '../../components/Home/Foda/EstrategiaFO';
import EstrategiaDO from '../../components/Home/Foda/EstrategiaDO';
import EstrategiaFA from '../../components/Home/Foda/EstrategiaFA';
import EstrategiaDA from '../../components/Home/Foda/EstrategiaDA';
import Resultados from '../../components/Home/Foda/Resultados';

// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import '../../styles/Home/Mefe.css';
import '../../styles/spinner.css'
import useSeo from '../../hooks/useSeo';

const Foda = () => {
     
     const [factoresinternos, changeFactoresInternos] = useState({});
     const [factoresexternos, changeFactoresExternos] = useState({});

     const foda = {
          name: "FODA",
          subname: "(Fortalezas, Oportunidades, Debilidades y Amenazas)",
          description: "Luego de conciliar las fortalezas y debilidades de la organización con las amenazas y oportunidades del mercado su objetivo es generar la mayor cantidad de alternativas estratégicas"
     }
     useSeo({title: `Matriz ${foda.name} | Análisis y Formulacion de Estrategias`, description: foda.description});

     const [matriz, changeMatriz] = useState({
          estado: false,
          error: ''
     });
     const [spinermatriz, changeSpinerMatriz] = useState(false);
     const [butonmatriz, changeButonMatriz] = useState(true);
     const [inMatriz, setInMatriz] = useState(false);
     const generarMatriz = () => {
          changeSpinerMatriz(true);
          if (Object.keys(factoresinternos).length === 0) {
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°1: Complete la MATRIZ EFI'
               })
               changeSpinerMatriz(false);
               return null;
          }
          changeMatriz({
               ...matriz,
               error: ''
          })
          if (Object.keys(factoresexternos).length === 0) {
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°2: Complete la MATRIZ EFE'
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
               const matriztag = document.querySelector('.matriz-foda');
               matriztag.scrollIntoView({behavior: 'smooth', alignTo:false});
          }
     }, [spinermatriz])

     useEffect(()=>{
          if(sessionStorage.getItem('factoresinternos')){
               changeFactoresInternos(JSON.parse(sessionStorage.getItem('factoresinternos')))
          }else{
                changeFactoresInternos({});
          }
          if(sessionStorage.getItem('factoresexternos')){
               changeFactoresExternos(JSON.parse(sessionStorage.getItem('factoresexternos')))
          }else{
                changeFactoresExternos({});
          }
     },[]);

     const [estrategiasFO, changeEstrategiasFO] = useState([]);
     const [estrategiasDO, changeEstrategiasDO] = useState([]);
     const [estrategiasFA, changeEstrategiasFA] = useState([]);
     const [estrategiasDA, changeEstrategiasDA] = useState([]);
      
     
     const [resultados, changeResultados] = useState({
          estado: false,
          error: ''
     })

    

     

     return (
          <Fragment>
               <ContentHeader matriz={foda} />
                    <section className="content">
                         <div className="container-fluid">
                               <h2 className="display-4">Instrucciones</h2>
                               <div className="matriz-efi pt-4">
                                   <h3>Paso  N°1: Completar la Matriz EFI</h3>
                                   <p>Deberá de completar todos los pasos que corresponden a la MATRIZ EFI y guardar sus factores internos<br />Para eso dirigase a esa matriz desde los botones laterales o haz click en el siguiente botón que se muestra a continuación: </p>
                                   <div className="d-flex justify-content-center">
                                        <Link to="/mefi" className="btn btn-lg btn-outline-secondary">
                                             Ir a la Matriz EFI
                                        </Link>
                                   </div>
                              </div>
                              <div className="matriz-efe pt-4">
                                   <h3>Paso  N°2: Completar la Matriz EFE</h3>
                                   <p>Deberá de completar todos los pasos que corresponden a la MATRIZ EFE y guardar sus factores externos<br />Para eso dirigase a esa matriz desde los botones laterales o haz click en el siguiente botón que se muestra a continuación: </p>
                                   <div className="d-flex justify-content-center">
                                        <Link  to="/mefe" className="btn btn-lg btn-outline-secondary" >
                                             Ir a la Matriz EFE
                                        </Link>
                                   </div>
                              </div>
                              <div className="matriz-foda pt-4">
                                   <h3>Paso  N°3: Generar matriz FODA</h3>
                                   <p>Una vez completado el PASO N°1 y el PASO N°2 proceda a generar la matriz FODA, luego de generar la matriz deberá de especificar las estrategias a utilizar donde: </p>
                                   <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><strong>Estrategias FO:</strong> Deben utilizar las fortalezas internas para aprovechar las oportunidades del sector o mercado</li>
                                        <li className="list-group-item"><strong>Estrategias DO:</strong> Deben orientar a las empresas en la superación de sus debilidades con las oportunidades seleccionadas</li>
                                        <li className="list-group-item"><strong>Estrategias FA:</strong> Deben utilizar las fortalezas internas para reducir el impacto de las amenazas del mercado</li>
                                        <li className="list-group-item"><strong>Estrategias DA:</strong> Representan un desafío mayor, deben superar debilidades internas y reducir el impacto de amenazas internas</li>
                                   </ul>
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
                                             <table className="table my-3" id="matriz-table">
                                                  <thead>
                                                       <tr>
                                                            <th colspan="1"></th>
                                                            <th colspan="1"></th>
                                                            <th colspan="2" className="bg-primary">Matriz de Evaluación de Factores Internos (EFI)</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td className="bg-secondary">Fortalezas</td>
                                                            <td className="bg-secondary">Debilidades</td>
                                                       </tr>
                                                       <tr>
                                                            <td></td>
                                                            <td></td>
                                                            {Object.keys(factoresinternos).length !== 0
                                                                 ? 
                                                                 <Fragment> 
                                                                 <td className = "p-0">
                                                                      <table className="table table-bordered  m-0">
                                                                           <tbody>
                                                                           {factoresinternos.fortalezas.map((fortaleza, i) => <tr key={fortaleza._id}><td><strong>{i+1}.-</strong>{fortaleza.name}</td></tr>)}
                                                                           </tbody>
                                                                      </table>
                                                                 </td>
                                                                 <td className="p-0">
                                                                      <table className="table table-bordered  m-0">
                                                                           <tbody>
                                                                           {factoresinternos.debilidades.map((debilidad, i) => <tr key={debilidad._id}><td><strong>{i+1}.</strong> {debilidad.name}</td></tr>)}
                                                                           </tbody>
                                                                      </table>
                                                                 </td>
                                                                 </Fragment>   
                                                                 :
                                                                 <Fragment>
                                                                      <td></td>
                                                                      <td></td>
                                                                 </Fragment>
                                                            }
                                                       </tr>
                                                       <tr>
                                                            <th rowspan="4" className="bg-primary" style={{'text-align': 'center', 'vertical-align': 'middle', 'width': '150px'}}>Matriz de Evaluación de Factores Externos (EFE)</th>
                                                            <td className="bg-secondary">Oportunidades</td>
                                                            <td className="bg-primary">Estrategias FO</td>
                                                            <td className="bg-primary">Estrategias DO</td>
                                                       </tr>
                                                       <tr>
                                                            {Object.keys(factoresexternos).length !== 0
                                                                 ?
                                                                 <td className="p-0">
                                                                      <table className="table table-bordered mb-0" style={{'min-height': '65vh'}}>
                                                                           <tbody>
                                                                                {factoresexternos.oportunidades.map((oportunidad, i) => <tr key={oportunidad._id}><td><strong>{i+1}.</strong> {oportunidad.name}</td></tr>)}
                                                                           </tbody>
                                                                      </table>
                                                                 </td>
                                                                 :
                                                                 <td>-</td>
                                                            }
                                                            <td>
                                                                 {resultados.estado
                                                                 ?
                                                                 '-'
                                                                 :
                                                                 <EstrategiaFO estrategiasFO={estrategiasFO} changeEstrategiasFO={changeEstrategiasFO} factoresinternos={factoresinternos} factoresexternos={factoresexternos}></EstrategiaFO>
                                                                 }
                                                            </td>
                                                            <td>
                                                                {resultados.estado
                                                                 ?
                                                                 '-'
                                                                 :
                                                                 <EstrategiaDO estrategiasDO={estrategiasDO} changeEstrategiasDO={changeEstrategiasDO} factoresinternos={factoresinternos} factoresexternos={factoresexternos}></EstrategiaDO>
                                                                }
                                                            </td>
                                                          </tr>
                                                        <tr>
                                                            <td className="bg-secondary">Amenazas</td>
                                                            <td className="bg-primary">Estrategias FA</td>
                                                            <td className="bg-primary">Estrategias DA</td>
                                                       </tr>
                                                        <tr>
                                                            {Object.keys(factoresexternos).length !== 0
                                                                 ?
                                                                 <td className="p-0">
                                                                      <table className="table table-bordered m-0" style={{'min-height': '60vh'}}>
                                                                           <tbody>
                                                                                {factoresexternos.amenazas.map((amenaza, i) => <tr><td><strong>{i+1}.</strong> {amenaza.name}</td></tr>)}
                                                                           </tbody>
                                                                      </table>
                                                                 </td>
                                                                 :
                                                                 <td>-</td>
                                                            }
                                                            <td>
                                                                 {resultados.estado
                                                                 ?
                                                                 '-'
                                                                 :
                                                                  <EstrategiaFA estrategiasFA={estrategiasFA} changeEstrategiasFA={changeEstrategiasFA} factoresinternos={factoresinternos} factoresexternos={factoresexternos}></EstrategiaFA>
                                                                 }
                                                            </td>
                                                            <td>
                                                                 {resultados.estado
                                                                 ?
                                                                 '-'
                                                                 :
                                                                  <EstrategiaDA estrategiasDA={estrategiasDA} changeEstrategiasDA={changeEstrategiasDA} factoresinternos={factoresinternos} factoresexternos={factoresexternos}></EstrategiaDA>
                                                                  }
                                                            </td>
                                                       </tr>
                                                  </tbody>
                                             </table>
                                             </CSSTransition>
                                        </Fragment>
                                        :
                                        ''
                                   }
                              </div>
                                {matriz.estado
                                   ?
                                   <Resultados estrategiasDA={estrategiasDA} estrategiasDO={estrategiasDO} estrategiasFA={estrategiasFA} estrategiasFO={estrategiasFO} resultados={resultados} changeResultados={changeResultados}></Resultados>
                                   :
                                   ''
                                }


                         </div>
                    </section>
          </Fragment>
     );
}
 
export default Foda;