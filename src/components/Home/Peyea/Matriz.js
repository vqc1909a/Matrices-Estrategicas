import React, {useState, useEffect} from 'react';
import Factores from '../Peyea/Factores';
import {CSSTransition} from 'react-transition-group';
import {Link} from 'react-router-dom';
import {redondearDecimalPuro} from '../../../helpers';

const Matriz = ({resultados, matriz, changeMatriz, fuerzasfinancieras, changeFuerzasFinancieras,sumafuerzasfinancieras, estabilidadesambientes, changeEstabilidadesAmbientes, sumaestabilidadesambientes, ventajascompetitivas, changeVentajasCompetitivas, sumaventajascompetitivas, fuerzasindustrias, changeFuerzasIndustrias, sumafuerzasindustrias}) => {

const [spinermatriz, changeSpinerMatriz] = useState(false);
const [butonmatriz, changeButonMatriz] = useState(true);
const [inMatriz, setInMatriz] = useState(false);

const {error, estado} = matriz;
const generarMatriz = () => {
      changeSpinerMatriz(true);
      if(fuerzasfinancieras.length === 0){
            changeMatriz({
                ...matriz,
                error: 'Regrese Al Paso N°1: Agregue al menos una Fuerza Financiera'
            })
            changeSpinerMatriz(false);
            return null;
      }
      changeMatriz({
            ...matriz,
            error: ''
      })
      if (ventajascompetitivas.length === 0) {
          changeMatriz({
              ...matriz,
              error: 'Regrese Al Paso N°1: Agregue al menos una Ventaja Competitiva'
          })
          changeSpinerMatriz(false);
          return null;
      }
      changeMatriz({
                ...matriz,
                error: ''
      })
      if (estabilidadesambientes.length === 0) {
            changeMatriz({
                ...matriz,
                error: 'Regrese Al Paso N°1: Agregue al menos una Estabilidad del Ambiente'
            })
            changeSpinerMatriz(false);
            return null;
      }
      changeMatriz({
                ...matriz,
                error: ''
      })
      if (fuerzasindustrias.length === 0) {
          changeMatriz({
                ...matriz,
                error: 'Regrese Al Paso N°1: Agregue al menos una Fuerza en la Industria'
          })
          changeSpinerMatriz(false);
          return null;
      }
      changeMatriz({
            ...matriz,
            error: ''
      })
  
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
      <h3>Paso  N°2: Generar Matriz y Asignar Valor</h3>
      <p>Primero genere la matriz, luego deberá de asignar un valor según el contexto de su empresa: </p>
      
      <ul className="list-group list-group-flush">
          <li className="list-group-item">De 1<strong>(peor)</strong> a 6<strong>(mejor)</strong> a cada uno de los factores que integran las dimensiones <strong>Posición Financiera / Fuerza Financiera (PF)</strong> y <strong>Posición en la Industria / Fuerza en la Industria (PI) </strong></li>
          <li className="list-group-item">De -1<strong>(mejor)</strong> a -6<strong>(peor)</strong> a cada uno de los factores que integran las dimensiones <strong>Estabilidad del Ambiente (EA) / Estabilidad del Entorno</strong> y <strong>Ventaja Competitiva (VC)</strong></li>
      </ul>
      <p><strong>NOTA :</strong> El puntaje asignado es en función de la relevancia del factor en el éxito en la industria en donde participa la empresa.</p>
      {
          error ? <div className="alert alert-danger my-3">{error}</div> : ''
      }
      { butonmatriz 
          ?
          <div className="generacion-matriz d-flex justify-content-center my-3">
                    <Link to="#" onClick={generarMatriz} className="btn btn-lg btn-outline-primary">Generar Matriz</Link>
          </div>
          :
          ''  
      }
      {
          spinermatriz
          ?
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
                <CSSTransition
                    in={inMatriz}
                    timeout={500}
                    classNames="matriz"
                    >    
                <table className="table my-3" id="matriz-table">
                    <thead className="bg-primary">
                          <tr>
                              <th scope="col">POSICIÓN ESTRATÉGICA INTERNA</th>
                              <th scope="col">POSICIÓN ESTRATÉGICA EXTERNA</th>
                          </tr>
                    </thead>
                    <tbody>
                          <tr className="bg-secondary">
                              <th>FUERZA FINANCIERA (FF)</th>
                              <th>ESTABILIDAD DEL AMBIENTE (EA)</th>
                          </tr>
                          <tr>
                              
                                    {fuerzasfinancieras.length !== 0
                                        ?    
                                        <td className="p-0">
                                        <table className="table table-bordered  m-0">
                                              <tbody>
                                                  {fuerzasfinancieras.map(fuerzafinanciera => <Factores resultados={resultados} factor={fuerzafinanciera} factores={fuerzasfinancieras} changeFactores={changeFuerzasFinancieras} />)} 
                                                    <tr>
                                                        <td>PROMEDIO</td>
                                                        <td>{redondearDecimalPuro(sumafuerzasfinancieras)}
                                                        </td>
                                                  </tr>     
                                              </tbody>
                                        </table>
                                        </td>
                                        :
                                        <td>-</td>
                                    }
                                    {estabilidadesambientes.length !== 0
                                          ?    
                                        <td className="p-0">
                                        <table className="table table-bordered  m-0">
                                              <tbody>
                                                  {estabilidadesambientes.map(estabilidadambiente => <Factores resultados={resultados} factor={estabilidadambiente} factores={estabilidadesambientes} changeFactores={changeEstabilidadesAmbientes} negativo='-' />)}  
                                                    <tr>
                                                        <td>PROMEDIO</td>
                                                        <td>{redondearDecimalPuro(sumaestabilidadesambientes)}
                                                        </td>
                                                    </tr>  
                                              </tbody>
                                        </table>
                                        </td>
                                        :
                                        <td>-</td>
                                        
                                    }
                          </tr>
                        
                          <tr className="bg-secondary">
                              <th>VENTAJA COMPETITIVA (VC)</th>
                              <th>FUERZA EN LA INDUSTRIA (FI)</th>
                          </tr>
                          <tr>
                              
                                    {ventajascompetitivas.length !== 0
                                        ?    
                                        <td className="p-0">
                                        <table className="table table-bordered  m-0">
                                              <tbody>
                                                  {ventajascompetitivas.map(ventajacompetitiva => <Factores resultados={resultados} factor={ventajacompetitiva} factores={ventajascompetitivas} changeFactores={changeVentajasCompetitivas} negativo='-' />)}    
                                                  <tr>
                                                        <td>PROMEDIO</td>
                                                        <td>{redondearDecimalPuro(sumaventajascompetitivas)}
                                                        </td>
                                                  </tr> 
                                              </tbody>
                                        </table>
                                        </td>
                                        :
                                        <td>-</td>
                                    }
                                    {fuerzasindustrias.length !== 0
                                          ?    
                                        <td className="p-0">
                                        <table className="table table-bordered  m-0">
                                              <tbody>
                                                  {fuerzasindustrias.map(fuerzaindustria => <Factores resultados={resultados} factor={fuerzaindustria} factores={fuerzasindustrias} changeFactores={changeFuerzasIndustrias} />)}  
                                                  <tr>
                                                        <td>PROMEDIO</td>
                                                        <td>{redondearDecimalPuro(sumafuerzasindustrias)}
                                                        </td>
                                                  </tr>   
                                              </tbody>
                                        </table>
                                        </td>
                                        :
                                        <td>-</td>
                                        
                                    }
                          </tr>
                    </tbody>
                </table>
                </CSSTransition>                                            
          :
          ''
      }
</div>
  );
}
 
export default Matriz;