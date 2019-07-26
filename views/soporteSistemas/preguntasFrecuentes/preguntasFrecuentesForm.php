<div class="card-header" style="background-color: #142f5a !important">
  <h5 class="card-title titulo" style="text-align: center; color: white;"></h5>
</div>
<div class="card-body">
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
        <a id="btnSavePregunta" name="btnSavePregunta" class="btn btn-primary btnSavePregunta" href="#" onclick="nuevaPregunta()">Guardar</a>
        <a id="btnUpdatePregunta" name="btnUpdatePregunta" class="btn btn-primary btnUpdatePregunta" href="#" onclick="confirmarProcesoPregunta()" style="display:none;">Actualizar</a>
        <a id="btnPreguntaCancel" name="btnPreguntaCancel" class="btn btn-primary btnPreguntaCancel" href="#" onclick="cancelarPregunta()">Regresar</a>
        <!-- <button type="submit" name="btn-btnSaveAviso" class="btn btn-lg btn-outline btn-btnSaveAviso">Guardar</button> -->
      </div>
  </form>
</div>
