import React, {Fragment, useEffect, useState} from 'react';
import ContentHeader from '../../components/Home/ContentHeader';
import Factores from '../../components/Home/Mpc/Factores';
import Empresas from '../../components/Home/Mpc/Empresas';
import Matriz from '../../components/Home/Mpc/Matriz';
import Resultados from '../../components/Home/Mpc/Resultados';
import '../../styles/Home/Mpc.css';
import '../../styles/spinner.css'
import { redondearDecimalPuro } from '../../helpers';
import useSeo from '../../hooks/useSeo';

const Mpc = () => {
     const mpc = {
          name: "MPC",
          subname: "(Matriz de Perfil Competitivo)",
          description: "Evalúa la posición competitiva de la empresa frente a su competencia directa, teniendo en cuenta factores claves comunes."
     }

     useSeo({title: `Matriz ${mpc.name} | Análisis y Formulacion de Estrategias`, description: mpc.description});

     const [factores, changeFactores] = useState([]);
     const [total, changeTotal] = useState(0);

     useEffect(()=>{
          let  total = 0;
          factores.forEach((factor)=>{
               total += factor.value;
          })
          changeTotal(redondearDecimalPuro(total));
     }, [factores])

     const [empresas, changeEmpresas] = useState([]);
     const [matriz, changeMatriz] = useState({
          estado: false,
          error: ''
     });

     const obtenerSumaPuntajes = (puntajes) => {
           let suma = 0;
           puntajes.forEach((puntaje)=>{
               suma+=puntaje.ponderado
           })
           return redondearDecimalPuro(suma);
     }

      const [resultados, changeResultados] = useState({
          estado: false,
          error: ''
     })

     return (
          <Fragment>
               <ContentHeader matriz={mpc} />
                <section className="content">
                    <div className="container-fluid">
                         <h2 className="display-4">Instrucciones</h2>
                         <Factores factores={factores} changeFactores={changeFactores} total={total} matriz={matriz}></Factores>
                         <Empresas empresas={empresas} changeEmpresas={changeEmpresas} matriz={matriz}></Empresas>
                         <Matriz matriz={matriz} changeMatriz={changeMatriz} empresas={empresas} changeEmpresas={changeEmpresas} factores={factores} total={total} obtenerSumaPuntajes={obtenerSumaPuntajes} resultados={resultados}></Matriz>
                         {matriz.estado && <Resultados empresas={empresas} factores={factores} obtenerSumaPuntajes={obtenerSumaPuntajes} resultados={resultados} changeResultados={changeResultados}></Resultados>}
                    </div>
               </section>
          </Fragment>
     );
}
export default Mpc;