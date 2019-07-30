<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>LISTADO DE MÓDULOS</strong></h3>
                    </div>
                    <div class="card-body">
                        <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-10 col-md-8"><br>
                                <label for="systemNameTable" class="form-control-label">Seleccionar sistema: </label>
                                <select name="systemNameTable" id="systemNameTable" class="form-control">
                                </select>
                                <br>
                            </div>
                            <div class="col col-md-2"></div>
                        </div>
                        <div class="listModulosSystem">
                            <div class="form-group">
                                <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                                <table class="table table-striped table-bordered dt-responsive nowrap" id="tableModulos" width="100%"
                                       cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Módulo del menú</th>
                                            <th>Módulos registrados</th>
                                            <th>Descripción</th>
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
<div class="modal fade" id="modalEditarModulo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     style="z-index: 1300;" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: white;">Editar módulo</h4>
                <!-- <button style="color: white;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> -->
            </div>
            <div class="modal-body mx-3">

                <form id="actualizacionModulos" name="actualizacionModulos" method="POST"
                      enctype="multipart/form-data">

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateNameModule" class="form-control-label">Agregar nombre del módulo: </label>
                            <input type="text" id="updateNameModule" name="updateNameModule" class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateDescription" class="form-control-label">Descripción: </label>
                            <textarea name="updateDescription" id="updateDescription" cols="30" rows="6"
                                      class="form-control"></textarea>
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateNameModuleMenu" class="form-control-label">Nombre del módulo del
                                menú (Se utiliza en el menú del sistema para mantener el módulo abierto, este nombre debe ser igual al valor de la variable definida en el controlador): </label>
                            <input id="updateNameModuleMenu" name="updateNameModuleMenu" type="text"
                                   class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <input type="hidden" id="idModuleUpdate" name="idModuleUpdate">

                    <div class="modal-footer">
                        <button id="btnUpdateSystem" name="btnUpdateSystem" class="btn btn-primary azul">
                            <i class="fas fa-save"></i>Actualizar datos
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
