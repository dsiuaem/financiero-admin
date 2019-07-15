<div class="card-header" style="background-color: #142f5a !important">
  <h5 class="card-title" style="text-align: center; color: white;">Registro de avisos</h5>
</div>
<div class="card-body">
  <form id="registroAviso" name="registroAviso" method="POST" enctype="multipart/form-data">
      <div class="row form-group">
          <div class="col col-md-2"></div>
          <div class="col-12 col-md-8">
              <label for="tituloAviso" class="form-control-label">Título del aviso</label>
              <input type="text" name="tituloAviso" class="form-control tituloAviso">
          </div>
          <div class="col col-md-2"></div>
      </div>
      <div class="row form-group">
          <div class="col col-md-2"></div>
          <div class="col-12 col-md-8">
              <label for="aviso" class="form-control-label">Aviso</label>
              <textarea name="aviso" rows="3" placeholder="" class="form-control aviso"></textarea>
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
        <a id="btnSaveAviso" name="btnSaveAviso" class="btn btn-primary" href="#" onclick="nuevoAviso()">Guardar</a>
        <!-- <button type="submit" name="btn-btnSaveAviso" class="btn btn-lg btn-outline btn-btnSaveAviso">Guardar</button> -->
      </div>
  </form>
</div>
