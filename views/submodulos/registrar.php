<!-- <div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Registro de submodulos</h5></div>
            </div>
        </div>
    </div>
</div> -->
<div class="card-header" style="background-color: #142f5a !important">
    <h5 class="card-title" style="text-align: center; color: white;">Registro de submódulos</h5>
</div>

<div class="card-body">
    <form id="registroSubmodulos" name="registroSubmodulos" method="POST" enctype="multipart/form-data">

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
                <label for="nameSubmodule" class="form-control-label">Agregar nombre del submódulo: </label>
                <input type="text" id="nameSubmodule" name="nameSubmodule" class="form-control">
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="nameController" class="form-control-label">Nombre del controlador: </label>
                <input type="text" id="nameController" name="nameController" class="form-control">
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div align="center">
            <!-- <button id="btnSaveSubmodule" name="btnSaveSubmodule" class="btn btn-primary">Guardar</button> -->
            <button id="btnSaveSubmodule" name="btnSaveSubmodule" class="btn btn-lg btn-outline btn-registra" role="button">Guardar</button>
        </div>
    </form>
</div>

