import React, {useState} from 'react';
const EstrategiaFA = ({estrategiasFA, changeEstrategiasFA, factoresinternos, factoresexternos}) => {

  const [estrategiaFA, changeEstrategiaFA] = useState({
    fortalezas: [],
    amenazas: [],
    estrategia: '',
    error: '',
    success: ''
  });

  const inputsChecked = document.querySelectorAll('input[type="checkbox"]');
  const inputsCheckedFA =  Array.from(inputsChecked).filter(input => input.name.substr(0,2) === "FA");

  const {fortalezas, amenazas, estrategia, error, success} = estrategiaFA;

  const handleEstrategiaFA = (e) => {
        const search = e.target.name.substr(0, 4);
        if (search === 'FA-F') {
            if (e.target.checked) {
                  changeEstrategiaFA({
                      ...estrategiaFA,
                      fortalezas: [...estrategiaFA.fortalezas, e.target.value]
                  })
            } else {
                  const restfortalezas = estrategiaFA.fortalezas.filter(fortaleza => fortaleza.toLowerCase() !== e.target.value.toLowerCase());
                  changeEstrategiaFA({
                      ...estrategiaFA,
                      fortalezas: [...restfortalezas]
                  })
            }
        } else if (search === 'FA-A') {
            if (e.target.checked) {
                  changeEstrategiaFA({
                      ...estrategiaFA,
                      amenazas: [...estrategiaFA.amenazas, e.target.value]
                  })
            } else {
                  const restamenazas = estrategiaFA.amenazas.filter(amenaza => amenaza.toLowerCase() !== e.target.value.toLowerCase());
                  changeEstrategiaFA({
                      ...estrategiaFA,
                      amenazas: [...restamenazas]
                  })
            }
        } else if (search === 'estr') {
            changeEstrategiaFA({
                  ...estrategiaFA,
                  estrategia: e.target.value
            })
        }
  }
  const handleSubmit = (e) => {
        e.preventDefault();
        if (fortalezas.length === 0) {
            changeEstrategiaFA({
                  ...estrategiaFA,
                  error: 'Seleccione al menos una fortaleza',
                  success: ''
            })
            return null;
        }
        changeEstrategiaFA({
            ...estrategiaFA,
            error: '',
            success: ''
        })
        if (amenazas.length === 0) {
            changeEstrategiaFA({
                  ...estrategiaFA,
                  error: 'Seleccione al menos una amenaza',
                success: ''
            })
            return null;
        }
        changeEstrategiaFA({
            ...estrategiaFA,
            error: '',
            success: ''
        })
        if (estrategia.trim() === '') {
            changeEstrategiaFA({
                  ...estrategiaFA,
                  error: 'Agregue su estrategia FA',
                success: ''   
            })
            return null;
        }
        changeEstrategiaFA({
            ...estrategiaFA,
            error: '',
            success: ''
        })
        changeEstrategiasFA([
            ...estrategiasFA,
            estrategiaFA
        ])
        changeEstrategiaFA({
            ...estrategiaFA,
            fortalezas: [],
            amenazas: [],
            estrategia: '',
            error: '',
            success: 'Estrategia FA agregada correctamente'
        })
        inputsCheckedFA.forEach((input)=>{
          input.checked = false;
        })

  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
            <label htmlFor="fortalezas">Fortalezas Internas</label>
            <div>
            {factoresinternos.fortalezas.map((fortaleza, i) => 
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id={`FA-F${i+1}`} value={fortaleza.name} name={`FA-F${i+1}`} onChange={handleEstrategiaFA} />
            <label className="form-check-label" for={`FA-F${i+1}`}>{`F${i+1}`}</label>
            </div>
            )}
            </div>
      </div>
      <div className="form-group">
            <label htmlFor="amenazas">Amenazas Externas</label>
            <div>
            {factoresexternos.amenazas.map((amenaza, i) => 
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id={`FA-A${i+1}`} value={amenaza.name} name={`FA-A${i+1}`} onChange={handleEstrategiaFA} />
            <label className="form-check-label" for={`FA-A${i+1}`}>{`A${i+1}`}</label>
            </div>
            )}
            </div>
      </div>
      <div className="form-group">
            <textarea name="estrategia" placeholder="Que estrategia propone para que las fortalezas seleccionadas reduzcan el impacto de las amenazas del mercado ?" className="form-control" value={estrategia} rows="5" onChange={handleEstrategiaFA}></textarea>
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
      <button type="submit" className="btn btn-secondary btn-block">Agregar Estrategia FA</button>
  </form>
  );
}
 
export default EstrategiaFA;