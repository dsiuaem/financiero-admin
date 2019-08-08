<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>LISTADO DE USUARIOS</strong></h3>
                    </div>
                    <div class="card-body">
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
                        </form>
                        <div class="listaUsuarios" >
                            <div class="form-group">
                                <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                                <table class="table table-striped table-bordered dt-responsive nowrap" id="tableUsuarios"
                                       width="100%"
                                       cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody class="tBodyListarUsuarios">
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
<div class="modal fade" id="modalEditarUsuario" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                <h3 style="text-align: center; color: white;"><strong>EDITAR USUARIO</strong></h3>
            </div>
            <div class="modal-body mx-3">

                <form id="actualizacionUsuario" name="actualizacionUsuario" method="POST"
                      enctype="multipart/form-data">
                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label class="form-control-label">Correo del usuario:</label>
                            <input type="email" id="updateCorreoUsuario" name="email" class="form-control" required>
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateCorreoUsuario" class="form-control-label">Modificar contraseña:</label>
                            <label class="switch switch-text switch-success switch-pill">
                                <input id="checkboxPassword" type="checkbox" class="switch-input" value="0">
                                <span data-on="On" data-off="Off" class="switch-label"></span>
                                <span class="switch-handle"></span>
                            </label>
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <div class="row form-group editarPassword" style="display: none">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label class="form-control-label">Contraseña:</label>
                            <input type="password" id="updatePassUsuario" name="updatePassUsuario" class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label class="form-control-label">Confirmar contraseña:</label>
                            <input type="password" id="password_repeat" name="password_repeat" class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <input type="hidden" id="idUserUpdate" name="idUser">
                    <input type="hidden" name="actualIdPerfil" class="actualIdPerfil">

                    <div class="modal-footer">
                        <button id="editUserBtn" name="editUserBtn" class="btn btn-primary azul">
                            <i class="fas fa-save"></i> Actualizar datos
                        </button>
                        <button type="button" style="" id="" name="" data-dismiss="modal" onclick="limpiarForm()" class="btn btn-danger">
                            <i class="fas fa-times-circle"></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- FIN MODAL AGREGAR XML -->
<div class="modal fade" id="modalAdminSystems" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true" data-backdrop="static" data-keyboard="false" style="overflow-y: scroll;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                <h3 style="text-align: center; color: white;"><strong>EDITAR USUARIO</strong></h3>
            </div>
            <div class="modal-body mx-3">
                <br><h3 class="text-center">SISTEMAS ACTUALES </h3><br>
                <table class="table table-striped table-bordered dt-responsive nowrap enSistemaPerfil" border="1" style="width: 100%;">
                    <thead>
                        <tr>
                            <th>Sistema</th>
                            <th>Perfil</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                 <br><br><h3 class="text-center">SISTEMAS POR DEFINIR</h3><br>
                <table class="table table-striped table-bordered dt-responsive nowrap sinSistemaPerfil" border="1" style="width: 100%;">
                    <thead>
                        <tr>
                            <th>Sistema</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <div class="modal-footer">
                    <button type="button" style="" id="" name="" data-dismiss="modal" class="btn btn-danger">
                        <i class="fas fa-times-circle"></i> Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalEditarPerfilUsuario" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                <h3 style="text-align: center; color: white;"><strong>EDITAR USUARIO</strong></h3>
            </div>
            <div class="modal-body mx-3">

                <form id="actualizacionPerfil" name="actualizacionPerfil" method="POST"
                      enctype="multipart/form-data">

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label class="form-control-label">Selecciona una perfil:</label>
                            <select class="form-control perfilEditSelect" id="perfilEditSelect" name="perfil">

                            </select>
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <input type="hidden" id="idUserPerfil" name="idUser">
                    <input type="hidden" name="actualIdPerfil" class="actualIdPerfilEdit">

                    <div class="modal-footer">
                        <a id="editUserPerfilBtn" name="editUserPerfilBtn" class="btn btn-primary azul" href="#">
                            <i class="fa fa-save"></i> Actualizar perfil
                        </a>
                        <button type="button" style="" id="" name="" data-dismiss="modal" onclick="limpiarForm()" class="btn btn-danger">
                            <i class="fas fa-times-circle"></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalSelectPerfil" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                <h3 style="text-align: center; color: white;"><strong>EDITAR USUARIO</strong></h3>
            </div>
            <div class="modal-body mx-3">

                <form id="agregarPerfil" name="actualizacionPerfil" method="POST"
                      enctype="multipart/form-data">

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label class="form-control-label">Selecciona una perfil:</label>
                            <select class="form-control perfilAddSelect" id="perfilAddSelect" name="perfil">

                            </select>
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <input type="hidden" id="idUserP" name="idUserP">
                    <input type="hidden" id="idPerfilAdd" name="idPerfilAdd">
                    <input type="hidden" id="idSystemAdd" name="idSystemAdd">

                    <div class="modal-footer">
                        <a id="addPerfilBtn" name="addUserPerfilBtn" class="btn btn-primary azul" href="#">
                            <i class="fa fa-save"></i> Agregar perfil
                        </a>
                        <button type="button" style="" id="" name="" data-dismiss="modal" onclick="limpiarForm()" class="btn btn-danger">
                            <i class="fas fa-times-circle"></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- FIN MODAL AGREGAR XML -->
