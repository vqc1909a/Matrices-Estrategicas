import React , {Fragment, useState, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import {Link} from 'react-router-dom';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {redondearDecimalPuro} from '../../../helpers'

const Resultados = ({estrategiasseleccionadas, sumaEstrategiasSeleccionadas, resultados, changeResultados}) => {
    
     const {estado, error} = resultados;

     const [spinerresultados, changeSpinerResultados] = useState(false);
     const [butonresultados, changeButonResultados] = useState(true);
     const [inResultados, setInResultados] = useState(false);
     
     const [posicion, changePosicion] = useState(0);

     const generarResultados = () => {
          changeSpinerResultados(true);
          let totalestrategias = estrategiasseleccionadas.length;
          let unos = 0;
          let mayor = 0;
          for (let index = 0; index < totalestrategias; index++) {
            const ponderadodiferentecero = estrategiasseleccionadas[index].ponderados.find((ponderado)=>{
              return ponderado.value !== 0;
            })
            if(ponderadodiferentecero){
              unos+=1;
            }
            if(mayor < sumaEstrategiasSeleccionadas[index]){
              mayor= sumaEstrategiasSeleccionadas[index]
              changePosicion(index);
            }
          }
          if(unos < totalestrategias){
            changeResultados({
                ...resultados,
                error: 'Seleccione al menos un valor diferente a 0 para cada estrategia'
            });
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
     }, [spinerresultados])

     return (
          <div className="resultados pt-4">
               <h3>Paso  N°4: Ver Resultados</h3>
               <p>Una vez haya asignado la calificación a cada factor y estrategia por favor genere sus resultados para poder ver la estrategia que tiene el mayor grado de atractivo.</p>
              
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
                                   <th scope="col">Estrategia</th>
                                   <th scope="col">Puntaje Total</th>
                                   <th scope="col">Descripcion</th>
                              </tr>
                         </thead>
                         <tbody className="bg-primary">
                                   <tr>
                                        <td>{estrategiasseleccionadas[posicion].estrategia}</td>                                       
                                        <td>{redondearDecimalPuro(sumaEstrategiasSeleccionadas[posicion])}</td>
                                        <td>
                                          Esta estrategia es la más atractiva y tiene mayor porbabilidad de éxito
                                        </td>
                                   </tr>
                         </tbody>
                    </table>
                    
                    </CSSTransition>
                    <div className="d-flex justify-content-around py-3">
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