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

        <div class="modal fade" id="modalAddPerfil" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="z-indexi: 1300;" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                        <h4 class="modal-title w-100 font-weight-bold" style="color: white;">Editar perfil</h4>
                        <button style="color: white;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mx-3" style=" max-height: calc(100vh - 210px); overflow-y: auto;">
                        <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8">
                                <div name="modulospo" id="modulospo">

                                </div>
                            </div>
                            <div class="col col-md-2"></div>
                        </div>

                    </div>
                    <div class="modal-footer">
                           <button type="button" style="" id="" name="" data-dismiss="modal" class="btn btn-danger">
                               <i class="fa fa-times"></i> Cerrar
                            </button>
                    </div>

                </div>
            </div>
        </div>

        <div class="container">
             <center>
                 <a href="#" class="btn btn-info opcsPerfil" data-toggle="modal" data-target="#modalAddPerfil">Ver opciones</a>
             </center>
        </div>
        <hr>
        <div align="center">
            <button id="btnSavePerfil" name="btnSavePerfil" class="btn btn-primary">Guardar</button>
        </div>

    </form>
</div>
