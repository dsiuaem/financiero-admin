<div class="content" id="idTablaAvisos">
      <div class="container-fluid">
          <div class="row justify-content-center mt-5">
              <div class="col-md-11">
                  <div class="card">
                    <div class="card-header px-3 py-4" style="background-color: #142f5a !important;">
                        <h3 style="text-align: center; color: white;"><strong>REGISTRO DE AVISOS</strong></h3>
                    </div>
                    <div class="card-body"><br>
                        <form id="registroAviso" name="registroAviso" method="POST" enctype="multipart/form-data">
                          <div class="row form-group">
                              <div class="col col-md-2"></div>
                              <div class="col-12 col-md-8 text-center">
                                  <label for="tituloAviso" class="form-control-label">Título del aviso</label>
                                  <input type="text" name="tituloAviso" class="form-control tituloAviso">
                                  <input type="hidden" name="idAviso" class="form-control idAviso">
                              </div>
                              <div class="col col-md-2"></div>
                          </div>
                          <div class="row form-group">
                              <div class="col col-md-2"></div>
                              <div class="col-12 col-md-8 text-center">
                                  <label for="aviso" class="form-control-label">Aviso</label>
                                  <textarea name="aviso" rows="2" placeholder="" class="form-control aviso"></textarea>
                              </div>
                              <div class="col col-md-2"></div>
                          </div>
                          <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8 text-center">
                              <label for="systemName" class="form-control-label">Sistemas para los cuales estará disponible el aviso</label>
                              <select name="systemName" class="form-control systemName" multiple="multiple"></select>
                            </div>
                            <div class="col col-md-2"></div>
                          </div>
                          <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8 text-center">
                              <label for="text-input" class="form-control-label">Empleado solicitante</label>
                              <select class="form-control-sm form-control selectEmpleado" name="selectEmpleado"></select>
                              <label for="text-input" class=" form-control-label mr-2">Seleccionar casilla para mostrar el nombre del empleado en el aviso</label>
                              <input type="checkbox" name="mostrarEmpleado" class="mostrarEmpleado flat-red" title="Marcar para mostrar en el aviso nombre del solicitante">
                            </div>
                            <div class="col col-md-2"></div>
                          </div>
                          <div class="divNivelSuperior row form-group" style="display: none;">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8 text-center">
                              <label for="selectSm" class="form-control-label">Secretaría o Coordinación</label>
                              <p class="secretariaLabel"></p>
                            </div>
                            <div class="col col-md-2"></div>
                          </div>
                          <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8 text-center">
                              <label for="text-input" class="form-control-label">Fecha de caducidad</label>
                              <input type="text" data-date-format='yyyy-mm-dd' name="fecha" class="form-control datepicker fecha" value="" autocomplete="off">
                            </div>
                            <div class="col col-md-2"></div>
                          </div>
                          <div align="center">
                            <a id="btnSaveAviso" name="btnSaveAviso" class="btn btn-primary btnSaveAviso btn-outline-cambiar mr-3 mt-3 mb-2" href="#" onclick="nuevoAviso()">Guardar</a>
                            <a id="btnUpdateAviso" name="btnUpdateAviso" class="btn btn-primary btnUpdateAviso mr-3 mt-3 mb-2" href="#" onclick="confirmarActualizarAviso()" style="display:none;">Actualizar</a>
                            <a id="btnRegresar" name="btnRegresar" class="btn btn-primary btnRegresar btn-outline-danger mt-3 mb-2" href="#" onclick="regresar()" >Regresar</a>
                            <!-- <button type="submit" name="btn-btnSaveAviso" class="btn btn-lg btn-outline btn-btnSaveAviso">Guardar</button> -->
                          </div>
                      </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>