

import React, {Fragment, useState, useEffect} from 'react';
import ContentHeader from '../../components/Home/ContentHeader';
import {Link} from 'react-router-dom';
import {redondearDecimalPuro} from '../../helpers';

import Estrategias from '../../components/Home/Mpec/Estrategias';
import Matriz from '../../components/Home/Mpec/Matriz';
import Resultados from '../../components/Home/Mpec/Resultados'
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import '../../styles/Home/Mefe.css';
import '../../styles/spinner.css'
import useSeo from '../../hooks/useSeo';

const Mpec = () => {
     const [factoresinternos, changeFactoresInternos] = useState({});
     const [factoresexternos, changeFactoresExternos] = useState({});
     const [estrategias, changeEstrategias] = useState({
       estrategiasDA: [],
       estrategiasDO: [],
       estrategiasFA: [],
       estrategiasFO: [],
     });
     const {estrategiasDA, estrategiasDO, estrategiasFA, estrategiasFO} = estrategias;
     const [estrategiasseleccionadas, changeEstrategiasSeleccionadas] = useState([]);
     const [sumaEstrategiasSeleccionadas, changeSumaEstrategiasSeleccionadas] = useState([]);

     const mpec = {
          name: "MPEC",
          subname: "(Matriz de la Planeación Estratégica Cuantitativa)",
          description: "Una vez que se haya generado las estrategias, la matriz MPEC permite reducir el grado de subjetividad a la hora de determinar qué estrategia es la más atractiva y tiene mayor probabilidad de éxito"
     }

     useSeo({title: `Matriz ${mpec.name} | Análisis y Formulacion de Estrategias`, description: mpec.description});

     
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
         if(sessionStorage.getItem('estrategias')){
           changeEstrategias(JSON.parse(sessionStorage.getItem('estrategias')));
         }else{
           changeEstrategias({
             estrategiasDA: [],
             estrategiasDO: [],
             estrategiasFA: [],
             estrategiasFO: [],
           });
       }
       // eslint-disable-next-line
     },[]);

     const [matriz, changeMatriz] = useState({
          estado: false,
          error: ''
     });


     useEffect(()=>{
       if(estrategiasseleccionadas.length !== 0){
         let arrayPonderados = [];
         estrategiasseleccionadas.forEach((estrategia) => {
           let suma = 0;
           estrategia.ponderados.forEach((ponderado)=>{
             suma+=ponderado.value;
           })
           arrayPonderados.push(redondearDecimalPuro(suma));
         })
         changeSumaEstrategiasSeleccionadas([...arrayPonderados]);
       }
     }, [estrategiasseleccionadas])

    
      
     
      const [resultados, changeResultados] = useState({
           estado: false,
           error: ''
      })
    
     

     return (
          <Fragment>
               <ContentHeader matriz={mpec} />
                    <section className="content">
                         <div className="container-fluid">
                               <h2 className="display-4">Instrucciones</h2>
                          
                              <div className="matriz-foda pt-4">
                                   <h3>Paso  N°1: Completar la Matriz FODA</h3>
                                   <p>Deberá de completar todos los pasos que corresponden a la MATRIZ FODA y guardar las estrategias generadas<br /><strong>Para eso dirigase a esa matriz desde los botones laterales o haz click en el siguiente botón que se muestra a continuación: </strong></p>
                                   <div className="d-flex justify-content-center">
                                        <Link to="/foda" className="btn btn-lg btn-outline-secondary" >
                                             Ir a la Matriz FODA
                                        </Link>
                                   </div>
                              </div>
                              
                              <Estrategias matriz={matriz} estrategiasDA={estrategiasDA} estrategiasDO={estrategiasDO} estrategiasFA={estrategiasFA} estrategiasFO={estrategiasFO} estrategiasseleccionadas={estrategiasseleccionadas} changeEstrategiasSeleccionadas={changeEstrategiasSeleccionadas}></Estrategias>

                              <Matriz matriz={matriz} changeMatriz={changeMatriz} estrategias={estrategias} estrategiasseleccionadas={estrategiasseleccionadas} changeEstrategiasSeleccionadas={changeEstrategiasSeleccionadas} factoresinternos={factoresinternos} factoresexternos={factoresexternos} resultados={resultados} sumaEstrategiasSeleccionadas={sumaEstrategiasSeleccionadas}></Matriz>
                              {matriz.estado
                                ?
                                <Resultados estrategiasseleccionadas={estrategiasseleccionadas} sumaEstrategiasSeleccionadas={sumaEstrategiasSeleccionadas} resultados={resultados} changeResultados={changeResultados}></Resultados>
                                :
                                ''
                              }
                         </div>
                    </section>
          </Fragment>
     );
}
 
export default Mpec;