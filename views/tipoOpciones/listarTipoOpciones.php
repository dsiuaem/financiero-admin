<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>LISTADO DE TIPO OPCIONES</strong></h3>
                    </div>
                    <div class="card-body">
                        <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8">
                                <label for="systemNameTable" class="form-control-label">Listado de sistemas:</label>
                                <select name="systemNameTable" id="systemNameTable" class="form-control">
                                    <option value="0">- Seleccionar -</option>
                                </select>
                            </div>
                            <div class="col col-md-2"></div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8">
                                <label for="moduleListTable" class="form-control-label">Listado de módulos:</label>
                                <select name="moduleListTable" id="moduleListTable" class="form-control">
                                </select>
                            </div>
                            <div class="col col-md-2"></div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8">
                                <label for="submoduleListTable" class="form-control-label">Listado de submódulos:</label>
                                <select name="submoduleListTable" id="submoduleListTable" class="form-control">
                                </select>
                            </div>
                            <div class="col col-md-2"></div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8">
                                <label for="optionNameTable" class="form-control-label">Listado de opciones:</label>
                                <select name="optionNameTable" id="optionNameTable" class="form-control">
                                </select>
                            </div>
                            <div class="col col-md-2"></div>
                        </div>

                        <div class="listTableTipoOptions">
                            <div class="form-group">
                                <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                                <table class="table table-striped table-bordered dt-responsive nowrap" id="tableTipoOpciones" width="100%"
                                       cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tipo opciones registradas</th>
                                            <th>Tipo</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- MODAL AGREGAR XML -->
<div class="modal fade" id="modalEditarTipoOpciones" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     style="z-index: 1300;" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: white;">Editar tipo opción</h4>
                <!-- <button style="color: white;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> -->
            </div>
            <div class="modal-body mx-3">

                <form id="actualizacionTipoOpciones" name="actualizacionTipoOpciones" method="POST"
                      enctype="multipart/form-data">

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateNameTypeOption" class="form-control-label">Agregar nombre de tipo
                                opción: </label>
                            <input type="text" id="updateNameTypeOption" name="updateNameTypeOption"
                                   class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="description" class="form-control-label">Tipo: </label>
                            <label class="container">1
                              <input type="checkbox" id="typeOne" name="typeOne" value="1" onclick="checkOneUpate()">
                              <span class="checkmark"></span>
                            </label>

                            <label class="container">2
                              <input type="checkbox" id="typeTwo" name="typeTwo" value="2" onclick="checkTwoUpate()">
                              <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <input type="hidden" id="idTipoOpcionesUpdate" name="idTipoOpcionesUpdate">

                    <div class="modal-footer">
                        <button id="btnUpdateTipoOption" name="btnUpdateTipoOption" class="btn btn-primary azul">
                            <i class="fas fa-save"></i> Actualizar datos
                        </button>
                        <button type="button" style="" id="" name="" data-dismiss="modal" class="btn btn-danger">
                            <i class="fas fa-times-circle"></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- FIN MODAL AGREGAR XML -->


