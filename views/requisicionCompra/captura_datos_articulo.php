<div class="small-box bg-info" style="text-align: left;">
    <div class="inner">
        <div><p style="font-weight:bold"><h5 style="display: inline-block;">Nueva requisición de bienes /
                materiales</h5> </p></div>
    </div>
</div>
<div class="form-group">
    <div class="col col-md-8 offset-md-2">
        <h3 style="display: inline-block;">Datos artículos</h3><br>
    </div>
</div>

<form id="registroDatosArticuloForm" name="registroDatosArticuloForm" method="POST" enctype="multipart/form-data">
    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <h5 style="display: inline-block;">Catálog de articulos (búsqueda inicial)</h5><br>
            <label for="selectSm" class=" form-control-label">Artículo</label>
            <select name="selectArticulo" id="selectArticulo" class="form-control-sm form-control">
                <option value="">buscar...</option>
                <option value="1">op1</option>
            </select>
            <br>
            <input id="descripcionArticuloServicio" name="descripcionArticuloServicio" rows="1"
                   placeholder="Descripcion artículo/servicio" class="form-control">
        </div>
        <div class="col col-md-2"></div>
    </div>


    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <label for="selectSm" class=" form-control-label">Cuenta</label>
            <select name="selectCuenta" id="selectCuenta" class="form-control-sm form-control">
                <option value="">buscar...</option>
                <option value="1">op1</option>
            </select>
            <br>
            <input id="descripcionCuenta" name="descripcionCuenta" rows="1" placeholder="Descripcion cuenta"
                   class="form-control">
        </div>
        <div class="col col-md-2"></div>
    </div>

    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <label for="selectSm" class=" form-control-label">Familia</label>
            <select name="selectFamilia" id="selectFamilia" class="form-control-sm form-control">
                <option value="">buscar...</option>
                <option value="1">op1</option>
            </select>
            <br>
            <input type="text" id="descripcionFamilia" name="descripcionFamilia" rows="1"
                   placeholder="Descripcion familia" class="form-control">
        </div>
        <div class="col col-md-2"></div>
    </div>

    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-4">
            <label for="selectSm" class=" form-control-label">Código UPC</label>
            <input type="text" id="codigoUPC" name="codigoUPC" rows="1" placeholder="Código UPC" class="form-control">

        </div>
        <div class="col-12 col-md-4">
            <label for="selectSm" class=" form-control-label">Procedencias (Nac/Extran)</label>

            <input type="text" id="procedencias" name="procedencias" rows="1" placeholder="Procedencias (Nac/Extran)"
                   class="form-control">
        </div>
        <div class="col col-md-2"></div>
    </div>


    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <h5 style="display: inline-block;">Artículo datos iniciales</h5><br>
        </div>
    </div>
    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-4">
            <label for="selectSm" class=" form-control-label">Código artículo/servicio</label>
            <input type="text" id="codigoArticulo" name="codigoArticulo" rows="1" placeholder="Código UPC"
                   class="form-control">
            <label for="selectSm" class=" form-control-label">Descripción SAT</label>
            <input type="text" id="descripcionSAT" name="descripcionSAT" rows="1" placeholder="Descripción SAT"
                   class="form-control">
            <label for="selectSm" class=" form-control-label">Descripción Requisición</label>
            <input type="text" id="descripcionRequisicion" name="descripcionRequisicion" rows="1"
                   placeholder="Descripción Requisición" class="form-control">
            <label for="selectSm" class=" form-control-label"> Código UPC</label>
            <input type="text" id="codigoUPC_2" name="codigoUPC_2" rows="1" placeholder=" Código UPC"
                   class="form-control">
            <label for="selectSm" class=" form-control-label"> Observaciones</label>
            <input type="text" id="observaciones" name="observaciones" rows="1" placeholder=" Observaciones"
                   class="form-control">

        </div>

        <div class="col-12 col-md-4">
            <label for="selectSm" class=" form-control-label">Familia</label>
            <input type="text" id="familia" name="familia" rows="1" placeholder="Familia" class="form-control">
            <label for="selectSm" class=" form-control-label">Unidad de medida</label>
            <input type="text" id="unidadMedida" name="unidadMedida" rows="1" placeholder="Unidad de medida"
                   class="form-control">

            <div class="row form-group">
                <div class="col-12 col-md-6">
                    <label for="selectSm" class=" form-control-label">Procedencia (Nac/Extran)</label>
                    <input type="text" id="procedenciaNacExtran" name="procedenciaNacExtran" rows="1"
                           placeholder="Procedencia (Nac/Extran)" class="form-control">
                    <label for="selectSm" class=" form-control-label">Modelo</label>
                    <input type="text" id="modelo" name="modelo" rows="1" placeholder="Modelo" class="form-control">
                    <label for="selectSm" class=" form-control-label">Medidas</label>
                    <input type="text" id="medidas" name="medidas" rows="1" placeholder="Medidas" class="form-control">

                </div>
                <div class="col-12 col-md-6">
                    <label for="selectSm" class=" form-control-label">Activo Menor(SI/NO)</label>
                    <input type="text" id="activoMenor" name="activoMenor" rows="1" placeholder="Activo Menor(SI/NO)"
                           class="form-control">
                    <label for="selectSm" class=" form-control-label">Color</label>
                    <input type="text" id="color" name="color" rows="1" placeholder="Color" class="form-control">
                </div>
            </div>
        </div>
    </div>


    <div class="row form-group">
        <div class="col col-md-2"></div>
        <div class="col-12 col-md-8">
            <h5 style="display: inline-block;">Artículo datos generales</h5><br>
        </div>
    </div>
    <div class="row form-group">
        <div class="col col-md-2"></div>

        <div class="col-8 col-md-2">
            <label for="selectSm" class=" form-control-label">Cuenta contable</label>
            <input type="text" id="cuentaContable" name="cuentaContable" rows="1" placeholder="Cuenta contable"
                   class="form-control">
            <label for="selectSm" class=" form-control-label">Negosiable </label>
            <input type="text" id="negosiable" name="negosiable" rows="1" placeholder="Si/No" class="form-control">
            <label for="selectSm" class=" form-control-label">Flete </label>
            <input type="text" id="flete" name="flete" rows="1" placeholder="Si/No" class="form-control">

        </div>
        <div class="col-8 col-md-2">
            <label for="selectSm" class=" form-control-label">Subcuenta contable</label>
            <input type="text" id="subcuentaContable" name="subcuentaContable" rows="1" placeholder="Subcuenta contable"
                   class="form-control">
            <label for="selectSm" class=" form-control-label">Compra mínima</label>
            <input type="text" id="compraMinima" name="compraMinima" rows="1" placeholder="Compra mínima"
                   class="form-control">
            <label for="selectSm" class=" form-control-label">Maniobras</label>
            <input type="text" id="maniobras" name="maniobras" rows="1" placeholder="Si/No" class="form-control">

        </div>
        <div class="col-8 col-md-2">
            <label for="selectSm" class=" form-control-label">COG</label>
            <input type="text" id="cog" name="cog" rows="1" placeholder="COG" class="form-control">
            <label for="selectSm" class=" form-control-label">Precio promedio$</label>
            <input type="number" id="precioPromedio" name="precioPromedio" rows="1" placeholder="$"
                   class="form-control">
            <label for="selectSm" class=" form-control-label">Agente aduanal </label>
            <input type="text" id="agenteAduanal" name="agenteAduanal" rows="1" placeholder="Si/No"
                   class="form-control">

        </div>
        <div class="col-8 col-md-2">
            <label for="selectSm" class=" form-control-label">Indicador IVA</label>
            <input type="text" id="indicadorIVA" name="indicadorIVA" rows="1" placeholder="Indicador IVA"
                   class="form-control">
            <label for="selectSm" class=" form-control-label">Proveedor</label>
            <input type="text" id="proveedor" name="proveedor" rows="1" placeholder="Proveedor" class="form-control">
            <label for="selectSm" class=" form-control-label">Pedimento </label>
            <input type="text" id="pedimento" name="pedimento" rows="1" placeholder="Si/No" class="form-control">

        </div>


    </div>


    <!-- botones colores -->
    <div class="row form-group">
        <div class="col-12 col-md-6 offset-md-2">
            <button type="submit" class="btn btn-primary btn-sm azul" id="btnSaveOficio" name="crear">
                <i class="fa fa-floppy-o"></i> Guardar
            </button>
            <button type="reset" class="btn btn-danger btn-sm">
                <i class="fa fa-ban"></i> Cancelar
            </button>
            <button class="btn btn-success btn-sm btn-sm azul">
                <i class="fa fa-check"></i> Finalizar
            </button>
        </div>
    </div>
    <!-- fin botones colores -->
</form>
