<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>ASIGNACIÓN DE PERFILES</strong></h3>
                    </div>
                    <div class="card-body">
                        <form id="asignarPerfiles" name="asignarPerfiles" method="POST" enctype="multipart/form-data">
                            <div class="row form-group">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="systemNameAsignarPerfil" class="form-control-label">Listado de sistemas:</label>
                                    <select name="systemNameAsignarPerfil" id="systemNameAsignarPerfil" class="form-control">
                                        <option value="0">- Seleccionar -</option>
                                    </select>
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="row form-group divperfilUser" style="display:none;">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="perfilUser" class="form-control-label">Selecciona un perfil para el / los
                                        usuario(s): </label>
                                    <select name="perfilUser" id="perfilUser" class="form-control">
                                        <option value="0">- Seleccionar -</option>
                                    </select>
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="infoUsers" style="display:none;">
                                <div class="card-body card-block">
                                    <div class="form-group text-center">
                                        <h2>Usuarios sin el perfil seleccionado asignado</h2><br><br><br>
                                        <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                                        <table class="table table-striped table-bordered dt-responsive nowrap"
                                               id="tableListadoAsignacionPerfiles"
                                               width="100%"
                                               cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nombre de usuario</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div>
                                    <div class="form-group text-center">
                                        <h2>Usuarios con el perfil seleccionado asignado</h2><br><br><br>
                                        <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                                        <table class="table table-striped table-bordered dt-responsive nowrap"
                                               id="tableListadoAsignacionPerfilesExistentes"
                                               width="100%"
                                               cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Nombre de usuario</th>
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
                        </form>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
