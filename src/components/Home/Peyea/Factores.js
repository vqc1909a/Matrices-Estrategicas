import React, {Fragment, useState, useEffect} from 'react';

const Factores = ({resultados, factor, factores, changeFactores, negativo = ''}) => { 
     const [puntuacion, changePuntuacion] = useState(0);
    
     useEffect(()=>{
          if(puntuacion !== 0){
               const nuevosfactores = factores.map((factorcito)=>{
                    if(factorcito._id === factor._id){
                         factorcito.value = puntuacion;
                    }
                    return factorcito;
               })
               changeFactores([...nuevosfactores]);
          }
          // eslint-disable-next-line
     },[puntuacion])
     return (
            <Fragment>
            <tr>
               <td>{factor.name}</td>
               {resultados.estado 
               ?
               <td>-</td>
               :
               <td>
                    <select className="form-control" onChange={(e) => changePuntuacion(parseInt(e.target.value))} value={puntuacion}>
                         <option value="0" disabled>0</option>
                         <option value={`${negativo}1`}>{negativo}1</option>
                         <option value={`${negativo}2`}>{negativo}2</option>
                         <option value={`${negativo}3`}>{negativo}3</option>
                         <option value={`${negativo}4`}>{negativo}4</option>
                         <option value={`${negativo}5`}>{negativo}5</option>
                         <option value={`${negativo}6`}>{negativo}6</option>
                    </select>
               </td>
               }
          </tr>
          </Fragment> 
     );
}
 
export default Factores;