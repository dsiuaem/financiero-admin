<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>LISTADO DE PERFILES</strong></h3>
                    </div>
                    <div class="card-body">
                        <div class="row form-group">
                          <div class="col col-md-2"></div>
                          <div class="col-12 col-md-8">
                              <label for="systemNameTable" class="form-control-label">Seleccionar sistema: </label>
                              <select name="systemNameTable" id="systemNameTable" class="form-control">
                                  <option value="0">- Seleccionar -</option>
                              </select>
                          </div>
                          <div class="col col-md-2"></div>
                      </div>

                      <div class="listarPerfiles">
                          <div class="form-group">
                              <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                              <table class="table table-striped table-bordered dt-responsive nowrap" id="tableListadoPerfiles" width="100%"
                                     cellspacing="0">
                                  <thead>
                                          <tr>
                                              <th>ID</th>
                                              <th>Perfiles registrados</th>
                                              <th>Usuarios con perfil</th>
                                              <th>Acciones</th>
                                          </tr>
                                  </thead>
                                  <tbody>

                                  </tbody>
                                  <tfoot>

                                  </tfoot>
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
<div class="modal fade" id="modalEditarPerfil" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     style="z-index: 1300;" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: white;">Editar perfil</h4>
                <!-- <button style="color: white;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> -->
            </div>
            <form id="formPerfilEdit" name="formPerfilEdit" method="POST" enctype="multipart/form-data">
              <div class="modal-body mx-3" style=" max-height: calc(100vh - 210px); overflow-y: auto;">
                      <input type="text" name="perfil" class="form-control perfil">
                          <input type="hidden" name="idPerfilEdit" id="idPerfilEdit" class="idPerfilEdit">
                          <div class="row form-group">
                              <div class="col-12 col-md-12">
                                  <div name="modulospoEditar" id="modulospoEditar">

                                  </div>
                              </div>
                          </div>


              </div>
              <div class="modal-footer">
                  <button type="button" id="btnUpdatePerfil" name="btnUpdatePerfil" class="btn btn-primary azul" data-dismiss="modal" onclick="editarPerfilOpciones()">
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
<!-- FIN MODAL AGREGAR XML -->

<div class="modal fade" id="modaltableUsuarios" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true" data-backdrop="static" data-keyboard="false" style="overflow-y: scroll;">
        <div class="modal-dialog modal-lg" style="max-width: 75%!important;" role="document">
            <div class="modal-content">
              <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                  <h3 style="text-align: center; color: white;"><strong>LISTA DE USUARIOS</strong></h3>
              </div>
              <div class="modal-body mx-3">
                <table class="table table-striped table-bordered dt-responsive nowrap" id="tableUsuarios" border="1" style="width: 100%;">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Email</th>
                          <th>Sistema</th>
                          <th>Estatus</th>
                      </tr>
                  </thead>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-danger">
                    <i class="fas fa-times-circle"></i> Cancelar
                </button>
            </div>
        </div>
      </div>
</div>
