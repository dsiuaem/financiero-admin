<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>REGISTRO DE USUARIOS</strong></h3>
                    </div>
                    <div class="card-body">
                        <form id="registroUsuarios" name="registroUsuarios" method="POST" enctype="multipart/form-data">
                            <div class="row form-group">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="userTypeNewUser" class="form-control-label">Selecciona tipo de usuario: </label>
                                    <select name="userTypeNewUser" id="userTypeNewUser" class="form-control">
                                        <option value="0">- Seleccionar -</option>
                                    </select>
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group divempleadoNewUser" style="display:none;">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="empleadoNewUser" class="form-control-label">Selecciona el nombre: </label>
                                    <select name="empleadoNewUser" id="empleadoNewUser" class="form-control">
                                    </select>
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group divName" style="display:none;">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="userName" class="form-control-label">Correo del usuario:</label>
                                    <input type="email" id="userNameR" name="userNameR" class="form-control" disabled>
                                    <input type="hidden" id="userName" name="userName" >
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group divConfirmarCorreo" style="display:none;">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="userName" class="form-control-label">Confirmar correo electrónico</label>
                                    <input type="email" id="confirmarCorreo" name="confirmarCorreo" class="form-control">
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group divPassword" style="display:none;">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="userPass" class="form-control-label">Contraseña:</label>
                                    <input type="password" id="userPass" name="userPass" class="form-control">
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div align="center">
                                <button id="btnSaveUser" name="btnSaveUser" class="btn btn-lg btn-outline btn-registra mt-2 mb-3" role="button" disabled>Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
