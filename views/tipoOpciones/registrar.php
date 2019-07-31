<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>REGISTRO DE TIPO OPCIÓN</strong></h3>
                    </div>
                    <div class="card-body">
                        <form id="registroTipoOpciones" name="registroTipoOpciones" method="POST" enctype="multipart/form-data">
                            <div class="row form-group">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="systemName" class="form-control-label">Listado de sistemas:</label>
                                    <select name="systemName" id="systemName" class="form-control">
                                        <option value="0">- Seleccionar -</option>
                                    </select>
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group divmoduleName" style="display:none;">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="moduleName" class="form-control-label">Listado de módulos:</label>
                                    <select name="moduleName" id="moduleName" class="form-control">
                                        <option value="0">- Seleccionar -</option>
                                    </select>
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group divsubmoduleName" style="display:none;">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="submoduleName" class="form-control-label">Listado de submódulos:</label>
                                    <select name="submoduleName" id="submoduleName" class="form-control">
                                        <option value="0">- Seleccionar -</option>
                                    </select>
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group divoptionName" style="display:none;">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="optionName" class="form-control-label">Listado de opciones:</label>
                                    <select name="optionName" id="optionName" class="form-control">
                                        <option value="0">- Seleccionar -</option>
                                    </select>
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group divnameTypeOption" style="display:none;">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="nameTypeOption" class="form-control-label">Agregar nombre de tipo opción: </label>
                                    <input type="text" id="nameTypeOption" name="nameTypeOption" class="form-control">
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group divcheck" style="display:none;">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="description" class="form-control-label">Tipo: </label>
                                    <label class="container">Estatus
                                      <input type="checkbox" id="typeOne" name="typeOne" value="1" onclick="checkOne()">
                                      <span class="checkmark"></span>
                                    </label>

                                    <label class="container">Otra
                                      <input type="checkbox" id="typeTwo" name="typeTwo" value="2" onclick="checkTwo()">
                                      <span class="checkmark"></span>
                                    </label>
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div align="center">
                                <button id="btnSaveTypeOption" name="btnSaveTypeOption" class="btn btn-lg btn-outline btn-registra mt-2 mb-3" disabled>Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
