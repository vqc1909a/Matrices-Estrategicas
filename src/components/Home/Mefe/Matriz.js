import React, {useState, Fragment, useEffect} from 'react';
import Puntuacion from '../../../components/Home/Mefe/Puntuacion';

import {CSSTransition} from 'react-transition-group';
import {Link} from 'react-router-dom';
import {redondearDecimalPuro} from '../../../helpers'



const Matriz = ({matriz, changeMatriz, oportunidades, changeOportunidades, amenazas, changeAmenazas, empresas, total, ponderadooportunidades, ponderadoamenazas, resultados}) => {

     const [spinermatriz, changeSpinerMatriz] = useState(false);
     const [butonmatriz, changeButonMatriz] = useState(true);
     const [inMatriz, setInMatriz] = useState(false);

     const generarMatriz = () => {
          changeSpinerMatriz(true);
          if (empresas.length !== 1) {
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°1: Agregue la empresa a evaluar'
               })
               changeSpinerMatriz(false);
               return null;
          }
          changeMatriz({
               ...matriz,
               error: ''
          })
          if(total !== 1){
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°2: La suma de cada valor de los factores debe ser 1'
               })
               changeSpinerMatriz(false);
               return null;
          } 
          changeMatriz({
                ...matriz,
                error: ''
          })
          if(oportunidades.length === 0 ){
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°2: Agregue al menos una oportunidad'
               })
               changeSpinerMatriz(false);
               return null;
          }
          changeMatriz({
                 ...matriz,
                 error: ''
           })
          if(amenazas.length === 0 ){
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°2: Agregue al menos una amenaza'
               })
               changeSpinerMatriz(false);
               return null;
          }
          changeMatriz({
               ...matriz,
               error: ''
          })
          if((oportunidades.length + amenazas.length) >20 || (oportunidades.length + amenazas.length) < 10 ){
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°2: Deberá de tener entre un mínimo de 10 ó un máximo de 20 factores externos en total'
               })
               changeSpinerMatriz(false);
               return null;
          }
          changeMatriz({
               ...matriz,
               error: ''
          })
          changeButonMatriz(false);
          setTimeout(()=>{
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
               const matriztag = document.querySelector('.matriz');
               matriztag.scrollIntoView({behavior: 'smooth', alignTo:false});
          }
     }, [spinermatriz])


     return (
           <div className="matriz pt-4">
               <h3>Paso  N°3: Generar Matriz y Asignar Calificación</h3>
               <p>Primero genere la matriz, luego deberá de asignar una calificación de 1 a 4 a cada factor externo para indicar con cuanta eficacia pueden responder las estrategias de la empresa a dicho factor donde:</p>
               <ul className="list-group list-group-flush">
                    <li className="list-group-item">4: (Excelente)</li>
                    <li className="list-group-item">3: (Por arriba del promedio)</li>
                    <li className="list-group-item">2: (Nivel Promedio)</li>
                    <li className="list-group-item">1: (Deficiente)</li>
               </ul>
               {
                    matriz.error ? <div className="alert alert-danger my-3">{matriz.error}</div> : ''
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
                                   <thead className="bg-secondary">
                                        <tr>
                                             <th colSpan="4" className="text-center">EMPRESA {empresas[0].name}</th>
                                        </tr>
                                        <tr>
                                             <th colSpan="4">Factores Externos Clave</th>
                                        </tr>
                                        <tr>
                                             <th scope="col">Oportunidades</th>
                                             <th scope="col">Valoración</th>
                                             <th scope="col">Calificación</th>
                                             <th scope="col">Puntuación</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {oportunidades.map((oportunidad, i) => 
                                                  <tr key={oportunidad._id}>
                                                       <td><strong>{i+1}.-</strong> {oportunidad.name}</td>
                                                       <td>{oportunidad.value}</td>
                                                       <Puntuacion factorexterno={oportunidad} factoresexternos={oportunidades} changeFactoresExternos={changeOportunidades} valoracion={oportunidad.value} resultados={resultados}/>
                                                  </tr>     
                                        )}
                                        <tr className="bg-secondary">
                                             <th colSpan="4" className="text-left">Amenazas</th>
                                        </tr>
                                        {amenazas.map((amenaza, i) => 
                                                  <tr key={amenaza._id}>
                                                       <td><strong>{i+1}.-</strong> {amenaza.name}</td>
                                                       <td>{amenaza.value}</td>
                                                       <Puntuacion factorexterno={amenaza} factoresexternos={amenazas} changeFactoresExternos={changeAmenazas} valoracion={amenaza.value} resultados={resultados}/>
                                                  </tr>
                                        )}
                                        <tr>
                                             <th className="border-top border-secondary">TOTALES</th>
                                             <th className = "border-top border-secondary">1</th>
                                             <th className = "border-top border-secondary"></th>
                                             <th className = "border-top border-secondary">{redondearDecimalPuro(parseFloat(ponderadooportunidades) + parseFloat(ponderadoamenazas))}</th>
                                        </tr>
                                   </tbody>
                              </table>
                         </CSSTransition>
                              {/* {resultados.estado
                              ?    
                              <div className="text-center">
                                   <ReactHTMLTableToExcel
                                   id="matriz-buton"
                                   className="btn btn-primary btn-lg"
                                   table="matriz-table"
                                   filename="matrizxls"
                                   sheet="matrizxls"
                                   buttonText="Descargar Matriz"/>
                              </div>
                              :
                              ''
                              } */}
                    </Fragment>
                    :
                    ''
               }
          </div>
     );
}
 
export default Matriz;