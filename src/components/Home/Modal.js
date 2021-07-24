import React, {Fragment} from 'react';

const Modal = ({accion, plural, singular, factores = [], modal, industrias = []}) => {
     return (
          <Fragment>                                                    
          <div className="col-md-2">
               <input type="submit" value="Agregar" className="btn btn-outline-primary btn-lg btn-block mb-2"/>
          </div>
          <div className="col-md-2">
               <button type="button" className="btn btn-primary btn-lg btn-block mb-2" data-toggle="modal" data-target={`#${modal}`}>Ayuda</button>
          </div>
          <div className="modal fade" id={modal}>
               <div className="modal-dialog">
                    <div className="modal-content bg-warning">
                         <div className="modal-header">
                              <h4 className="modal-title">{plural}</h4>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span></button>
                         </div>
                         <div className="modal-body">
                              <div className="list-group text-primary">
                                   {factores.length !== 0 
                                   ? 
                                   <Fragment>
                                   {singular && <li className="list-group-item list-group-item-action active px-0">Ejemplos de {singular}</li>}
                                   {factores.map(factor =>  <button key={factor} className="list-group-item list-group-item-action" data-dismiss="modal" value={factor} onClick={accion}>{factor}</button>)}
                                   </Fragment>
                                   :
                                   ''
                                   }

                                   {industrias.length !== 0
                                   ?
                                   <Fragment>
                                        <h4 className="text-body">Ejemplos</h4>
                                        {industrias.map((industria, i) => 
                                             <Fragment key={i}>
                                                  <li  className="list-group-item list-group-item-action active mt-3 text-uppercase">{industria.name}</li>
                                                  {industria.factores.map(factor =>  <button key={factor} className="list-group-item list-group-item-action" data-dismiss="modal" value={factor} onClick={accion}>{factor}</button>)}
                                             </Fragment>
                                        )}
                                   </Fragment>
                                   :
                                   ''
                                   }
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          </Fragment>
     );
}
 
export default Modal;