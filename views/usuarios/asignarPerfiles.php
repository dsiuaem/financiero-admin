<div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Asignación de perfiles</h5></div>
            </div>
        </div>
    </div>
</div>

<div class="card-body card-block">
    <form id="asignarPerfiles" name="asignarPerfiles" method="POST" enctype="multipart/form-data">

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="systemNameAsignarPerfil" class="form-control-label">Listado de sistemas:</label>
                <select name="systemNameAsignarPerfil" id="systemNameAsignarPerfil" class="form-control">
                    <option value="0">- Seleccionar -</option>
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="perfilUser" class="form-control-label">Selecciona un perfil para el / los
                    usuario(s): </label>
                <select name="perfilUser" id="perfilUser" class="form-control">
                    <option value="0">- Seleccionar -</option>
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="card-body card-block">
            <div class="form-group">
                <label for="">Usuarios sin el perfil seleccionado asignado</label>
                <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                <table class="table table-striped table-bordered dt-responsive nowrap"
                       id="tableListadoAsignacionPerfiles"
                       width="100%"
                       cellspacing="0">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Nombre de usuario</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div class="card-body card-block">
            <div class="form-group">
                <label for="">Usuarios con el perfil seleccionado asignado</label>
                <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                <table class="table table-striped table-bordered dt-responsive nowrap"
                       id="tableListadoAsignacionPerfilesExistentes"
                       width="100%"
                       cellspacing="0">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Nombre de usuario</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <!--
        <div align="center">
            <button id="btnSaveUserPerfil" name="btnSaveUserPerfil" class="btn btn-primary">Guardar</button>
        </div>
        -->

    </form>
</div>
