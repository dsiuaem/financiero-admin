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
              <input type="hidden" name="idAviso" class="form-control idAviso">
          </div>
          <div class="col col-md-2"></div>
      </div>
      <div class="row form-group">
          <div class="col col-md-2"></div>
          <div class="col-12 col-md-8">
              <label for="aviso" class="form-control-label">Aviso</label>
              <textarea name="aviso" rows="2" placeholder="" class="form-control aviso"></textarea>
          </div>
          <div class="col col-md-2"></div>
      </div>
      <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
          <label for="systemName" class="form-control-label">Selecciona sistema</label>
          <select name="systemName" class="form-control systemName" multiple="multiple"></select>
          <input type="hidden" name="lastSystem" class="form-control lastSystem">
        </div>
        <div class="col col-md-2"></div>
      </div>
      <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
          <label for="text-input" class="form-control-label">Empleado solicitante</label>
          <select class="form-control-sm form-control selectEmpleado" name="selectEmpleado"></select>
          <label for="text-input" class=" form-control-label mr-2">Mostrar empleado solicitante en el aviso</label>
          <input type="checkbox" name="mostrarEmpleado" class="mostrarEmpleado flat-red" title="Marcar para mostrar en el aviso nombre del solicitante">
        </div>
        <div class="col col-md-2"></div>
      </div>
      <div class="divNivelSuperior row form-group" style="display: none;">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
          <label for="selectSm" class="form-control-label">Secretaría o Coordinación</label>
          <p class="secretariaLabel"></p>
        </div>
        <div class="col col-md-2"></div>
      </div>
      <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-6">
          <label for="text-input" class="form-control-label">Fecha de caducidad</label>
          <input type="text" data-date-format='yyyy-mm-dd' name="fecha" class="form-control datepicker fecha" value="" autocomplete="off">
        </div>
        <div class="col col-md-2"></div>
      </div>
      <div id="estatusAviso" class="row form-group" style="display:none">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
          <label for="text-input" class=" form-control-label mr-2">Cambiar estatus del aviso para todos los sistemas seleccionados</label>
          <input type="checkbox" name="mostrarAviso" class="mostrarAviso flat-red" title="Marcar para mostrar el aviso">
        </div>
        <div class="col col-md-2"></div>
      </div>
      <div align="center">
        <a id="btnSaveAviso" name="btnSaveAviso" class="btn btn-primary btnSaveAviso" href="#" onclick="nuevoAviso()">Guardar</a>
        <a id="btnUpdateAviso" name="btnUpdateAviso" class="btn btn-primary btnUpdateAviso" href="#" onclick="actualizarAviso()" style="display:none;">Actualizar</a>
        <a id="btnRegresar" name="btnRegresar" class="btn btn-primary btnRegresar" href="#" onclick="regresar()" >Regresar</a>
        <!-- <button type="submit" name="btn-btnSaveAviso" class="btn btn-lg btn-outline btn-btnSaveAviso">Guardar</button> -->
      </div>
  </form>
</div>
