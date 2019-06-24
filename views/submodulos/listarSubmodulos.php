<div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Listado de submodulos</h5></div>
            </div>
        </div>
    </div>
</div>

<div class="row form-group">
    <div class="col col-md-2"></div>
    <div class="col-12 col-md-8">
        <label for="systemNameTable" class="form-control-label">Seleccionar sistema: </label>
        <select name="systemNameTable" id="systemNameTable" class="form-control">
        </select>
    </div>
    <div class="col col-md-2"></div>
</div>

<div class="row form-group">
    <div class="col col-md-2"></div>
    <div class="col-12 col-md-8">
        <label for="moduleNameTable" class="form-control-label">Seleccionar módulo: </label>
        <select name="moduleNameTable" id="moduleNameTable" class="form-control">
        </select>
    </div>
    <div class="col col-md-2"></div>
</div>

<div class="card-body card-block tableSubModulosSystem">
    <div class="form-group">
        <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
        <table class="table table-striped table-bordered dt-responsive nowrap" id="tableSubmodulos" width="100%"
               cellspacing="0">
            <thead>
              <tr>
                  <th>Editar</th>
                  <th></th>
                  <th>Submodulos registrados</th>
                  <th>Controlador</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
            <tfoot>
            
            </tfoot>
        </table>
    </div>
</div>

<!-- MODAL AGREGAR XML -->
<div class="modal fade" id="modalEditarSubModulo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     style="z-index: 1300;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: white;">Editar submodulo</h4>
                <button style="color: white;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body mx-3">

                <form id="actualizacionSubModulos" name="actualizacionSubModulos" method="POST"
                      enctype="multipart/form-data">

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateNameSubmodule" class="form-control-label">Agregar nombre del
                                submodulo: </label>
                            <input type="text" id="updateNameSubmodule" name="updateNameSubmodule" class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-2"></div>
                        <div class="col-12 col-md-8">
                            <label for="updateNameController" class="form-control-label">Nombre del
                                controlador: </label>
                            <input type="text" id="updateNameController" name="updateNameController"
                                   class="form-control">
                        </div>
                        <div class="col col-md-2"></div>
                    </div>

                    <input type="hidden" id="idSubModuleUpdate" name="idSubModuleUpdate">

                    <div class="modal-footer">
                        <button id="btnUpdateSubModule" name="btnUpdateSubModule" class="btn btn-primary azul">
                            <i class="fa fa-save"></i> Actualizar datos
                        </button>
                        <button type="button" style="" id="" name="" data-dismiss="modal" class="btn btn-danger">
                            <i class="fa fa-times"></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
<!-- FIN MODAL AGREGAR XML -->
