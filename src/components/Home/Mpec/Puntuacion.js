import React, {Fragment, useState, useEffect} from 'react';
import {redondearDecimalPuro} from '../../../helpers';

const Puntuacion = ({factor, estrategia, estrategiasseleccionadas, changeEstrategiasSeleccionadas, resultados}) => { 
     const [puntuacion, changePuntuacion] = useState(0);

     useEffect(()=>{      
         const nuevosestrategiasseleccionadas = estrategiasseleccionadas.map((estr)=>{
            if(estr._id === estrategia._id){
                  const ponderadoencuentra = estr.ponderados.find((pond) => pond._id === factor._id);
                  if(ponderadoencuentra){
                    const nuevosponderados = estr.ponderados.map((pond)=>{
                      if(pond._id === factor._id){
                        pond.value = redondearDecimalPuro(puntuacion * factor.ponderado)
                      } 
                      return pond
                    })
                    estr.ponderados = nuevosponderados;
                  }else{
                    estr.ponderados.push({_id: factor._id, factor: factor.name, value: redondearDecimalPuro(puntuacion * factor.ponderado)})
                  }                 
            }
            return estr;
        })
        changeEstrategiasSeleccionadas([...nuevosestrategiasseleccionadas]);

        // eslint-disable-next-line
    }, [puntuacion])
     return (
            <Fragment>
              {resultados.estado
              ?
              <td>-</td>
              :
               <td>
                  <select className="form-control" onChange={(e) => changePuntuacion(e.target.value)} value={puntuacion}>
                      <option value="0">0</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                  </select>
               </td>
              }
               <td>
                    {redondearDecimalPuro(puntuacion * factor.ponderado)}
               </td>
          </Fragment> 
     );
}
 
export default Puntuacion;