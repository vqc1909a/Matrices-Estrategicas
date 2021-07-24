import React, {Fragment, useState, useEffect} from 'react';
import ContentHeader from '../../components/Home/ContentHeader';
import {redondearDecimalPuro} from '../../helpers'

import Empresa from '../../components/Home/Mefi/Empresa';
import Fortalezas from '../../components/Home/Mefi/Fortalezas';
import Debilidades from '../../components/Home/Mefi/Debilidades';
import Matriz from '../../components/Home/Mefi/Matriz';
import Resultados from '../../components/Home/Mefi/Resultados';
import '../../styles/Home/Mefi.css';
import '../../styles/spinner.css'
import useSeo from '../../hooks/useSeo';

const Mefi = () => {
     const mefi = {
          name: "MEFI",
          subname: "(Matriz de Evaluación de Factores Internos)",
          description: "Sintetiza y evalúa las fortalezas y debilidades más relevantes de áreas funcionales de una empresa"
     }
     useSeo({title: `Matriz ${mefi.name} | Análisis y Formulacion de Estrategias`, description: mefi.description});

     const [empresas, changeEmpresas] = useState([]);
     const [fortalezas, changeFortalezas] = useState([]);
     const [total, changeTotal] = useState(0);
     const [debilidades, changeDebilidades] = useState([]);
     
     useEffect(() => {
          //Para evaluar la suma a 1
          let total;
          let totalfortalezas = 0;
          fortalezas.forEach((fortaleza)=>{
               totalfortalezas+= fortaleza.value;
          })
          let totaldebilidades = 0;
          debilidades.forEach((debilidad) => {
               totaldebilidades+= debilidad.value;
          })
          total = totalfortalezas + totaldebilidades;
          changeTotal(redondearDecimalPuro(total));
     }, [debilidades, fortalezas])

     const [matriz, changeMatriz] = useState({
          estado: false,
          error: ''
     });
    
     
     const [ponderadofortalezas, changePonderadoFortalezas] =useState(0);
     const [ponderadodebilidades, changePonderadoDebilidades] =useState(0); 

     useEffect(()=>{
          if(fortalezas.length !== 0){
               let ponderadofortalezas = 0;
               fortalezas.forEach((fortaleza) => {
                    ponderadofortalezas += fortaleza.ponderado;
               })
               changePonderadoFortalezas(ponderadofortalezas);
          }
          // eslint-disable-next-line
     },[fortalezas])

      useEffect(()=>{
           if(debilidades.length !== 0){
                let ponderadodebilidades = 0;
                debilidades.forEach((debilidad) => {
                     ponderadodebilidades += debilidad.ponderado;
                })
                changePonderadoDebilidades(ponderadodebilidades);
           }
          // eslint-disable-next-line
     },[debilidades])

      const [resultados, changeResultados] = useState({
           estado: false,
           error: ''
     })

     return (
          <Fragment>
               <ContentHeader matriz={mefi} />
                    <section className="content">
                         <div className="container-fluid">
                              <h2 className="display-4">Instrucciones</h2>
                              <Empresa empresas={empresas} changeEmpresas={changeEmpresas} matriz={matriz}></Empresa>

                              <div className="fortalezas-debilidades pt-4">
                                   <h3>Paso  N°2: Lista las fortalezas y debilidades</h3>
                                   <p>Listar de manera específica las fortalezas y debilidades<strong>(factores internos)</strong> que tiene la empresa, así como también deberá de asignar un valor para cada factor entre 0 <strong>(sin importancia)</strong> y 1 <strong>(muy importante)</strong></p>
                                   <p className="text-muted mb-0"><strong>NOTA 1:</strong> Se deben tener entre 10 (mínimo) y 20 (máximo) factores internos en total entre <strong>(fortalezas y debilidades)</strong></p>
                                   <p className="text-muted mb-0"><strong>NOTA 2:</strong> El nivel de importancia es con respecto al éxito de la empresa con la industria</p>
                                   <p className="text-muted"><strong>NOTA 3:</strong> La suma de cada valor de los factores deberá de ser en total de 1</p>

                                   <Fortalezas fortalezas={fortalezas} changeFortalezas={changeFortalezas} total={total} matriz={matriz}></Fortalezas>
                                   <Debilidades debilidades={debilidades} changeDebilidades={changeDebilidades} total={total} matriz={matriz}></Debilidades>
                              </div>
                              <Matriz matriz={matriz} changeMatriz={changeMatriz} fortalezas={fortalezas} changeFortalezas={changeFortalezas} debilidades={debilidades} changeDebilidades={changeDebilidades} empresas={empresas} total={total} ponderadofortalezas={ponderadofortalezas} ponderadodebilidades={ponderadodebilidades} resultados={resultados}></Matriz>
                              {
                              matriz.estado
                                   ?
                                   <Resultados fortalezas={fortalezas} debilidades={debilidades} empresas={empresas} ponderadofortalezas={ponderadofortalezas} ponderadodebilidades={ponderadodebilidades} resultados={resultados} changeResultados={changeResultados}></Resultados>
                                   :
                                   ''
                              }
                         </div>
                    </section>
          </Fragment>
     );
}
 
export default Mefi;