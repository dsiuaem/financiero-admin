<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-4 mb-4">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>REGISTRO DE SISTEMAS</strong></h3>
                    </div>
                      <div class="card-body">
                        <form id="registroSistemas" name="registroSistemas" method="POST" enctype="multipart/form-data">
                            <div class="row form-group">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="nombreSistema" class="form-control-label">Nombre del sistema</label>
                                    <input type="text" id="nombreSistema" name="nombreSistema" class="form-control">
                                </div>
                                <div class="col col-md-2"></div>
                            </div>

                            <div class="row form-group">
                                <div class="col col-md-2"></div>
                                <div class="col-12 col-md-8">
                                    <label for="iconoSistema" class="form-control-label">Subir icono del sistema</label>
                                    <input type="file" class="form-control-file" id="iconoSistema" name="iconoSistema">
                                </div>
                                <div class="col col-md-2"></div>
                            </div>

                            <div align="center">
                                <a id="btnSaveSistema" name="btnSaveSistema" class="btn btn-lg btn-outline btn-registra mt-4 mb-3" href="#" onclick="saveRegistroSistema()">Guardar</a>
                            </div>
                        </form>
                      </div>
                </div>
            </div>
          </div>
      </div>
  </div>