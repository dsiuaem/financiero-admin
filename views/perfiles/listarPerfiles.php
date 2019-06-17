<div class="row">
    <div class="col-12 col-md-12">
        <div class="small-box bg-info" style="text-align: right;">
            <div class="inner">
                <div><h5 style="text-align: left;">Listado de perfiles</h5></div>
            </div>
        </div>
    </div>
</div>

<div class="row form-group">
    <div class="col col-md-2"></div>
    <div class="col-12 col-md-8">
        <label for="systemNameTable" class="form-control-label">Seleccionar sistema: </label>
        <select name="systemNameTable" id="systemNameTable" class="form-control">
            <option value="0">- Seleccionar -</option>
        </select>
    </div>
    <div class="col col-md-2"></div>
</div>

<div class="card-body card-block">
    <div class="form-group">
        <!-- Ejemplo de implementacion de datatable con procesamiento del lado del servidor -->
        <table class="table table-striped table-bordered dt-responsive nowrap" id="tableListadoPerfiles" width="100%"
               cellspacing="0">
            <thead>
            <tr>
                <th>Acciones</th>
                <th></th>
                <th>Perfiles registrados</th>
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

<!-- MODAL AGREGAR XML -->
<div class="modal fade" id="modalEditarPerfil" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     style="z-index: 1300;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold" style="color: white;">Editar perfil</h4>
                <button style="color: white;" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body mx-3">

                <form id="formPerfilEdit" name="formPerfilEdit" method="POST" enctype="multipart/form-data">
                    
                    <input type="text" name="perfil" class="form-control perfil">
                        <input type="hidden" name="idPerfilEdit" id="idPerfilEdit" class="idPerfilEdit">
                        <div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8">
                                <div name="modulospoEditar" id="modulospoEditar">

                                </div>
                                <div name="submodulosEditar" id="submodulosEditar">

                                </div>
                                <div name="opcionesEditar" id="opcionesEditar">

                                </div>
                                <div name="tipoOpcionesEditar" id="tipoOpcionesEditar">

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

                        <div class="modal-footer">
                        <button type="button" id="btnUpdatePerfil" name="btnUpdatePerfil" class="btn btn-primary azul" data-dismiss="modal" onclick="editarPerfilOpciones()">
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

