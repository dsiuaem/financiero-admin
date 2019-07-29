<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>REGISTRO DE PERFILES</strong></h3>
                    </div>
                    <div class="card-body">
                        <form id="registroPerfiles" name="registroPerfiles" method="POST" enctype="multipart/form-data">
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
                                    <label for="namePerfil" class="form-control-label">Agregar nombre de perfil: </label>
                                    <input type="text" id="namePerfil" name="namePerfil" class="form-control">
                                </div>
                                <div class="col col-md-2"></div>
                            </div>
                            <div class="modal fade" id="modalAddPerfil" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="z-indexi: 1300;" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content">
                                        <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                                            <h4 class="modal-title w-100 font-weight-bold" style="color: white;">Editar perfil</h4>
                                        </div>
                                        <div class="modal-body mx-3" style=" max-height: calc(100vh - 210px); overflow-y: auto;">
                                            <div class="row form-group">
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-10">
                                                    <div name="modulospo" id="modulospo">
                                                    </div>
                                                </div>
                                                <div class="col col-md-1"></div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                               <button type="button" style="" id="" name="" data-dismiss="modal" class="btn btn-danger">
                                                   <i class="fas fa-times-circle"></i> Cerrar
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            </div><br>
                            <div class="row form-group">
                                <div class="col-md-3"></div>
                                <div class="col-md-3">
                                    <div align="center">
                                        <a class="btn btn-lg btn-permisos opcsPerfil" data-toggle="modal" data-target="#modalAddPerfil" href="#">Permisos de Perfil</a>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div align="center">
                                        <button id="btnSavePerfil" name="btnSavePerfil" class="btn btn-lg btn-registra">Guardar</button>
                                    </div>
                                </div>
                                <div class="col-md-3"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>