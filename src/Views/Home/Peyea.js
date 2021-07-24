import React ,{Fragment, useState, useEffect} from 'react';
import ContentHeader from '../../components/Home/ContentHeader';
import {redondearDecimalPuro} from '../../helpers'
import '../../styles/spinner.css'
import '../../styles/Home/Peyea.css';

import FuerzaFinanciera from '../../components/Home/Peyea/FuerzaFinanciera';
import VentajaCompetitiva from '../../components/Home/Peyea/VentajaCompetitiva';
import EstabilidadAmbiente from '../../components/Home/Peyea/EstabilidadAmbiente';
import FuerzaIndustria from '../../components/Home/Peyea/FuerzaIndustria';
import Matriz from '../../components/Home/Peyea/Matriz';
import Resultados from '../../components/Home/Peyea/Resultados'
import useSeo from '../../hooks/useSeo';


const Peyea = () => {
const peyea = {
     name: "PEYEA",
     subname: "(Matriz de la posición estratégica y la evaluación de la acción)",
     description: "Maneja un esquema de  4 cuadrantes e indica que una estrategia Agresiva, Conservadora, Defensiva o Competitiva es la más adecuada para una empresa específica"
}
useSeo({title: `Matriz ${peyea.name} | Análisis y Formulacion de Estrategias`, description: peyea.description});

const [fuerzasfinancieras, changeFuerzasFinancieras] = useState([]);
const [ventajascompetitivas, changeVentajasCompetitivas] = useState([]);
const [estabilidadesambientes, changeEstabilidadesAmbientes] = useState([]);
const [fuerzasindustrias, changeFuerzasIndustrias] = useState([]);

const [sumafuerzasfinancieras, changeSumaFuerzasFinancieras] = useState(0);
const [sumaestabilidadesambientes, changeSumaEstabilidadesAmbientes] = useState(0);
const [sumaventajascompetitivas, changeSumaVentajasCompetitivas] = useState(0);
const [sumafuerzasindustrias, changeSumaFuerzasIndustrias] = useState(0);


useEffect(() => {
     if(fuerzasfinancieras.length !== 0){
          let total = 0;
          if(fuerzasfinancieras.length === 1){
               changeSumaFuerzasFinancieras(redondearDecimalPuro(fuerzasfinancieras[0].value));
          }else{
               fuerzasfinancieras.forEach((factor)=>{
                    total += factor.value
               })
               changeSumaFuerzasFinancieras(redondearDecimalPuro(total / fuerzasfinancieras.length));
          }
     }
}, [fuerzasfinancieras])
    
useEffect(() => {
     if (ventajascompetitivas.length !== 0) {
               let total = 0;
          if (ventajascompetitivas.length === 1) {
               changeSumaVentajasCompetitivas(redondearDecimalPuro(ventajascompetitivas[0].value));
          } else {
               ventajascompetitivas.forEach((ventaja) => {
                    total += ventaja.value
               })
               changeSumaVentajasCompetitivas(redondearDecimalPuro(total / ventajascompetitivas.length));
          }
     }
}, [ventajascompetitivas]);    
     
    
useEffect(() => {
     if(estabilidadesambientes.length !== 0){
               let total = 0;
          if(estabilidadesambientes.length === 1){
               changeSumaEstabilidadesAmbientes(redondearDecimalPuro(estabilidadesambientes[0].value));
          }else{
               estabilidadesambientes.forEach((estabilidad)=>{
                    total += estabilidad.value
               })
               changeSumaEstabilidadesAmbientes(redondearDecimalPuro(total / estabilidadesambientes.length));
          }
     }
}, [estabilidadesambientes]) 
    

useEffect(() => {
     if (fuerzasindustrias.length !== 0) {
               let total = 0;
          if (fuerzasindustrias.length === 1) {
               changeSumaFuerzasIndustrias(redondearDecimalPuro(fuerzasindustrias[0].value));
          } else {
               fuerzasindustrias.forEach((fuerza) => {
                    total += fuerza.value
               })
               changeSumaFuerzasIndustrias(redondearDecimalPuro(total / fuerzasindustrias.length));
          }
     }
}, [fuerzasindustrias])

     

     const [matriz, changeMatriz] = useState({
          estado: false,
          error: ''
     });
   

     const [resultados, changeResultados] = useState({
           estado: false,
           error: ''
     })

     

    
    
     const [sumax, changeSumaX] = useState(0);
     const [sumay, changeSumaY] = useState(0);
     useEffect(()=>{
          changeSumaX(redondearDecimalPuro(sumaventajascompetitivas + sumafuerzasindustrias));
     },[sumaventajascompetitivas, sumafuerzasindustrias]);

     useEffect(()=>{
          changeSumaY(redondearDecimalPuro(sumafuerzasfinancieras + sumaestabilidadesambientes));
     },[sumafuerzasfinancieras, sumaestabilidadesambientes]);
     
     useEffect(()=>{
          if(resultados.estado){
               const c = document.querySelector('#myCanvas');
               const ctx = c.getContext('2d');
               ctx.beginPath();
               ctx.lineWidth = 5;
               ctx.strokeStyle = "#ffc107";
               ctx.moveTo(300, 0);
               ctx.lineTo(300, 600);
               ctx.moveTo(0, 300);
               ctx.lineTo(600, 300);
               ctx.stroke();
               ctx.closePath();

               ctx.beginPath();
               ctx.fillStyle = '#ffc107'
               ctx.font = "30px Roboto";
               ctx.fillText('Conservador', 60, 50);
               ctx.fillText('Agresivo', 380, 50);
               ctx.fillText('Defensivo', 60, 550);
               ctx.fillText('Competitivo', 380, 550);
               ctx.closePath();

               for (let i = 1; i <= 9; i++) {
                    ctx.beginPath();
                    ctx.fillStyle = '#fd7e14'
                    ctx.font = "20px Arial";
                    ctx.fillText(0, 285, 320);
                    // X+
                    ctx.fillText(i, 300 + i * 30, 320);
                    //x-
                    ctx.fillText(-i, 280 - i * 30, 320);
                    //Y+
                    ctx.fillText(i, 285, 300 - i * 30);
                    //Y-
                    ctx.fillText(-i, 280, 315 + i * 30);
                    ctx.closePath();
               }
               ctx.beginPath();
               ctx.fillStyle = '#ffc107'
               ctx.fillText('🢂', 581, 307);
               ctx.fillText('🢁', 291, 13);
               ctx.fillText('🢀', -3, 307);
               ctx.fillText('🢃', 291, 601);
               ctx.closePath();

               ctx.beginPath();
               ctx.fillStyle = 'red';
               if(sumax === 0 && sumay === 0){
                    ctx.fillText('', 297, 307);
               }else if(sumax === 0 && sumay > 0){
                    ctx.fillText('●', 297, 300 - sumay * 30);
               }else if(sumax === 0 && sumay < 0){
                    ctx.fillText('●', 297, 315 + (-sumay) * 30);
               }else if(sumay === 0 && sumax > 0){
                    ctx.fillText('●', 300 + sumax * 30, 307);
               }else if(sumay === 0 && sumax < 0){
                    ctx.fillText('●', 290 - (-sumax) * 30, 307);
               }else if(sumax > 0 && sumay > 0){
                    ctx.fillText('●', 300 + sumax * 30, 300 - sumay * 30);
               }else if(sumax > 0 && sumay < 0){
                    ctx.fillText('●', 300 + sumax * 30, 315 + (-sumay) * 30);
               }else if(sumax < 0 && sumay > 0){
                    ctx.fillText('●', 290 - (-sumax) * 30, 300 - sumay * 30);
               }else if(sumax < 0 && sumay < 0){
                    ctx.fillText('●', 290 - (-sumax) * 30, 315 + (-sumay) * 30);
               }
               ctx.closePath();
          }
          // eslint-disable-next-line
     },[resultados.estado, sumax, sumay]);

     const obtenerCuadrante = () =>{
               if(sumax === 0 && sumay === 0){
                    return 'Ninguna estrategia'
               }else if(sumax === 0 && sumay > 0){
                    return 'Conservador y Agresivo'
               }else if(sumax === 0 && sumay < 0){
                    return 'Defensivo y Competitivo'
               }else if(sumay === 0 && sumax > 0){
                    return 'Agresivo y Competitivo'
               }else if(sumay === 0 && sumax < 0){
                    return 'Conservador y Defensivo'
               }else if(sumax > 0 && sumay > 0){
                    return 'Agresivo'
               }else if(sumax > 0 && sumay < 0){
                    return 'Competitivo'
               }else if(sumax < 0 && sumay > 0){
                    return 'Conservador'
               }else if(sumax < 0 && sumay < 0){
                    return 'Defensivo'
               }
     }
     
     
     return (
          <Fragment>
                <ContentHeader matriz={peyea} />
                <section className="content">
                    <div className="container-fluid">
                         <div className="definicion pt-4">
                              <h2>Ejes de la matriz</h2>
                              <p>Los ejes de la matriz PEYEA representan dos dimensiones internas <strong>(Fortaleza Financiera y Ventaja Competitiva)</strong>, y dos dimensiones externas <strong>(Estabilidad del Entorno y Fortaleza en la Industria)</strong><br /> Estos 4 factores son los principales determinantes de la posición estratégica de una empresa
                              </p>
                              <p className="font-weight-bolder">A continuación se puede ver el gráfico de la matriz PEYEA</p>
                              <div className="row justify-content-center">
                                   <div className="col-10 col-sm-8 text-center">
                                        <img className="img-fluid rounded border border-dark" src=" images/peyea.png" alt="Matriz Peyea | Gráfico"></img>
                                   </div>
                              </div>
                         </div>
                         <div className="instrucciones pt-4">
                              <h2 className="display-4">Instrucciones</h2>
                              <div className="factores pt-4">
                                   <h3>PASO N°1 Listar factores internos y externos</h3>
                                   <p>Lista una serie de factores que representen a la Fuerza o Fortaleza Financiera (FF), Ventaja Competitiva (VC), Estabilidad del Ambiente ó Entorno (EA) y la Fuerza ó Fortaleza en la Industria (FI) de su empresa</p>
                                   <div className="internos">
                                        <h4 className="font-weight-bolder">POSICIÓN ESTRATÉGICA INTERNA</h4>
                                        <FuerzaFinanciera fuerzasfinancieras={fuerzasfinancieras} changeFuerzasFinancieras={changeFuerzasFinancieras} matriz={matriz}></FuerzaFinanciera>
                                        
                                        <VentajaCompetitiva ventajascompetitivas={ventajascompetitivas} changeVentajasCompetitivas={changeVentajasCompetitivas} matriz={matriz}></VentajaCompetitiva>
                                   </div>
                                   <div className="externos">
                                        <h4 className="font-weight-bolder">POSICIÓN ESTRATÉGICA EXTERNA</h4>
                                        <EstabilidadAmbiente estabilidadesambientes={estabilidadesambientes} changeEstabilidadesAmbientes={changeEstabilidadesAmbientes} matriz={matriz}></EstabilidadAmbiente>
                                        <FuerzaIndustria fuerzasindustrias={fuerzasindustrias} changeFuerzasIndustrias={changeFuerzasIndustrias} matriz={matriz}></FuerzaIndustria>                                    
                                   </div>
                              </div>
                              <Matriz resultados={resultados} matriz={matriz} changeMatriz={changeMatriz} fuerzasfinancieras={fuerzasfinancieras} changeFuerzasFinancieras={changeFuerzasFinancieras} sumafuerzasfinancieras={sumafuerzasfinancieras} estabilidadesambientes={estabilidadesambientes} changeEstabilidadesAmbientes={changeEstabilidadesAmbientes} sumaestabilidadesambientes={sumaestabilidadesambientes} ventajascompetitivas={ventajascompetitivas} changeVentajasCompetitivas={changeVentajasCompetitivas} sumaventajascompetitivas={sumaventajascompetitivas} fuerzasindustrias={fuerzasindustrias} changeFuerzasIndustrias={changeFuerzasIndustrias} sumafuerzasindustrias={sumafuerzasindustrias}></Matriz>

                              {matriz.estado
                                   ?
                                   <Resultados resultados={resultados} changeResultados={changeResultados} obtenerCuadrante={obtenerCuadrante} fuerzasfinancieras={fuerzasfinancieras} estabilidadesambientes={estabilidadesambientes} ventajascompetitivas={ventajascompetitivas} fuerzasindustrias={fuerzasindustrias} sumax={sumax} changeSumaX={changeSumaX} sumay={sumay} changeSumaY={changeSumaY}></Resultados>
                                   :
                                   ''
                              }
                         </div>    
                    </div>
                </section>
          </Fragment>
     );
}
 
export default Peyea;