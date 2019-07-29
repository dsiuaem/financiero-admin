<div class="modal fade" id="modalEditarPerfil" tabindex="-1" role="dialog" aria-labelledby="scrollmodalLabel"
     aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="scrollmodalLabel">Editar perfil</h5>
            </div>
            <div class="modal-body" id="cuerpoModal" style=" max-height: calc(100vh - 210px); overflow-y: auto;">
                    <form method="POST" action="#" id="formPerfilEdit">
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
                    </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="editarPerfilOpciones()">Editar</button>
                <button type="button" class="btn btn-primary" id="registraFactura" data-dismiss="modal">Cancelar
                </button>
            </div>
        </div>
    </div>
</div>