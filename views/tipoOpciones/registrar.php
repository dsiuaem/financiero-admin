<!-- <div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Registro de tipo opción</h5></div>
            </div>
        </div>
    </div>
</div> -->
<div class="card-header" style="background-color: #142f5a !important">
    <h5 class="card-title" style="text-align: center; color: white;">Registro de tipo opción</h5>
</div>
<div class="card-body">
    <form id="registroTipoOpciones" name="registroTipoOpciones" method="POST" enctype="multipart/form-data">

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="systemName" class="form-control-label">Listado de sistemas:</label>
                <select name="systemName" id="systemName" class="form-control">
                    <option value="0">- Seleccionar -</option>
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="moduleName" class="form-control-label">Listado de módulos:</label>
                <select name="moduleName" id="moduleName" class="form-control">
                    <option value="0">- Seleccionar -</option>
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="submoduleName" class="form-control-label">Listado de submodulos:</label>
                <select name="submoduleName" id="submoduleName" class="form-control">
                    <option value="0">- Seleccionar -</option>
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="optionName" class="form-control-label">Listado de opciones:</label>
                <select name="optionName" id="optionName" class="form-control">
                    <option value="0">- Seleccionar -</option>
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="nameTypeOption" class="form-control-label">Agregar nombre de tipo opción: </label>
                <input type="text" id="nameTypeOption" name="nameTypeOption" class="form-control">
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="description" class="form-control-label">Tipo: </label>
                <label class="container">Estatus
                  <input type="checkbox" id="typeOne" name="typeOne" value="1" onclick="checkOne()">
                  <span class="checkmark"></span>
                </label>

                <label class="container">Otra
                  <input type="checkbox" id="typeTwo" name="typeTwo" value="2" onclick="checkTwo()">
                  <span class="checkmark"></span>
                </label>
                <!-- <input type="checkbox" id="typeOne" name="typeOne" value="1" onclick="checkOne()"> 1
                <input type="checkbox" id="typeTwo" name="typeTwo" value="2" onclick="checkTwo()"> 2 -->
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div align="center">
            <button id="btnSaveTypeOption" name="btnSaveTypeOption" class="btn btn-lg btn-outline btn-registra">Guardar</button>
        </div>
    </form>
</div>
