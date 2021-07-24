import React, {useState} from 'react';
const EstrategiaDO = ({estrategiasDO, changeEstrategiasDO, factoresinternos, factoresexternos}) => {

  const [estrategiaDO, changeEstrategiaDO] = useState({
    debilidades: [],
    oportunidades: [],
    estrategia: '',
    error: '',
    success: ''
  });
  const inputsChecked = document.querySelectorAll('input[type="checkbox"]');
  const inputsCheckedDO =  Array.from(inputsChecked).filter(input => input.name.substr(0,2) === "DO");

  const {debilidades, oportunidades, estrategia, error, success} = estrategiaDO;
  const handleEstrategiaDO = (e) => {
           const search = e.target.name.substr(0, 4);
           if (search === 'DO-D') {
                if (e.target.checked) {
                     changeEstrategiaDO({
                          ...estrategiaDO,
                          debilidades: [...estrategiaDO.debilidades, e.target.value]
                     })
                } else {
                     const restdebilidades = estrategiaDO.debilidades.filter(debilidad => debilidad.toLowerCase() !== e.target.value.toLowerCase());
                     changeEstrategiaDO({
                          ...estrategiaDO,
                          debilidades: [...restdebilidades]
                     })
                }
           } else if (search === 'DO-O') {
                if (e.target.checked) {
                     changeEstrategiaDO({
                          ...estrategiaDO,
                          oportunidades: [...estrategiaDO.oportunidades, e.target.value]
                     })
                } else {
                     const restoportunidades = estrategiaDO.oportunidades.filter(oportunidad => oportunidad.toLowerCase() !== e.target.value.toLowerCase());
                     changeEstrategiaDO({
                          ...estrategiaDO,
                          oportunidades: [...restoportunidades]
                     })
                }
           } else if (search === 'estr') {
                changeEstrategiaDO({
                     ...estrategiaDO,
                     estrategia: e.target.value
                })
           }
      }
      const handleSubmit = (e) => {
           e.preventDefault();
           if (debilidades.length === 0) {
                changeEstrategiaDO({
                     ...estrategiaDO,
                     error: 'Seleccione al menos una debilidad',
                     success: ''
                })
                return null;
           }
           changeEstrategiaDO({
                ...estrategiaDO,
                error: ''
           })
           if (oportunidades.length === 0) {
                changeEstrategiaDO({
                     ...estrategiaDO,
                     error: 'Seleccione al menos una oportunidad',
                     success: ''
                })
                return null;
           }
           changeEstrategiaDO({
                ...estrategiaDO,
                error: '',
                success: ''
           })
           if (estrategiaDO.estrategia.trim() === '') {
                changeEstrategiaDO({
                     ...estrategiaDO,
                     error: 'Agregue su estrategia D0',
                     success: ''
                })
                return null;
           }
           changeEstrategiaDO({
                ...estrategiaDO,
                error: '',
                success: ''
           })
           changeEstrategiasDO([
                ...estrategiasDO,
                estrategiaDO
           ])
           changeEstrategiaDO({
                debilidades: [],
                oportunidades: [],
                estrategia: '',
                error: '',
                success: 'Estrategia DO agregada correctamente'
           })
          inputsCheckedDO.forEach((input)=>{
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
            <input className="form-check-input" type="checkbox" id={`DO-D${i+1}`} value={debilidad.name} name={`DO-D${i+1}`} onChange={handleEstrategiaDO} />
            <label className="form-check-label" for={`DO-D${i+1}`}>{`D${i+1}`}</label>
            </div>
            )}
            </div>
      </div>
      <div className="form-group">
            <label htmlFor="oportunidades">Oportunidades del sector</label>
            <div>
            {factoresexternos.oportunidades.map((oportunidad, i) => 
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id={`DO-O${i+1}`} value={oportunidad.name} name={`DO-O${i+1}`} onChange={handleEstrategiaDO} />
            <label className="form-check-label" for={`DO-O${i+1}`}>{`O${i+1}`}</label>
            </div>
            )}
            </div>
      </div>
      <div className="form-group">
            <textarea name="estrategia" placeholder="Que estrategia propone para orientar a las empresas en la superación de sus debilidades con la oportunidades seleccionadas?" className="form-control" rows="5" value={estrategia} onChange={handleEstrategiaDO}></textarea>
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
      <button type="submit" className="btn btn-secondary btn-block">Agregar Estrategia DO</button>
  </form>
  );
}
 
export default EstrategiaDO;