<!-- <div class="modal fade" id="modalAdminSystems" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                <h3 style="text-align: center; color: white;"><strong>EDITAR USUARIO</strong></h3>
            </div>
            <div class="modal-body mx-3">

                <table class="table table-striped table-bordered dt-responsive nowrap enSistemaPerfil" border="1">
                    <thead>
                        <tr>
                            <th>Sistema</th>
                            <th>Perfil</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <table class="table table-striped table-bordered dt-responsive nowrap sinSistemaPerfil" border="1">
                    <thead>
                        <tr>
                            <th>Sistema</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <div class="modal-footer">
                    <button type="button" style="" id="" name="" data-dismiss="modal" class="btn btn-danger">
                        <i class="fas fa-times-circle"></i> Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div> -->

<!-- <div class="modal fade" id="modalEditarPerfilUsuario" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                <h3 style="text-align: center; color: white;"><strong>EDITAR USUARIO</strong></h3>
            </div>
            <div class="modal-body mx-3">

                <form id="actualizacionPerfil" name="actualizacionPerfil" method="POST"
                      enctype="multipart/form-data">

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label class="form-control-label">Selecciona una perfil:</label>
                            <select class="form-control perfilEditSelect" id="perfilEditSelect" name="perfil">

                            </select>
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <input type="hidden" id="idUserPerfil" name="idUser">
                    <input type="hidden" name="actualIdPerfil" class="actualIdPerfilEdit">

                    <div class="modal-footer">
                        <a id="editUserPerfilBtn" name="editUserPerfilBtn" class="btn btn-primary azul" href="#">
                            <i class="fa fa-save"></i> Actualizar perfil
                        </a>
                        <button type="button" style="" id="" name="" data-dismiss="modal" onclick="limpiarForm()" class="btn btn-danger">
                            <i class="fas fa-times-circle"></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalSelectPerfil" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                <h3 style="text-align: center; color: white;"><strong>EDITAR USUARIO</strong></h3>
            </div>
            <div class="modal-body mx-3">

                <form id="agregarPerfil" name="actualizacionPerfil" method="POST"
                      enctype="multipart/form-data">

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label class="form-control-label">Selecciona una perfil:</label>
                            <select class="form-control perfilAddSelect" id="perfilAddSelect" name="perfil">

                            </select>
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <input type="hidden" id="idUserP" name="idUserP">
                    <input type="hidden" id="idPerfilAdd" name="idPerfilAdd">
                    <input type="hidden" id="idSystemAdd" name="idSystemAdd">

                    <div class="modal-footer">
                        <a id="addPerfilBtn" name="addUserPerfilBtn" class="btn btn-primary azul" href="#">
                            <i class="fa fa-save"></i> Agregar perfil
                        </a>
                        <button type="button" style="" id="" name="" data-dismiss="modal" onclick="limpiarForm()" class="btn btn-danger">
                            <i class="fas fa-times-cicle"></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> -->
