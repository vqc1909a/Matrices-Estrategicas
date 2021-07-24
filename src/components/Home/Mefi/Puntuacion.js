import React, {Fragment, useState, useEffect} from 'react';
import {redondearDecimalPuro} from '../../../helpers';

const Puntuacion = ({factorinterno, factoresinternos, changeFactoresInternos, valoracion, fortalezas = false, resultados}) => { 
     const [puntuacion, changePuntuacion] = useState(0);
    
     useEffect(()=>{
          if(puntuacion !== 0){
               const nuevosfactoresinternos = factoresinternos.map((factorcito)=>{
                    if(factorcito.name === factorinterno.name){
                         factorcito.ponderado = redondearDecimalPuro(puntuacion * valoracion);
                    }
                    return factorcito;
               })
               changeFactoresInternos([...nuevosfactoresinternos]);
          }
          // eslint-disable-next-line
     },[puntuacion])
     return (
            <Fragment>
               <td>
                    {resultados.estado
                    ?
                    '-'
                    :
                    <select className="form-control" onChange={(e) => changePuntuacion(e.target.value)} value={puntuacion}>

                         <option value="0" disabled>0</option>
                         { fortalezas
                              ?
                                   <Fragment>
                                        <option value="4">4</option>
                                        <option value="3">3</option>
                                   </Fragment>
                              :
                                   <Fragment>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                   </Fragment>
                              }
                    </select>
                    }
               </td>
               <td>
                    {redondearDecimalPuro(puntuacion * valoracion)}
               </td>
          </Fragment> 
     );
}
 
export default Puntuacion;