<div class="card-header">
    <strong>Nueva solicitud de pago</strong>
</div>
<div class="card-body card-block">
    <form id="registroSolicitudPagoForm" name="registroSolicitudPagoForm" method="POST" enctype="multipart/form-data">
        <!-- 				<div class="row form-group">
                            <div class="col col-md-2"></div>
                            <div class="col-12 col-md-8">
                                <label id="tipoTramite" style="display: none">Solicitud de Pago</label>
                            </div>
                            <div class="col col-md-2"></div> -->
        <!-- 
                            <div class="col-12 col-md-9">
                                <input type="text" name="tipoTramite" id="tipoTramite" value="Solicitud de Pago" class="form-control" hidden>
                            </div> -->
        <!-- </div> -->
        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="unidadAcademica" class=" form-control-label">Unidad académica</label>
                <input type="text" id="unidadAcademica" name="unidadAcademica" class="form-control" disabled>

            </div>
            <div class="col col-md-2"></div>
            <!-- <div class="col-12 col-md-9">
                <label id="unidadAcademicaLabel"></label>
                <input type="text" name="unidadAcademica" id="unidadAcademica" class="form-control" hidden>
            </div> -->
        </div>
        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="listRecurso" class=" form-control-label">Tipo de recurso</label>
                <div id="listRecurso"></div>
            </div>
            <div class="col col-md-2"></div>
        </div>
        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label id="textoSubfondo" for="listSubRecurso" style="display: none;" class="form-control-label">Subfondo</label>
                <label id="textoCuentaBancaria" for="listSubRecurso" style="display: none;" class="form-control-label">Cuenta
                    Bancaria</label>
                <div id="listSubRecurso" style="display: none;"></div>
            </div>
            <div class="col col-md-2"></div>
        </div>
        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="listTipoBeneficiarios" class=" form-control-label">Beneficiario</label>
                <div id="listTipoBeneficiarios"></div>
            </div>
            <div class="col col-md-2"></div>
        </div>
        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label id="textoBeneficiario" for="listBeneficiarios" style="display: none;" class="form-control-label">Nombre
                    beneficiario</label>
                <div id="listBeneficiarios" style="display: none;"></div>
            </div>
            <div class="col col-md-2"></div>
        </div>
        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="importe" class="form-control-label">Importe total</label>
                <input type="text" name="importe" id="importe" placeholder="$" class="form-control" required>
            </div>
            <div class="col col-md-2"></div>
        </div>
        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="concepto" class="form-control-label">Concepto general</label>
                <textarea name="concepto" id="concepto" placeholder="Concepto" class="form-control"></textarea>
            </div>
            <div class="col col-md-2"></div>
        </div>
        <div class="row form-group">
            <div class="col col-md-2"></div>
            <div class="col-12 col-md-8">
                <label for="listGasto" class="form-control-label">Tipo de gasto</label>
                <div id="listGasto"></div>
            </div>
            <div class="col col-md-2"></div>
        </div>
        <!-- 
        <div class="row form-group">
            <div class="col col-md-3">
                <label>TIPO DE RECURSO</label>
            </div>
            <div class="col-12 col-md-9">
                <div id="listRecurso"></div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label id="textoSubfondo" style="display: none;">SUBFONDO</label>
                <label id="textoCuentaBancaria" style="display: none;">CUENTA BANCARIA</label>
            </div>
            <div class="col-12 col-md-9">
                <label id="listSubRecurso" style="display: none;"></label>
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label>BENEFICIARIO</label>
            </div>
            <div class="col-12 col-md-9">
                <div id="listTipoBeneficiarios"></div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label id="textoBeneficiario" style="display: none;">NOMBRE BENEFICIARIO</label>
            </div>
            <div class="col-12 col-md-9">
                <label id="listBeneficiarios" style="display: none;"></label>
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label>IMPORTE TOTAL $</label>
            </div>
            <div class="col-12 col-md-9">
                <input type="text" name="importe" id="importe" placeholder="IMPORTE" class="form-control" required>
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label>CONCEPTO GENERAL</label>
            </div>
            <div class="col-12 col-md-9">
                <textarea name="concepto" id="concepto" placeholder="CONCEPTO" class="form-control"></textarea>
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label>TIPO DE GASTO</label>
            </div>
            <div class="col-12 col-md-9">
                <div id="listGasto"></div>
            </div>
        </div> -->
</div>
<div align="center">
    <button id="btnSaveSolicitudPago" name="btnSaveSolicitudPago" class="btn btn-primary">Guardar Solicitud</button>
</div>
</form>
