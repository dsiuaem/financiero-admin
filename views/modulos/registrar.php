<!-- <div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Registro de módulos</h5></div>
            </div>
        </div>
    </div>
</div> -->
<div class="card-header" style="background-color: #142f5a !important">
    <h5 class="card-title" style="text-align: center; color: white;">Registro de módulos</h5>
</div>

<div class="card-body">
    <form id="registroModulos" name="registroModulos" method="POST" enctype="multipart/form-data">

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="systemName" class="form-control-label">Asociar a un sistema:</label>
                <select name="systemName" id="systemName" class="form-control">
                    <option value="0">-- Seleccionar sistema --</option>
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="nameModule" class="form-control-label">Agregar nombre del módulo: </label>
                <input type="text" id="nameModule" name="nameModule" class="form-control">
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="description" class="form-control-label">Descripción: </label>
                <textarea name="description" id="description" cols="30" rows="6" class="form-control"></textarea>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="nameModuleMenu" class="form-control-label">Nombre del módulo del
                                menú (Se utiliza en el menú del sistema para mantener el módulo abierto, este nombre debe ser igual al valor de la variable definida en el controlador): </label>
                <input id="nameModuleMenu" name="nameModuleMenu" type="text" class="form-control">
            </div>
            <div class="col col-md-2"></div>
        </div>

<!--    <div align="center">
            <button id="btnSaveModule" name="btnSaveModule" class="btn btn-primary">Guardar</button>
        </div> -->
        <div align="center">
            <button id="btnSaveModule" name="btnSaveModule" class="btn btn-lg btn-outline btn-registra" role="button">Guardar</button>
        </div>
    </form>
</div>
