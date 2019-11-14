<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>LISTADO DE SUBMÓDULOS</strong></h3>
                    </div>
                    <div class="card-body">
                        <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8"><br>
                                <label for="systemNameTable" class="form-control-label">Seleccionar sistema: </label>
                                <select name="systemNameTable" id="systemNameTable" class="form-control">
                                </select>
                            </div>
                            <div class="col col-md-2"></div>
                        </div>

                        <div class="row form-group divmoduleNameTable" style="display:none;">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8">
                                <label for="moduleNameTable" class="form-control-label">Seleccionar módulo: </label>
                                <select name="moduleNameTable" id="moduleNameTable" class="form-control">
                                </select>
                            </div>
                            <div class="col col-md-2"></div><br>
                        </div>
                        <div class="form-group tableSubModulosSystem" style="display:none;">
                            <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                            <table class="table table-striped table-bordered dt-responsive nowrap" id="tableSubmodulos" width="100%"
                                   cellspacing="0">
                                <thead>
                                  <tr>
                                      <th>ID</th>
                                      <th>Submódulos registrados</th>
                                      <th>Controlador</th>
                                      <th>Orden</th>
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

<!-- MODAL AGREGAR XML -->
<div class="modal fade" id="modalEditarSubModulo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     style="z-index: 1300;" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: white;">Editar submódulo</h4>
                <!-- <button style="color: white;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> -->
            </div>
            <div class="modal-body mx-3">

                <form id="actualizacionSubModulos" name="actualizacionSubModulos" method="POST"
                      enctype="multipart/form-data">

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateNameSubmodule" class="form-control-label">Agregar nombre del
                                submódulo: </label>
                            <input type="text" id="updateNameSubmodule" name="updateNameSubmodule" class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateNameController" class="form-control-label">Nombre del
                                controlador: </label>
                            <input type="text" id="updateNameController" name="updateNameController"
                                   class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <input type="hidden" id="idSubModuleUpdate" name="idSubModuleUpdate">

                    <div class="modal-footer">
                        <button id="btnUpdateSubModule" name="btnUpdateSubModule" class="btn btn-primary azul">
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
