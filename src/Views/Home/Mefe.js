import React, {Fragment, useState, useEffect} from 'react';
import ContentHeader from '../../components/Home/ContentHeader';
import '../../styles/Home/Mefe.css';
import '../../styles/spinner.css'

import Empresa from '../../components/Home/Mefe/Empresa';
import Oportunidades from '../../components/Home/Mefe/Oportunidades';
import Amenazas from '../../components/Home/Mefe/Amenazas';
import Matriz from '../../components/Home/Mefe/Matriz';
import Resultados from '../../components/Home/Mefe/Resultados';
import useSeo from '../../hooks/useSeo';

const Mefe = () => {
     const mefe = {
          name: "MEFE ",
          subname: "(Matriz de Evaluación de Factores Externos)",
          description: "Permite realizar un estudio de campo, permitiendo identificar y evaluar los diferentes factores externos que pueden influir con el crecimiento de la empresa"
     }
     useSeo({title: `Matriz ${mefe.name} | Análisis y Formulacion de Estrategias`, description: mefe.description});

     const [empresas, changeEmpresas] = useState([]);
     const [oportunidades, changeOportunidades] = useState([]);
     const [total, changeTotal] = useState(0);
     const [amenazas, changeAmenazas] = useState([]);
     
     useEffect(() => {
          let total;
          let totaloportunidades = 0;
          oportunidades.forEach((oportunidad)=>{
               totaloportunidades+= oportunidad.value;
          })
          let totalamenazas = 0;
          amenazas.forEach((amenaza) => {
               totalamenazas+= amenaza.value;
          })
          total = totaloportunidades + totalamenazas;
          changeTotal(total);
     }, [oportunidades, amenazas])


     const [matriz, changeMatriz] = useState({
          estado: false,
          error: ''
     });
     
    

     const [ponderadooportunidades, changePonderadoOportunidades] =useState(0);
     const [ponderadoamenazas, changePonderadoAmenazas] =useState(0); 

     useEffect(()=>{
          if(oportunidades.length !== 0){
               let ponderadooportunidades = 0;
               oportunidades.forEach((oportunidad) => {
                    ponderadooportunidades += oportunidad.ponderado;
               })
               changePonderadoOportunidades(ponderadooportunidades);
          }
          // eslint-disable-next-line
     },[oportunidades])

      useEffect(()=>{
           if(amenazas.length !== 0){
                let ponderadoamenazas = 0;
                amenazas.forEach((amenaza) => {
                     ponderadoamenazas += amenaza.ponderado;
                })
                changePonderadoAmenazas(ponderadoamenazas);
           }
          // eslint-disable-next-line
     },[amenazas])


     const [resultados, changeResultados] = useState({
           estado: false,
           error: ''
     })
     
     return (
          <Fragment>
               <ContentHeader matriz={mefe} />
                    <section className="content">
                         <div className="container-fluid">
                              <h2 className="display-4">Instrucciones</h2>
                              <Empresa empresas={empresas} changeEmpresas={changeEmpresas} matriz={matriz}></Empresa>
                              <div className="oportunidades-amenazas pt-4">
                                   <h3>Paso  N°2: Lista las oportunidades y amenazas</h3>
                                   <p>Listar de manera específica las oportunidades y amenazas también conocido como <strong>(factores externos)</strong>, que tiene la empresa con respecto a su sector o mercado, así como también deberá de asignar un valor para cada factor entre 0 <strong>(sin importancia)</strong> y 1 <strong>(muy importante)</strong></p>
                                   <p className="text-muted mb-0"><strong>NOTA 1:</strong> Se deben tener entre 10 (mínimo) y 20 (máximo) factores externos en total entre <strong>(oportunidades y amenazas)</strong></p>
                                   <p className="text-muted"><strong>NOTA 2:</strong> El puntaje asignado es en función de la relevancia del factor en el éxito en la industria en donde participa la empresa.</p>
                                   <p className="text-muted"><strong>NOTA 3:</strong> La suma de cada valor de los factores deberá de ser en total de 1</p>
                                   <Oportunidades oportunidades={oportunidades} changeOportunidades={changeOportunidades} total={total} matriz={matriz}></Oportunidades>
                                   <Amenazas amenazas={amenazas} changeAmenazas={changeAmenazas} total={total} matriz={matriz}></Amenazas>
                              </div>

                              <Matriz matriz={matriz} changeMatriz={changeMatriz} oportunidades={oportunidades} changeOportunidades={changeOportunidades} amenazas={amenazas} changeAmenazas={changeAmenazas} empresas={empresas} total={total} ponderadooportunidades={ponderadooportunidades} ponderadoamenazas={ponderadoamenazas} resultados={resultados}></Matriz>

                              {matriz.estado
                                   ?
                                   <Resultados oportunidades={oportunidades} amenazas={amenazas} empresas={empresas} ponderadooportunidades={ponderadooportunidades} ponderadoamenazas={ponderadoamenazas} resultados={resultados} changeResultados={changeResultados}></Resultados>
                                   :
                                   ''
                              }
                         </div>
                    </section>
          </Fragment>
     );
}
 
export default Mefe;