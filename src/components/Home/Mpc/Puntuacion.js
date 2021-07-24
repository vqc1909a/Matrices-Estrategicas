import React, {Fragment, useState, useEffect} from 'react';
import short from 'short-uuid'
import { redondearDecimalPuro } from '../../../helpers';

const Puntuacion = ({valoracion, empresa, empresas, changeEmpresas, factor, resultados}) => { 
     const [puntuacion, changePuntuacion] = useState({
          id: short.generate(),
          value: 0,
          ponderado: 0,
          factor: factor
     });  

     const handlePuntuacion = (e) =>{
          changePuntuacion({...puntuacion, value: parseFloat(e.target.value), ponderado: redondearDecimalPuro(e.target.value * valoracion)});
     }
     useEffect(() => {
          if(puntuacion.value !== 0){
                const nuevasempresas = empresas.map((empresita) => {
                     if (empresita.name === empresa.name) {
                         const lastpunta  = empresita.puntajes.find(punta => punta.id === puntuacion.id);
                         
                         let puntasrest = [];
                         if(lastpunta){
                              puntasrest = empresita.puntajes.filter(punta => punta.id !== lastpunta.id);
                              empresita.puntajes = [...puntasrest, puntuacion];
                         }else{
                              empresita.puntajes = [...empresita.puntajes, puntuacion];
                         }
                     }
                    return empresita;
                })
               changeEmpresas(nuevasempresas)
          }
          // eslint-disable-next-line 
     }, [puntuacion])


     return (
            <Fragment>
               <td>
                    {resultados.estado
                    ?
                    '-'
                    :
                    <select className="form-control" onChange={handlePuntuacion} value={puntuacion.value}>
                         <option value="0" disabled>0</option>
                         <option value="1">1</option>
                         <option value="2">2</option>
                         <option value="3">3</option>
                         <option value="4">4</option>
                    </select>
                    }
               </td>
               <td>
                    {puntuacion.ponderado}
               </td>
          </Fragment> 
     );
}
 
export default Puntuacion;