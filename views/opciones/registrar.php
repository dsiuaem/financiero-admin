<div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Registro de opciones</h5></div>
            </div>
        </div>
    </div>
</div>

<div class="card-body card-block">
    <form id="registroOpciones" name="registroOpciones" method="POST" enctype="multipart/form-data">

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
                <label for="moduleName" class="form-control-label">Listado de módulos:</label>
                <select name="moduleName" id="moduleName" class="form-control">
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="submoduleName" class="form-control-label">Listado de submodulos:</label>
                <select name="submoduleName" id="submoduleName" class="form-control">
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="nameOption" class="form-control-label">Agregar nombre de la opción: </label>
                <input type="text" id="nameOption" name="nameOption" class="form-control">
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="description" class="form-control-label">Descripción: </label>
                <textarea name="description" id="description" cols="20" rows="6" class="form-control"></textarea>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div align="center">
            <button id="btnSaveOption" name="btnSaveOption" class="btn btn-primary">Guardar</button>
        </div>
    </form>
</div>
