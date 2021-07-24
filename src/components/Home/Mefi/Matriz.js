import React, {useState, Fragment, useEffect} from 'react';
import Puntuacion from '../../../components/Home/Mefi/Puntuacion';

import {CSSTransition} from 'react-transition-group';
import {Link} from 'react-router-dom';
import {redondearDecimalPuro} from '../../../helpers'



const Matriz = ({matriz, changeMatriz, fortalezas, changeFortalezas, debilidades, changeDebilidades, empresas, total, ponderadofortalezas, ponderadodebilidades, resultados}) => {

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
          if(fortalezas.length === 0 ){
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°2: Agregue al menos una fortaleza'
               })
               changeSpinerMatriz(false);
               return null;
          }
          changeMatriz({
                 ...matriz,
                 error: ''
           })
          if(debilidades.length === 0 ){
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°2: Agregue al menos una debilidad'
               })
               changeSpinerMatriz(false);
               return null;
          }
          changeMatriz({
               ...matriz,
               error: ''
          })
          if((fortalezas.length + debilidades.length) >20 || (fortalezas.length + debilidades.length) < 10 ){
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°2: Deberá de tener entre un mínimo de 10 ó un máximo de 20 factores internos en total'
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
               <p>Primero genere la matriz, luego deberá de asignar una calificación de 3 a 4 para las fortalezas y de 1 a 2 para las debilidades donde:</p>
               <ul className="list-group list-group-flush">
                    <li className="list-group-item">4: Fortaleza Mayor (Fortaleza Importante ó Significativa)</li>
                    <li className="list-group-item">3: Fortaleza Menor (Fortaleza No Tan Importante ó Leve)</li>
                    <li className="list-group-item">2: Debilidad Menor (Debilidad Insignificante ó Leve)</li>
                    <li className="list-group-item">1: Debilidad Mayor (Debilidad Importante ó Riesgosa)</li>
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
                                             <th colSpan="4">Factores Internos Clave</th>
                                        </tr>
                                        <tr>
                                             <th scope="col">Fortalezas</th>
                                             <th scope="col">Valoración</th>
                                             <th scope="col">Calificación</th>
                                             <th scope="col">Puntuación</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {fortalezas.map((fortaleza, i) => 
                                                  <tr key={fortaleza._id}>
                                                       <td><strong>{i+1}.-</strong> {fortaleza.name}</td>
                                                       <td>{fortaleza.value}</td>
                                                       <Puntuacion factorinterno={fortaleza} factoresinternos={fortalezas} changeFactoresInternos={changeFortalezas} valoracion={fortaleza.value} fortalezas={true} resultados={resultados}/>
                                                  </tr>     
                                        )}
                                        <tr className="bg-secondary">
                                             <th colSpan="4" className="text-left">Debilidades</th>
                                        </tr>
                                        {debilidades.map((debilidad, i) => 
                                                  <tr key={debilidad._id}>
                                                       <td><strong>{i+1}.-</strong> {debilidad.name}</td>
                                                       <td>{debilidad.value}</td>
                                                       <Puntuacion factorinterno={debilidad} factoresinternos={debilidades} changeFactoresInternos={changeDebilidades} valoracion={debilidad.value} resultados={resultados}/>
                                                  </tr>
                                        )}
                                        <tr>
                                             <th className="border-top border-secondary">TOTALES</th>
                                             <th className = "border-top border-secondary">1</th>
                                             <th className = "border-top border-secondary"></th>
                                             <th className = "border-top border-secondary">{redondearDecimalPuro(parseFloat(ponderadodebilidades) + parseFloat(ponderadofortalezas))}</th>
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