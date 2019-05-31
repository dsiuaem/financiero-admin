<div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Listado de sistemas</h5></div>
            </div>
        </div>
    </div>
</div>

<div class="card-body card-block">
    <div class="form-group">
        <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
        <table class="table table-striped table-bordered dt-responsive nowrap" id="tableSistemas" width="100%"
               cellspacing="0">
            <thead>
            <tr>
                <th>Acciones</th>
                <th></th>
                <th>Sistemas registrados</th>
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
            <tr>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            </tfoot>
        </table>
    </div>
</div>

<!-- MODAL AGREGAR XML -->
<div class="modal fade" id="modalEditarSistema" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     style="z-index: 1300;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold">Editar sistema</h4>
                <button style="color: white;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
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
                        <button id="btnUpdateSystem" name="btnUpdateSystem" class="btn btn-primary azul">
                            <i class="fa fa-save"></i> Actualizar datos
                        </button>
                        <button type="button" style="" id="" name="" data-dismiss="modal" class="btn btn-danger">
                            <i class="fa fa-times"></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
<!-- FIN MODAL AGREGAR XML -->
