<style>
    body {
        padding: 20px;
    }

    ul {
        list-style: none;
        margin: 5px 20px;
    }

    li {
        margin: 10px 0;
    }
</style>
<div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Registro de perfiles</h5></div>
            </div>
        </div>
    </div>
</div>

<div class="card-body card-block">
    <form id="registroPerfiles" name="registroPerfiles" method="POST" enctype="multipart/form-data">

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
                <label for="namePerfil" class="form-control-label">Agregar nombre de perfil: </label>
                <input type="text" id="namePerfil" name="namePerfil" class="form-control">
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <div name="modulospo" id="modulospo">

                </div>
                <div name="submodulos" id="submodulos">

                </div>
                <div name="opciones" id="opciones">

                </div>
                <div name="tipoOpciones" id="tipoOpciones">

                </div>
                <ul>
                    <li name="checkModulos" id="checkModulos">
                        <ul>
                            <li name="checkSubModulos" id="checkSubModulos">
                                <ul>
                                    <li name="checkOpciones" id="checkOpciones">
                                        <ul>
                                            <li name="checkTipoOpciones" id="checkTipoOpciones">

                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div align="center">
            <button id="btnSavePerfil" name="btnSavePerfil" class="btn btn-primary">Guardar</button>
        </div>
    </form>
</div>


<div class="row form-group">
    <div class="col col-md-2"></div>
    <div class="col-12 col-md-8">
        <ul>
            <li>
                <!-- Segundo nivel -->
                <input type="checkbox" name="tall" id="tall">
                <label for="tall">Módulos</label>

                <ul>
                    <li>
                        <!-- Tercer nivel -->
                        <input type="checkbox" name="tall-1" id="tall-1">
                        <label for="tall-1">Submodulos</label>
                    </li>
                    <li>
                        <!-- Tercer nivel -->
                        <input type="checkbox" name="tall-2" id="tall-2">
                        <label for="tall-2">Submodulos</label>

                        <ul>
                            <!-- Cuarto nivel -->
                            <li>
                                <input type="checkbox" name="tall-2-1" id="tall-2-1">
                                <label for="tall-2-1">Opciones</label>
                                <ul>
                                    <!-- Cuarto nivel -->
                                    <li>
                                        <input type="checkbox" name="tall-2-2" id="tall-2-2">
                                        <label for="tall-2-1">Tipo opciones</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="tall-2-2" id="tall-2-2">
                                        <label for="tall-2-1">Tipo opciones2</label>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="col col-md-2"></div>
</div>
