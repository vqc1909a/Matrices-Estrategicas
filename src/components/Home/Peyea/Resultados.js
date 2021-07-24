import React, {useState, Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Resultados = ({resultados, changeResultados, obtenerCuadrante, fuerzasfinancieras, estabilidadesambientes, ventajascompetitivas, fuerzasindustrias, sumax, changeSumaX, sumay, changeSumaY}) => {

  const [spinerresultados, changeSpinerResultados] = useState(false);
  const [butonresultados, changeButonResultados] = useState(true);
  const [inResultados, setInResultados] = useState(false);

  const {estado, error} = resultados;

   const generarResultados = () => {
      changeSpinerResultados(true);
      let totalfuerzasfinancieras = 0;
      let totalestabilidadesambientes = 0;
      let totalventajascompetitivas = 0;
      let totalfuerzasindustrias = 0;

      fuerzasfinancieras.forEach((fuerza)=>{
            if(fuerza.value){
                totalfuerzasfinancieras += 1;
            }
      })
      
      estabilidadesambientes.forEach((estabilidad)=>{
            if(estabilidad.value){
                totalestabilidadesambientes += 1;
            }
      })
      ventajascompetitivas.forEach((ventaja)=>{
            if(ventaja.value){
                totalventajascompetitivas += 1;
            }
      })
      fuerzasindustrias.forEach((fuerza) => {
            if (fuerza.value) {
                totalfuerzasindustrias += 1;
            }
      })


      if(fuerzasfinancieras.length !== totalfuerzasfinancieras){
            changeResultados({
                ...resultados,
                error: 'Regrese Al Paso N°2: Por favor rellenar todos los campos de calificacion de Fuerza Financiera'
            })
            changeSpinerResultados(false);
            return null;
      }
      changeResultados({
            ...resultados,
            error: ''
      });

        if(estabilidadesambientes.length !== totalestabilidadesambientes){
            changeResultados({
                ...resultados,
                error: 'Regrese Al Paso N°2: Por favor rellenar todos los campos de calificacion de Estabilidad del Ambiente'
            })
            changeSpinerResultados(false);
            return null;
      }
      changeResultados({
            ...resultados,
            error: ''
      });

        if(ventajascompetitivas.length !== totalventajascompetitivas){
            changeResultados({
                ...resultados,
                error: 'Regrese Al Paso N°2: Por favor rellenar todos los campos de calificacion de Ventaja Competitiva'
            })
            changeSpinerResultados(false);
            return null;
      }
      changeResultados({
            ...resultados,
            error: ''
      });
      
        if(fuerzasindustrias.length !== totalfuerzasindustrias){
            changeResultados({
                ...resultados,
                error: 'Regrese Al Paso N°2: Por favor rellenar todos los campos de calificacion de Fuerza en la Industria'
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

  return (
    <div className="resultados pt-4">
      <h3>Paso  N°3: Generar Gráfico</h3>
      <p>Una vez haya asignado la calificación a cada factor, <strong>por favor genere su gráfico para poder ver el tipo de estrategia recomendada a usar para la empresa</strong></p>
      <p className="text-muted"><strong>NOTA:</strong> Son 4 posiciones estratégicas que una empresa puede optar <strong>(Conservadora, Agresiva, Defensiva y Competitiva) según el eje X y Y donde:</strong></p>
      <ul className="list-group list-group-flush">
            <li className="list-group-item">X = Ventaja Competitiva (VC) + Fuerza en la Industria (FI)</li>
            <li className="list-group-item">Y: Fuerza Financiera (FF) + Estabilidad del Ambiente (EA)</li>
          
      </ul>
      {
        error ? <div className="alert alert-danger my-3">{error}</div> : ''
      }
      {butonresultados 
            ?
            <div className="generacion-resultados d-flex justify-content-center my-3">
                      <Link to="#" onClick={generarResultados} className="btn btn-lg btn-outline-primary">Generar Gráfico</Link>
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
            <div className="d-flex justify-content-center py-4">
                <canvas id="myCanvas" width="600" height="600" ></canvas>
            </div>
            <CSSTransition
                in={inResultados}
                timeout={500}
                classNames="resultados"
                >
                <table className="table table-bordered py-3 table-dark" id="resultados-table">
                      <thead>
                          <tr>
                                <th scope="col">Eje X</th>
                                <th scope="col">Eje Y</th>
                                <th scope="col">Posición Estratégica</th>
                          </tr>
                      </thead>
                      <tbody className="bg-primary">
                                <tr>
                                    <td>{sumax}</td>
                                    <td>{sumay}</td>
                                    <td>{obtenerCuadrante()}</td>
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
                buttonText="Descargar Resultado"/>
            </div>
      </Fragment>
      :
      ''
      }
  </div>
);
}
 
export default Resultados;