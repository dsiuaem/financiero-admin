<div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Listado de usuarios</h5></div>
            </div>
        </div>
    </div>
</div>

<div class="card-body card-block">
    <form id="listadoUsuarios" name="listadoUsuarios" method="POST" enctype="multipart/form-data">

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="systemNameListarUsuarios" class="form-control-label">Listado de sistemas:</label>
                <select name="systemNameListarUsuarios" id="systemNameListarUsuarios" class="form-control">
                    <option value="0">- Seleccionar -</option>
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="card-body card-block">
            <div class="form-group">
                <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                <table class="table table-striped table-bordered dt-responsive nowrap" id="tableUsuarios"
                       width="100%"
                       cellspacing="0">
                    <thead>
                    <tr>
                        <th>Acciones</th>
                        <th></th>
                        <th>Nombre</th>
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
    </form>
</div>

<!-- MODAL AGREGAR XML -->
<div class="modal fade" id="modalEditarUsuario" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     style="z-index: 1300;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: white;">Editar usuario</h4>
                <button style="color: white;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body mx-3">

                <form id="actualizacionUsuario" name="actualizacionUsuario" method="POST"
                      enctype="multipart/form-data">
                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateCorreoUsuario" class="form-control-label">Correo del usuario:</label>
                            <input type="email" id="updateCorreoUsuario" name="updateCorreoUsuario" class="form-control" required>
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updatePassUsuario" class="form-control-label">Contraseña:</label>
                            <input type="password" id="updatePassUsuario" name="updatePassUsuario" class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <input type="hidden" id="idUserUpdate" name="idUserUpdate">

                    <div class="modal-footer">
                        <button id="btnUpdateUser" name="btnUpdateUser" class="btn btn-primary azul">
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
