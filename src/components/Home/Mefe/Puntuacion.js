import React, {Fragment, useState, useEffect} from 'react';
import {redondearDecimalPuro} from '../../../helpers';

const Puntuacion = ({factorexterno, factoresexternos, changeFactoresExternos, valoracion, resultados}) => { 
     const [puntuacion, changePuntuacion] = useState(0);
     
     useEffect(()=>{
          if(puntuacion !== 0){
               const nuevosfactoresexternos = factoresexternos.map((factorcito)=>{
                    if(factorcito.name === factorexterno.name){
                         factorcito.ponderado = redondearDecimalPuro(puntuacion * valoracion);
                    }
                    return factorcito;
               })
               changeFactoresExternos([...nuevosfactoresexternos]);
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
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
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