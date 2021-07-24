import React , {Fragment, useState, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import {Link} from 'react-router-dom';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {redondearDecimalPuro} from '../../../helpers'

const Resultados = ({fortalezas, debilidades, empresas, ponderadofortalezas, ponderadodebilidades, resultados, changeResultados}) => {
    
     const {estado, error} = resultados;

     const [spinerresultados, changeSpinerResultados] = useState(false);
     const [butonresultados, changeButonResultados] = useState(true);
     const [inResultados, setInResultados] = useState(false);

     const generarResultados = () => {
          changeSpinerResultados(true);
          let totalfactores = fortalezas.length + debilidades.length; 

          let totalfortalezas = 0;
          fortalezas.forEach((fortaleza)=>{
               if(fortaleza.ponderado !== ''){
                    totalfortalezas+= 1
               }
          })
          let totaldebilidades = 0;
          debilidades.forEach((debilidad)=>{
               if(debilidad.ponderado !== ''){
                    totaldebilidades+=1;
               }
          })
          if(totalfactores !== totalfortalezas + totaldebilidades){
               changeResultados({
                    ...resultados,
                    error: 'Regrese Al Paso N°3: Por favor rellenar todos los campos de calificacion'
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
     const obtenerSituacion = (total) => {
          if(total === 1){
               return 'Riesgo'
          }else if(total < 2.5){
               return "Débil"
          }else if(total === 2.5){
               return "Promedio"
          }else if(total > 2.5 && total < 4){
               return "Fuerte"
          }else if(total === 4){
               return "Excelente"
          }
     }
     const [factoresinternos, changeFactoresInternos] = useState(false);
     const guardarFactoresInternos = () => {
          sessionStorage.setItem('factoresinternos', JSON.stringify({fortalezas, debilidades}))
          changeFactoresInternos(true);
     }

     useEffect(() => {
          if(spinerresultados){
               const resultadostag = document.querySelector('.resultados');
               resultadostag.scrollIntoView({behavior: 'smooth', alignTo:false});
          }
     }, [spinerresultados])

     return (
          <div className="resultados pt-4">
               <h3>Paso  N°4: Ver Resultados</h3>
               <p>Una vez haya asignado la calificación a cada factor interno clave de la empresa, <strong>por favor genere sus resultados para poder ver su ponderación total</strong></p>
               <p className="text-muted mb-0"><strong>NOTA 1:</strong> El valor ponderado más alto posible para una empresa es de 4.0 y el más bajo posible es de 1.0 <strong>(El promedio es 2.5)</strong></p>
               <p className="text-muted"><strong>NOTA 2:</strong> Los puntajes por debajo del promedio (2.5) definen a una empresa con muchas debilidades internas, mientras un puntaje superior a 2.5 caracterizan a una empresa con una posición interna sólida</p>
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
                    <table className="table table-bordered py-3 table-dark" id="resultados-table">
                         <thead>
                              <tr>
                                   <th scope="col">Empresa</th>
                                   <th scope="col">Puntaje Total</th>
                                   <th scope="col">Posición interna</th>
                              </tr>
                         </thead>
                         <tbody className="bg-primary">
                                   <tr>
                                        <td>{empresas[0].name}</td>
                                       
                                        <Fragment>
                                        <td>{redondearDecimalPuro(parseFloat(ponderadodebilidades) + parseFloat(ponderadofortalezas))}</td>
                                        <td>{obtenerSituacion(parseFloat(ponderadodebilidades) + parseFloat(ponderadofortalezas))}</td>
                                        </Fragment>
                                        
                                   </tr>
                         </tbody>
                    </table>
                    
                    </CSSTransition>
                    {factoresinternos
                         ?
                         <div className="alert alert-success my-3">Factores Internos Guardados correctamente</div>
                         :
                         ''
                    }
                    <div className="d-flex justify-content-around py-3">
                         {!factoresinternos
                              ?
                                   <button className="btn btn-lg btn-secondary" data-toggle="tooltip" data-placement="top" title="Guarde esto factores internos para su uso en la matriz FODA" onClick={guardarFactoresInternos}>Guardar Factores Internos</button>
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