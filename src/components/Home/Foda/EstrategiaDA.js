import React, {useState} from 'react';
const EstrategiaDA = ({estrategiasDA, changeEstrategiasDA, factoresinternos, factoresexternos}) => {
  const [estrategiaDA, changeEstrategiaDA] = useState({
    debilidades: [],
    amenazas: [],
    estrategia: '',
    error: '',
    success: ''
  });

  const inputsChecked = document.querySelectorAll('input[type="checkbox"]');
  const inputsCheckedDA =  Array.from(inputsChecked).filter(input => input.name.substr(0,2) === "DA");

  const {debilidades, amenazas, estrategia, error, success} = estrategiaDA;


  const handleEstrategiaDA = (e) => {
    const search = e.target.name.substr(0, 4);
    if (search === 'DA-D') {
        if (e.target.checked) {
              changeEstrategiaDA({
                  ...estrategiaDA,
                  debilidades: [...estrategiaDA.debilidades, e.target.value]
              })
        } else {
              const restdebilidades = estrategiaDA.debilidades.filter(debilidad => debilidad.toLowerCase() !== e.target.value.toLowerCase());
              changeEstrategiaDA({
                  ...estrategiaDA,
                  debilidades: [...restdebilidades]
              })
        }
    } else if (search === 'DA-A') {
        if (e.target.checked) {
              changeEstrategiaDA({
                  ...estrategiaDA,
                  amenazas: [...estrategiaDA.amenazas, e.target.value]
              })
        } else {
              const restamenazas = estrategiaDA.amenazas.filter(amenaza => amenaza.toLowerCase() !== e.target.value.toLowerCase());
              changeEstrategiaDA({
                  ...estrategiaDA,
                  amenazas: [...restamenazas]
              })
        }
    } else if (search === 'estr') {
        changeEstrategiaDA({
              ...estrategiaDA,
              estrategia: e.target.value
        })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debilidades.length === 0) {
        changeEstrategiaDA({
              ...estrategiaDA,
              error: 'Seleccione al menos una debilidad',
            success: ''
        })
        return null;
    }
    changeEstrategiaDA({
        ...estrategiaDA,
        error: '',
        success: ''
    })
    if (amenazas.length === 0) {
        changeEstrategiaDA({
              ...estrategiaDA,
              error: 'Seleccione al menos una amenaza',
              success: ''
        })
        return null;
    }
    changeEstrategiaDA({
        ...estrategiaDA,
        error: '',
        success: ''
    })
    if (estrategia.trim() === '') {
        changeEstrategiaDA({
              ...estrategiaDA,
              error: 'Agregue su estrategia DA',
              success: ''
        })
        return null;
    }
    changeEstrategiaDA({
        ...estrategiaDA,
        error: '',
        success: ''
    })
    changeEstrategiasDA([
        ...estrategiasDA,
        estrategiaDA
    ])
    changeEstrategiaDA({
        debilidades: [],
        amenazas: [],
        estrategia: '',
        error: '',
        success: 'Estrategia DA agregada correctamente'
    })
    inputsCheckedDA.forEach((input)=>{
      input.checked = false;
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
            <label htmlFor="debilidades">Debilidades Internas</label>
            <div>
            {factoresinternos.debilidades.map((debilidad, i) => 
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id={`DA-D${i+1}`} value={debilidad.name} name={`DA-D${i+1}`} onChange={handleEstrategiaDA} />
            <label className="form-check-label" for={`DA-D${i+1}`}>{`D${i+1}`}</label>
            </div>
            )}
            </div>
      </div>
      <div className="form-group">
            <label htmlFor="amenazas">Amenazas Externas</label>
            <div>
            {factoresexternos.amenazas.map((amenaza, i) => 
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id={`DA-A${i+1}`} value={amenaza.name} name={`DA-A${i+1}`} onChange={handleEstrategiaDA} />
            <label className="form-check-label" for={`DA-A${i+1}`}>{`A${i+1}`}</label>
            </div>
            )}
            </div>
      </div>
      <div className="form-group">
            <textarea name="estrategia" placeholder="Que estrategia propone para superar debilidades internas y consecuentemente reducir el impacto de amenazas del sector ?" className="form-control" rows="5" value={estrategia} onChange={handleEstrategiaDA} ></textarea>
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
      <button className="btn btn-secondary btn-block">Agregar Estrategia DA</button>
  </form>
  );
}
 
export default EstrategiaDA;
