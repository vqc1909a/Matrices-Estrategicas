import React, {useState, Fragment, useEffect} from 'react';
import Puntuacion from '../../../components/Home/Mpc/Puntuacion';
import {CSSTransition} from 'react-transition-group';
import {Link} from 'react-router-dom';

const Matriz = ({matriz, changeMatriz, empresas, changeEmpresas, factores, total, obtenerSumaPuntajes, resultados}) => {
     const [spinermatriz, changeSpinerMatriz] = useState(false);
     const [butonmatriz, changeButonMatriz] = useState(true);
     const [inMatriz, setInMatriz] = useState(false);
     const {estado, error} = matriz;
     const generarMatriz = () => {
          changeSpinerMatriz(true);
          if(total !== 1){
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°1: La suma de los factores debe ser 1'
               })
               changeSpinerMatriz(false);
               return null;
          } 
          changeMatriz({
                ...matriz,
                error: ''
          })
          if(empresas.length < 2){
               changeMatriz({
                    ...matriz,
                    error: 'Regrese Al Paso N°2: La cantidad de empresas debe ser como mínimo 2'
               })
               changeSpinerMatriz(false);
               return null;
          }
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

     useEffect(()=>{
          if(spinermatriz){
               const matriztag = document.querySelector('.matriz');
               matriztag.scrollIntoView({behavior: 'smooth', alignTo:false});
          }
     }, [spinermatriz]);

     return (
          <div className="matriz pt-4">
               <h3>Paso  N°3: Generar Matriz y Asignar Valores</h3>
               <p>Primero genere la matriz, luego deberá de calificar cada factor de 1 a 4 de acuerdo a la <strong>"eficacia de respuesta estratégica de cada empresa a dicho factor "</strong> donde:</p>
               <ul className="list-group list-group-flush">
                    <li className="list-group-item">4: Excelente</li>
                    <li className="list-group-item">3: Por encima del promedio</li>
                    <li className="list-group-item">2: Nivel promedio </li>
                    <li className="list-group-item">1: Deficiente</li>
               </ul>
               {error ? <div className="alert alert-danger my-3">{error}</div> : '' }
               { butonmatriz &&  
                    <div className="generacion-matriz d-flex justify-content-center my-3">
                              <Link to="#" onClick={generarMatriz} className="btn btn-lg btn-outline-primary">Generar Matriz</Link>
                    </div> 
               }                             
               {
                    spinermatriz && 
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
               }
               
               {estado &&
                    <CSSTransition
                         in={inMatriz}
                         timeout={500}
                         classNames="matriz"
                         >
                         <table className="table table-sm my-3" id="matriz-table">
                              <thead className="bg-secondary">
                                   <tr>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        {empresas.map((empresa) => 
                                             <Fragment key={empresa._id}>
                                                  <th colSpan="2" className="text-center">{empresa.name}</th>
                                             </Fragment>
                                        )}
                                   </tr>
                                   <tr>
                                        <th scope="col">Factores críticos para el éxito</th>
                                        <th scope="col">Valoración</th>
                                        {empresas.map((empresa) => 
                                             <Fragment key={empresa._id}>
                                                  <th scope="col">Calificación</th>
                                                  <th scope="col">Puntuación</th>
                                             </Fragment>
                                        )}
                                   </tr>
                              </thead>
                              <tbody>
                                   {factores.map((factor, i) => 
                                             <tr key={factor._id}>
                                                  <td>{factor.name}</td>
                                                  <td>{factor.value}</td>
                                                  {empresas.map((empresa, i) => 
                                                       <Puntuacion key={i} valoracion={factor.value} empresa={empresa} empresas={empresas} factor={factor.name} changeEmpresas={changeEmpresas} resultados={resultados}/>
                                                  )}
                                             </tr>
                                   )}
                                   <tr>
                                        <th className="border-top border-secondary">Total</th>
                                        <th className = "border-top border-secondary"> 1 </th>
                                        {empresas.map((empresa) =>
                                             <Fragment key={empresa._id}>
                                                  <th className="border-top border-secondary"></th>
                                                  {empresa.puntajes.length === 0
                                                       ?
                                                       <th className="border-top border-secondary">0</th>
                                                       :
                                                       <th className="border-top border-secondary">{empresa.puntajes.length === 1 ? empresa.puntajes[0].ponderado : obtenerSumaPuntajes(empresa.puntajes)}</th>
                                                  }
                                             </Fragment>
                                        )}
                                   </tr>
                              </tbody>
                         </table>
                    </CSSTransition>
               }
          </div>
     );
}
 
export default Matriz;  