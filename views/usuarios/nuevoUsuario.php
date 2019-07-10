<!-- <div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Registro de usuarios</h5></div>
            </div>
        </div>
    </div>
</div> -->
<div class="card-header" style="background-color: #142f5a !important">
    <h5 class="card-title" style="text-align: center; color: white;">Registro de usuarios</h5>
</div>
<div class="card-body">
    <form id="registroUsuarios" name="registroUsuarios" method="POST" enctype="multipart/form-data">

        <!--<div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="systemNameNewUser" class="form-control-label">Listado de sistemas:</label>
                <select name="systemNameNewUser" id="systemNameNewUser" class="form-control">
                    <option value="0">- Seleccionar -</option>
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>-->

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="userTypeNewUser" class="form-control-label">Selecciona tipo de usuario: </label>
                <select name="userTypeNewUser" id="userTypeNewUser" class="form-control">
                    <option value="0">- Seleccionar -</option>
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="empleadoNewUser" class="form-control-label">Selecciona el nombre: </label>
                <select name="empleadoNewUser" id="empleadoNewUser" class="form-control">
                </select>
            </div>
            <div class="col col-md-2"></div>
        </div>


        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="userName" class="form-control-label">Correo del usuario:</label>
                <input type="email" id="userNameR" name="userNameR" class="form-control" disabled="">
                <input type="hidden" id="userName" name="userName" >
            </div>
            <div class="col col-md-2"></div>
        </div>


        <!--
        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="userEmail" class="form-control-label">Correo electrónico:</label>
                <input type="email" id="userEmail" name="userEmail" class="form-control">
            </div>
            <div class="col col-md-2"></div>
        </div>
        -->

        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="userPass" class="form-control-label">Contraseña:</label>
                <input type="password" id="userPass" name="userPass" class="form-control">
            </div>
            <div class="col col-md-2"></div>
        </div>

        <div align="center">
            <!-- <button id="btnSaveUser" name="btnSaveUser" class="btn btn-primary">Guardar</button> -->
            <button id="btnSaveUser" name="btnSaveUser" class="btn btn-lg btn-outline btn-registra" role="button">Guardar</button>
        </div>
    </form>
</div>
