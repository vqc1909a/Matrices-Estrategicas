import React, {useState, useEffect, Fragment} from 'react';
import {CSSTransition} from 'react-transition-group';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {Link} from 'react-router-dom';
import { redondearDecimalPuro } from '../../../helpers';

const Resultados = ({empresas, factores, obtenerSumaPuntajes, resultados, changeResultados}) => {
    
     const [spinerresultados, changeSpinerResultados] = useState(false);
     const [butonresultados, changeButonResultados] = useState(true);
     const [inResultados, setInResultados] = useState(false);
     const generarResultados = () => {
          changeSpinerResultados(true);
          let totalpuntajes = 0; 
          empresas.forEach((empresa)=>{
               totalpuntajes += empresa.puntajes.length
          })
          if(totalpuntajes !== factores.length * empresas.length){
               changeResultados({
                    ...resultados,
                    error: 'Regrese Al Paso N°3: Por favor rellenar todos los campos de calificación'
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

     useEffect(()=>{
          if(spinerresultados){
               const resultadostag = document.querySelector('.resultados');
               resultadostag.scrollIntoView({behavior: 'smooth', alignTo:false});
          }
     }, [spinerresultados]);


     const obtenerMayorFactor = (puntajes) => {
          let mayor = 0;
          let factor;
          for (let i = 0; i < puntajes.length; i++) {
               if(mayor < puntajes[i].ponderado){
                    mayor = puntajes[i].ponderado;
                    factor = puntajes[i].factor;
               }    
          }
          return factor;
     }
     
      const obtenerMenorFactor = (puntajes) => {
           let menor = obtenerSumaPuntajes(puntajes);
           let factor;
           for (let i = 0; i < puntajes.length; i++) {
                if (menor > puntajes[i].ponderado) {
                     menor = puntajes[i].ponderado;
                     factor = puntajes[i].factor;
                }
           }
           return factor;
      }

      const obtenerSumaPonderados = (empresas) => {
          let total = 0;
          for (let i = 0; i < empresas.length; i++) {
               total += obtenerSumaPuntajes(empresas[i].puntajes);
          }
          return redondearDecimalPuro(total);
      }

      const obtenerPosicionamientoBajo = (empresas, empresa) => {
           let total = obtenerSumaPonderados(empresas);
           let media = redondearDecimalPuro(total / empresas.length);
           if (obtenerSumaPuntajes(empresa.puntajes) < media) {
                return 'SI';
           }else{
                return 'NO';
           }
      }

      const obtenerPosicionamientoAlto = (empresas, empresa) => {
           let total = obtenerSumaPonderados(empresas);
           let media = redondearDecimalPuro(total / empresas.length);
           if (obtenerSumaPuntajes(empresa.puntajes) > media) {
                return 'SI';
           }else{
                return 'NO';
           }
      }  

       const obtenerPosicionamientoMedio = (empresas, empresa) => {
           let total = obtenerSumaPonderados(empresas);
           let media = redondearDecimalPuro(total / empresas.length);
           if (obtenerSumaPuntajes(empresa.puntajes) === media) {
                return 'SI';
           }else{
                return 'NO';
           }
      }  
     return (
               <div className="resultados pt-4">
                    <h3>Paso  N°4: Ver Resultados</h3>
                    <p>Una vez haya completado la calificación de cada factor con respecto a la respuesta de cada empresa, <strong>por favor generar sus resultados</strong></p>

                    {resultados.error && <div className="alert alert-danger my-3">{resultados.error}</div>}

                    {butonresultados && <div className="generacion-resultados d-flex justify-content-center my-3">
                                                  <Link to="#" onClick={generarResultados} className="btn btn-lg btn-outline-primary">Generar Resultados</Link>
                                        </div>
                    }
                    {spinerresultados && <div className="sk-cube-grid">
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

                    {resultados.estado
                    ?
                    <Fragment>
                    <CSSTransition
                         in={inResultados}
                         timeout={500}
                         classNames="resultados"
                         >
                         <table className="table table-bordered my-3 table-dark" id="resultados-table">
                              <thead>
                                        <tr>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th colSpan="2" className="text-center">Factores Críticos</th>
                                        <th colSpan="3" className="text-center">Posicionamiento en el mercado</th>
                                   </tr>
                                   <tr>
                                        <th scope="col">Empresa</th>
                                        <th scope="col">Puntaje Ponderado</th>
                                        <th scope="col">Fortaleza</th>
                                        <th scope="col">Debilidad</th>
                                        <th scope="col">Alto</th>
                                        <th scope="col">Normal</th>
                                        <th scope="col">Bajo</th>
                                   </tr>
                                   
                              </thead>
                              <tbody className="bg-primary">
                                   {empresas.map((empresa) => 
                                             <tr key={empresa._id}>
                                                  <td>{empresa.name}</td>
                                                  {empresa.puntajes.length === 0
                                                       ?
                                                       <td>0</td>
                                                       :
                                                       <td>{empresa.puntajes.length === 1 ? empresa.puntajes[0].ponderado : obtenerSumaPuntajes(empresa.puntajes)}</td>
                                                  }
                                                  {empresa.puntajes.length === 0
                                                       ?
                                                       <Fragment>          
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                       </Fragment>

                                                       :
                                                       <Fragment>
                                                            <td>{obtenerMayorFactor(empresa.puntajes)}</td>

                                                            <td>{obtenerMenorFactor(empresa.puntajes)}</td>
                                                                                                                                                                                                             <td>{obtenerPosicionamientoAlto(empresas, empresa)}</td>
                                                                                                                                                                                                             <td>{obtenerPosicionamientoMedio(empresas, empresa)}</td>
                                                                                                                                                                                                             <td>{obtenerPosicionamientoBajo(empresas, empresa)}</td>
                                                       </Fragment>
                                                  }

                                             </tr>
                                   )}
                              </tbody>
                         </table>
                         </CSSTransition>
                         <div className="text-center pb-5 pt-4">
                         <ReactHTMLTableToExcel
                         id="resultados-buton"
                         className="btn btn-primary btn-lg"
                         table="resultados-table"
                         filename="resultadosMatrizMpcxls"
                         sheet="resultadosMatrizMpcxls"
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