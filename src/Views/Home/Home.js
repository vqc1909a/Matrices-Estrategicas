import React, {Fragment} from 'react';
import useSeo from '../../hooks/useSeo';
const Home = () => {

     useSeo({title: "Análisis y Formulacion de Estrategias", description: "Herramientas que se utilizan para el análisis y formulación de estrategias de empresas como las siguientes: Matriz (MPC, MEFI, MEFE, FODA, PEYEA, MPEC, etc)"});

     return (
           <Fragment>
                     <div className="content-header">
                         <div className="container-fluid">
                              <div className="row justify-content-center">
                                   <div className="col-md-10">
                                        <h1 className="text-center text-primary my-4 mb-5 font-weight-bolder text-uppercase">Matrices que se utilizan para el análisis y formulación de estrategias de empresas</h1>
                                   </div>
                              </div>
                          </div>
                    </div>
                    <section className="content">
                         <div className="container-fluid">
                              <div className="row justify-content-center">
                                   <div className="col-md-10">
                                        <h2 className="h4 text-uppercase text-secondary text-center">Modelo analítico para la formulación de estrategias</h2>
                                        <div className="insumos py-4">
                                             <h4 className="text-center mb-3" style={{'textDecoration': 'underline' }}>ETAPA 1: ETAPA DE LOS INSUMOS</h4>
                                             <p className="lead">Esta fase es denominada etapa de los insumos, se resume la información básica necesaria para formular estrategias</p>
                                             <p className="lead">El Modelo de formulación está integrado por las matrices:</p>
                                             <ul className="list-group list-group-flush">
                                                  <li className="list-group-item list-group-item-primary"><strong>MATRIZ EFE: </strong>Evaluación Factores Externos</li>
                                                  <li className="list-group-item list-group-item-primary"><strong>MATRIZ EFI: </strong>Evaluación Factores Internos</li>
                                                  <li className="list-group-item list-group-item-primary"><strong>MPC: </strong>Matriz del Perfil Competitivo</li>
                                             </ul>
                                        </div>
                                        <div className="adecuacion py-4">
                                             <h4 className="text-center mb-3" style={{'textDecoration': 'underline' }}>ETAPA 2: ETAPA DE ADECUACIÓN</h4>
                                             <p className="lead">Se enfoca en generar estrategias alternativas factibles mediante la alineación de los factores clave, tanto internos como externos</p>
                                             <p className="lead">Entre las técnicas más utilizadas están las matrices</p>
                                             <ul className="list-group list-group-flush">
                                                  <li className="list-group-item list-group-item-primary"><strong>FODA: </strong>Matriz de fortalezas, oportunidades, debilidades y amenazas</li>
                                                  <li className="list-group-item list-group-item-primary"><strong>PEYEA: </strong>Matriz de la posición estratégica y evaluación de la acción</li>
                                                  {/* <li className="list-group-item list-group-item-primary"><strong>BCG: </strong>Matriz del Boston Consulting Group, o matriz de crecimiento-participación</li>
                                                  <li className="list-group-item list-group-item-primary"><strong>IE: </strong>Matriz interna y externa</li>
                                                  <li className="list-group-item list-group-item-primary"><strong>Matriz de la estrategia principal</strong></li> */}
                                             </ul>
                                        </div>
                                        <div className="decision py-4">
                                             <h4 className="text-center mb-3" style={{'textDecoration': 'underline' }}>ETAPA 3: ETAPA DE DECISIÓN</h4>
                                             <p className="lead">Comprende una sola técnica: </p>
                                             <ul className="list-group list-group-flush">
                                                  <li className="list-group-item list-group-item-primary">
                                                  <h5 className="mb-1"><strong>MPEC: </strong>Matriz de planeación estratégica cuantitativa</h5>
                                                       <p className="mb-1">Esta matriz utiliza la información inicial de la etapa 1 para evaluar objetivamente las estrategias alternativas factibles identificadas en la etapa 2 con lo cual pone al descubierto el atractivo relativo de cada una de las estrategias alternativas y ofrece una base neutral para elegir estrategias específicas</p>
                                                  </li>
                                             </ul>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
          </Fragment>
     );
}
 
export default Home;