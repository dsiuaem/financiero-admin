<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>REGISTRO DE SUBMÓDULOS</strong></h3>
                    </div>
                    <div class="card-body">
                        <form id="registroSubmodulos" name="registroSubmodulos" method="POST" enctype="multipart/form-data">
                            <div class="row form-group">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="systemName" class="form-control-label">Listado de sistemas:</label>
                                    <select name="systemName" id="systemName" class="form-control">
                                    </select>
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="moduleName" class="form-control-label">Listado de módulos:</label>
                                    <select name="moduleName" id="moduleName" class="form-control">
                                    </select>
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="nameSubmodule" class="form-control-label">Agregar nombre del submódulo: </label>
                                    <input type="text" id="nameSubmodule" name="nameSubmodule" class="form-control">
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="nameController" class="form-control-label">Nombre del controlador: </label>
                                    <input type="text" id="nameController" name="nameController" class="form-control">
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div align="center">
                                <button id="btnSaveSubmodule" name="btnSaveSubmodule" class="btn btn-lg btn-outline btn-registra mt-2 mb-3" role="button">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>