<div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Listado de usuarios</h5></div>
            </div>
        </div>
    </div>
</div>

<div class="card-body card-block">
    <form id="listadoUsuarios" name="listadoUsuarios" method="POST" enctype="multipart/form-data">

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

        <div class="card-body card-block">
            <div class="form-group">
                <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
                <table class="table table-striped table-bordered dt-responsive nowrap" id="listadoAsignacionPerfiles"
                       width="100%"
                       cellspacing="0">
                    <thead>
                    <tr>
                        <th>Usuarios del sistema</th>
                        <th>Perfil asignado</th>
                        <th>Editar</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div align="center">
            <button id="btnSaveUserPerfil" name="btnSaveUserPerfil" class="btn btn-primary">Guardar</button>
        </div>
    </form>
</div>
