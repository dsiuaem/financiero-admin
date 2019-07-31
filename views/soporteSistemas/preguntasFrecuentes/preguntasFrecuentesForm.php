<div class="content">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;" class="titulo"></h3>
                    </div>
                    <div class="card-body"><br>
                        <form id="registroPreguntas" name="registroPreguntas" method="POST" enctype="multipart/form-data">
                          <div class="row form-group">
                              <div class="col col-md-2"></div>
                              <div class="col-12 col-md-8">
                                  <label for="tituloAviso" class="form-control-label">Pregunta</label>
                                  <input type="text" name="pregunta" class="form-control pregunta">
                                  <input type="hidden" name="idPregunta" class="form-control idPregunta">
                              </div>
                              <div class="col col-md-2"></div>
                          </div>
                          <div class="row form-group">
                              <div class="col col-md-2"></div>
                              <div class="col-12 col-md-8">
                                  <label for="aviso" class="form-control-label">Respuesta</label>
                                  <textarea name="respuesta" rows="2" placeholder="" class="form-control respuesta"></textarea>
                              </div>
                              <div class="col col-md-2"></div>
                          </div>
                          <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8">
                              <label for="systemName" class="form-control-label">Selecciona sistema</label>
                              <select name="systemName" class="form-control systemName" multiple="multiple"></select>
                            </div>
                            <div class="col col-md-2"></div>
                          </div>
                          <div align="center">
                            <a id="btnSavePregunta" name="btnSavePregunta" class="btn btn-primary btnSavePregunta btn-outline-cambiar mr-4 mt-2 mb-2" href="#" onclick="nuevaPregunta()">Guardar</a>
                            <a id="btnUpdatePregunta" name="btnUpdatePregunta" class="btn btn-primary btnUpdatePregunta mr-4 mt-2 mb-2" href="#" onclick="confirmarProcesoPregunta()" style="display:none;">Actualizar</a>
                            <a id="btnPreguntaCancel" name="btnPreguntaCancel" class="btn btn-primary btnPreguntaCancel btn-outline-danger mt-2 mb-2" href="#" onclick="cancelarPregunta()">Regresar</a>
                            <!-- <button type="submit" name="btn-btnSaveAviso" class="btn btn-lg btn-outline btn-btnSaveAviso">Guardar</button> -->
                          </div>
                      </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>