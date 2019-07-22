<div class="small-box " style="text-align: left;">
    <div class="inner">
        <div><p style="font-weight:bold"><h5 style="display: inline-block;">Nueva requisición de bienes /
                materiales</h5> </p></div>
    </div>
</div>
<form id="registroDatosSolicitanteForm" name="registroDatosSolicitanteForm" method="POST" enctype="multipart/form-data">
    <div class="form-group">
        <div class="col col-md-8 offset-md-2">
            <h3 style="display: inline-block;">Datos del solicitante</h3><br>
            <label for="input" class=" form-control-label">Requisición</label><br>
            <label>
                <input type="radio" name="tipo_requisicion" class="flat-red" checked>
                Requisición de compra de bienes/materiales
            </label>
            <label>
                <input type="radio" name="tipo_requisicion" class="flat-red">
                Requisición de compra de acervo bibliográfico
            </label>
            <label>
                <input type="radio" name="tipo_requisicion" class="flat-red">
                Requisición de contratación de servicios
            </label>
        </div>
    </div>

    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <label for="selectSm" class=" form-control-label">Unidad Academica</label>
            <select name="selectUnidadAcademica" id="selectUnidadAcademica" class="form-control-sm form-control">
                <option value="">Selecciona una opción</option>
                <option selected value="1">Unidad Academica</option>
            </select>
        </div>
        <div class="col col-md-2"></div>
    </div>

    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <label for="selectSm" class=" form-control-label">Director</label>
            <select name="selectDirector" id="selectDirector" class="form-control-sm form-control">
                <option value="">Selecciona una opción</option>
                <option selected value="1">Director</option>
            </select>
        </div>
        <div class="col col-md-2"></div>
    </div>

    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-2 col-md-auto">
            <label for="text-input" class=" form-control-label">Fecha</label>

            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="labelFecha"><i class="fa fa-calendar"></i></span>
                </div>
                <input id="fechaRequisicion" class="form-control" type="date" name="fechaRequisicion">
            </div>
        </div>
        <div class="col col-md-2"></div>
    </div>
    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <label for="textarea-input" class=" form-control-label">Observaciones</label>
            <textarea id="observaciones_solicitante" name="observaciones_solicitante" rows="2"
                      placeholder="Observaciones" class="form-control"></textarea>
        </div>
        <div class="col col-md-2"></div>
    </div>

    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <label for="selectSm" class=" form-control-label">Direccion del solicitante</label>
            <select name="selectDireccionSolicitante" id="selectDireccionSolicitante"
                    class="form-control-sm form-control">
                <option value="">Selecciona una opción</option>
                <option selected value="1">op1</option>
            </select>
        </div>
        <div class="col col-md-2"></div>
    </div>

    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <label for="selectSm" class=" form-control-label">Autorización de presupuesto</label>
            <select name="selectAutorizacionPresupuesto" id="selectAutorizacionPresupuesto"
                    class="form-control-sm form-control">
                <option value="">Selecciona una opción</option>
                <option selected value="1">op1</option>
            </select>
        </div>
        <div class="col col-md-2"></div>
    </div>

    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <label for="selectSm" class=" form-control-label">VoBo 1</label>
            <select name="" id="" class="form-control-sm form-control">
                <option value="">Selecciona una opción</option>
                <option selected value="1">op1</option>
            </select>
        </div>
        <div class="col col-md-2"></div>
    </div>

    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <label for="selectSm" class=" form-control-label">Vobo 1 </label>
            <select name="" id="" class="form-control-sm form-control">
                <option value="">Selecciona una opción</option>
                <option selected value="1">op1</option>
            </select>
        </div>
        <div class="col col-md-2"></div>
    </div>

    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <label for="textarea-input" class=" form-control-label">Notas</label>
            <textarea id="notas" name="notas" rows="5" placeholder="Notas" class="form-control"></textarea>
        </div>
        <div class="col col-md-2"></div>
    </div>

    <!-- botones colores -->
    <div class="row form-group">
        <div class="col-12 col-md-6 offset-md-2">
            <button type="submit" class="btn btn-primary btn-sm azul" id="btnSaveOficio" name="crear">
                <i class="fa fa-check"></i> Guardar
            </button>
            <button type="reset" class="btn btn-danger btn-sm">
                <i class="fa fa-ban"></i> Cancelar
            </button>
            <button id="btnsig" class="btn btn-success btn-sm btn-sts aqua">
                <i class="fa fa-share"></i> Siguiente
            </button>
        </div>
    </div>

</form>
<!-- fin botones colores -->
