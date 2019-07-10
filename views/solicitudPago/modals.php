<div class="modal fade" id="modalArchivos" tabindex="-1" role="dialog" aria-labelledby="scrollmodalLabel"
     aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="scrollmodalLabel">AGREGAR FACTURA</h5>
            </div>
            <div class="modal-body" id="cuerpoModal">
                <div id="alertModal" style="display: none;"
                     class="sufee-alert alert with-close alert-danger alert-dismissible fade show">
                    No se seleccióno uno o ambos archivos.
                    <button id="ocultar" type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="modalSolicitudPagoForm" name="modalSolicitudPagoForm" method="POST"
                      enctype="multipart/form-data">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="far fa-file"></i> PDF</div>
                        <input type="file" name="modalFilePDF" id="modalFilePDF" class="form-control" accept=".pdf">
                    </div>
                    <br>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="far fa-file"></i> XML</div>
                        <input type="file" name="modalFileXML" id="modalFileXML" class="form-control" accept=".xml">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
                <button type="button" class="btn btn-primary" id="registraFactura" data-dismiss="modal">REGISTRAR
                    FACTURA
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalDetalles" tabindex="-1" role="dialog" aria-labelledby="scrollmodalLabel"
     aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="scrollmodalLabel">Conceptos</h5>
            </div>
            <div class="modal-body" id="cuerpoModal">
                <div id="alertModalConceptos" style="display: none;"
                     class="sufee-alert alert with-close alert-danger alert-dismissible fade show">
                    Los campos no pueden estar vacios.
                    <button id="ocultar" type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="modalSolicitudPagoForm" name="modalSolicitudPagoForm" method="POST"
                      enctype="multipart/form-data">
                    CONCEPTO DE FACTURA
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">ACTUALIZAR CONCEPTOS</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalXML" tabindex="-1" role="dialog" aria-labelledby="scrollmodalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document" data-backdrop="static" data-keyboard="false">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="scrollmodalLabel">Conceptos</h5>
            </div>
            <div class="modal-body" id="cuerpoModal">
                <div id="alertModalXML" style="display: none;"
                     class="sufee-alert alert with-close alert-danger alert-dismissible fade show">
                    El campo no puede estar vacio.
                    <button id="ocultar" type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="modalFormXML" name="modalFormXML" method="POST" enctype="multipart/form-data">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="far fa-file"></i> XML</div>
                        <input type="file" name="modalFileXML" id="modalFileXML" class="form-control" accept=".xml">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">AGREGAR XML</button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="modalPDF" tabindex="-1" role="dialog" aria-labelledby="scrollmodalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document" data-backdrop="static" data-keyboard="false">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="scrollmodalLabel">Conceptos</h5>
            </div>
            <div class="modal-body" id="cuerpoModal">
                <div id="alertModalPDF" style="display: none;"
                     class="sufee-alert alert with-close alert-danger alert-dismissible fade show">
                    El campo no puede estar vacio.
                    <button id="ocultar" type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="modalFormPDF" name="modalFormPDF" method="POST" enctype="multipart/form-data">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="far fa-file"></i> PDF</div>
                        <input type="file" name="modalFilePDF" id="modalFilePDF" class="form-control" accept=".pdf">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">AGREGAR PDF</button>
            </div>
        </div>
    </div>
</div>

<!-- <div id="alertModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body sufee-alert alert with-close alert-dark alert-dismissible fade show">
                <p></p><br>
                <button class="btn btn-default" style="float: right;" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>-->