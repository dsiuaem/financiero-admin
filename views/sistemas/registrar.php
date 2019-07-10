<!-- <div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Registro de sistemas</h5></div>
            </div>
        </div>
    </div>
</div>

<div class="card-body card-block">
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
                <input type="file" id="iconoSistema" name="iconoSistema" class="form-control">
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div align="center">
            <button id="btnSaveSistema" name="btnSaveSistema" class="btn btn-primary">Guardar</button>
        </div>
    </form>
</div> -->

  <div class="card-header" style="background-color: #142f5a !important">
    <h5 class="card-title" style="text-align: center; color: white;">Registro de sistemas</h5>
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
            <button id="btnSaveSistema" name="btnSaveSistema" class="btn btn-lg btn-outline btn-registra" role="button">Guardar</button>
        </div>
    </form>
  </div>
