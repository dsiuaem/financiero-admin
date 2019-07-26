<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-4 mb-4">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>LISTADO DE SISTEMAS</strong></h3>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                            <table class="table table-striped table-bordered dt-responsive nowrap" id="tableSistemas" width="100%"
                                   cellspacing="0">
                                <thead>
                                <tr>
                                    <th>Id Sistema</th>
                                    <th>Nombre Sistema</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
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

<!-- MODAL AGREGAR XML -->
<div class="modal fade" id="modalEditarSistema" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     style="z-index: 1300;" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: white;">Editar sistema</h4>
                <!-- <button style="color: white;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> -->
            </div>
            <div class="modal-body mx-3">

                <form id="actualizacionSistemas" name="actualizacionSistemas" method="POST"
                      enctype="multipart/form-data">
                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateNombreSistema" class="form-control-label">Nombre del sistema</label>
                            <input type="text" id="updateNombreSistema" name="updateNombreSistema" class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateIconoSistema" class="form-control-label">Subir icono del sistema</label>
                            <input type="file" id="updateIconoSistema" name="updateIconoSistema" class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <input type="hidden" id="idSystemUpdate" name="idSystemUpdate">

                    <div class="modal-footer">
                        <button id="btnUpdateSystem" name="btnUpdateSystem" class="btn btn-primary azul mr-2">
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
</div>
<!-- FIN MODAL AGREGAR XML -->
