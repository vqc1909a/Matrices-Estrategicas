import React, {useState} from 'react';
const EstrategiaFO = ({estrategiasFO, changeEstrategiasFO, factoresinternos, factoresexternos}) => {
  const [estrategiaFO, changeEstrategiaFO] = useState({
      fortalezas: [],
      oportunidades: [],
      estrategia: '',
      error: '',
      success: ''
  });
  const inputsChecked = document.querySelectorAll('input[type="checkbox"]');
  const inputsCheckedFO =  Array.from(inputsChecked).filter(input => input.name.substr(0,2) === "FO");

   const {fortalezas, oportunidades, estrategia, error, success} = estrategiaFO;
   const handleEstrategiaFO = (e) => {
      const search = e.target.name.substr(0,4);
      if(search === 'FO-D'){
            //Marcando
            if(e.target.checked){
                changeEstrategiaFO({
                    ...estrategiaFO,
                    fortalezas: [...estrategiaFO.fortalezas, e.target.value]
                })
            //Desmarcas
            }else{
                const restfortalezas = estrategiaFO.fortalezas.filter(fortaleza => fortaleza.toLowerCase() !== e.target.value.toLowerCase());
                changeEstrategiaFO({
                      ...estrategiaFO,
                      fortalezas: [...restfortalezas]
                })
            }
          
        
      }else if(search === 'FO-O'){
            if(e.target.checked){
                changeEstrategiaFO({
                      ...estrategiaFO,
                      oportunidades: [...estrategiaFO.oportunidades, e.target.value]
                })
            }else{
                const restoportunidades = estrategiaFO.oportunidades.filter(oportunidad => oportunidad.toLowerCase() !== e.target.value.toLowerCase());
                changeEstrategiaFO({
                      ...estrategiaFO,
                      oportunidades: [...restoportunidades]
                })

            }
      //Textarea    
      } else if(search === 'estr'){
            changeEstrategiaFO({
                ...estrategiaFO,
                estrategia: e.target.value
            })
      }
  }

  const handleSubmit = (e) =>{
      e.preventDefault();
      if(fortalezas.length === 0){
            changeEstrategiaFO({
                  ...estrategiaFO,
                  error: 'Seleccione al menos una fortaleza',
                  success: ''
            })
            return null;
      }
      changeEstrategiaFO({
            ...estrategiaFO,
            error: '',
            success: ''
      })
      if(oportunidades.length === 0){
            changeEstrategiaFO({
                  ...estrategiaFO,
                  error: 'Seleccione al menos una oportunidad',
                  success: ''   
            })
            return null;
      }
      changeEstrategiaFO({
            ...estrategiaFO,
            error: '',
            success: ''
      })
      if(estrategia.trim() === ''){
              changeEstrategiaFO({
                  ...estrategiaFO,
                  error: 'Agregue su estrategia FO',
                  success: ''
              })
              return null;
      }
      changeEstrategiaFO({
        ...estrategiaFO,
        error: '',
        success: ''
      })
      changeEstrategiasFO([
        ...estrategiasFO,
        estrategiaFO
      ])
      changeEstrategiaFO({
            fortalezas: [],
            oportunidades: [],
            estrategia: '',
            error: '',
            success: 'Estrategia FO agregada correctamente'
      })
      inputsCheckedFO.forEach((input)=>{
        input.checked = false;
      })

  }
  return (
    <form onSubmit={handleSubmit} >
      <div className="form-group">
            <label htmlFor="fortalezas">Fortalezas Internas</label>
            <div>
            {factoresinternos.fortalezas.map((fortaleza, i) => 
            <div className="form-check form-check-inline" key={fortaleza._id}>
            <input className="form-check-input" type="checkbox" id={`FO-D${i+1}`} value={fortaleza.name} name={`FO-D${i+1}`} onChange={handleEstrategiaFO} />
            <label className="form-check-label" for={`FO-D${i+1}`}>{`F${i+1}`}</label>
            </div>
            )}
            </div>
      </div>
      <div className="form-group">
            <label htmlFor="oportunidades">Oportunidades del sector</label>
            <div>
            {factoresexternos.oportunidades.map((oportunidad, i) => 
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id={`FO-O${i+1}`} value={oportunidad.name} name={`FO-O${i+1}`} onChange={handleEstrategiaFO} />
            <label className="form-check-label" for={`FO-O${i+1}`}>{`O${i+1}`}</label>
            </div>
            )}
            </div>
      </div>
      <div className="form-group">
            <textarea name="estrategia" placeholder="Que estrategia propone para que las fortalezas seleccionadas puedan aprovechar las oportunidades selecionadas ?" className="form-control" rows="5" onChange={handleEstrategiaFO} value={estrategiaFO.estrategia} ></textarea>
      </div>
      {
            error 
            ?
            <div className="alert alert-danger">{error}</div>
            :
            ''
      }
      {
            success 
            ?
            <div className="alert alert-success">{success}</div>
            :
            ''
      }
      <button type="submit" className="btn btn-secondary btn-block">Agregar Estrategia FO</button>
  </form> 
  );
}
 
export default EstrategiaFO;