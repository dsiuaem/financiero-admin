        <div class="card-header">
            <strong>EN PROCESO DE CAPTURA</strong>
        </div>
	    <div class="row">
	    	<div class="col-lg-9">
	    	</div>
	    	<div class="col-lg-3">
				<label id="Folio" style="text-indent: 30px; width: 150px;"></label>
				<input type="text" name="id" id="id" style="width: 100px;" hidden>
				<button id="btnUpdateSolicitudPago" name="btnUpdateSolicitudPago" class="btn btn-primary">Finalizar Captura</button>
	    	</div>
		</div>
	    <div class="card-body card-block">
	    	<ul class="nav nav-tabs" id="myTab" role="tablist">
				<li class="nav-item">
					<a class="nav-link active" id="datosGenerales-tab" data-toggle="tab" href="#datosGenerales" role="tab" aria-controls="datosGenerales" aria-selected="true">Datos Generales</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="facturas-tab-tab" data-toggle="tab" href="#facturas" role="tab" aria-controls="facturas" aria-selected="false">Facturas</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="otrosArchivos-tab-tab" data-toggle="tab" href="#otrosArchivos" role="tab" aria-controls="otrosArchivos" aria-selected="false">Anexos</a>
				</li>
			</ul>
			<div class="tab-content pl-3 p-1" id="myTabContent">
				<div class="tab-pane fade show active" id="datosGenerales" role="tabpanel" aria-labelledby="datosGenerales-tab">
					<div class="col-lg-12">
						<form class="form-horizontal" id="modificaSolicitudPagoForm" name="modificaSolicitudPagoForm" method="POST" enctype="multipart/form-data">
							<div class="row form-group">
								<div class="col col-md-12">
									<input type="text" name="idSolicitud" id="idSolicitud" style="width: 100px;" class="form-control" hidden>
									<label id="tipoTramiteModificaLabel" name="tipoTramiteModificaLabel" style="display: none">Solicitud de Pago</label>
									<input type="text" name="tipoTramiteModifica" id="tipoTramiteModifica" value="Solicitud de Pago" hidden>
								</div>
							</div>
							<div class="row form-group">
								<div class="col col-md-3">
									<label>UNIDAD ACADEMICA</label>
								</div>
								<div class="col-12 col-md-9">
									<label id="unidadAcademicaModificaLabel"></label>
									<input type="text" name="unidadAcademicaModifica" id="unidadAcademicaModifica" hidden>
								</div>
							</div>
							<div class="row form-group">
								<div class="col col-md-3">
									<label>TIPO RECURSO</label>
								</div>
								<div class="col-12 col-md-9">
									<div id="listRecursoModifica"></div>
								</div>
							</div>
							<div class="row form-group">
								<div class="col col-md-3">
									<label id="textoSubfondoModifica" style="display: none;">SUBFONDO</label>
									<label id="textoCuentaBancariaModifica" style="display: none;">CUENTA BANCARIA</label>
								</div>
								<div class="col-12 col-md-9">
									<div id="listSubRecursoModifica"></div>
								</div>
							</div>
							<div class="row form-group">
								<div class="col col-md-3">
									<label>TIPO BENEFICIARIO</label>
								</div>
								<div class="col-12 col-md-9">
									<div id="listTipoBeneficiariosModifica"></div>
								</div>
							</div>
							<div class="row form-group">
								<div class="col col-md-3">
									<label>NOMBRE BENEFICIARIO</label>
								</div>
								<div class="col-12 col-md-9">
									<div id="listBeneficiariosModifica"></div>
								</div>
							</div>
							<div class="row form-group">
								<div class="col col-md-3">
									<label>IMPORTE $</label>
								</div>
								<div class="col-12 col-md-9">
									<input type="text" name="importeModifica" id="importeModifica" placeholder="IMPORTE" class="form-control">
								</div>
							</div>
							<div class="row form-group">
								<div class="col col-md-3">
									<label>CONCEPTO</label>
								</div>
								<div class="col-12 col-md-9">
									<textarea name="conceptoModifica" id="conceptoModifica" placeholder="CONCEPTO" class="form-control"></textarea>
								</div>
							</div>
							<div class="row form-group">
								<div class="col col-md-3">
									<label>TIPO DE GASTO</label>
								</div>
								<div class="col-12 col-md-9">
									<div id="listGastoModifica"></div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="tab-pane fade" id="facturas" role="tabpanel" aria-labelledby="facturas-tab">
					<br><button id="ocultarCerrar" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#modalArchivos">AGREGAR FACTURA</button><br><br>
					<div class="col-md-12">
                        <div class="card border border-secondary">
                            <div class="card-header">
                                <div class="row">
                                	<div class="col col-md-3 pt-2">
                                		<strong>Factura 1</strong>
                                	</div>
                                	<div class="col col-md-7">
                                	</div>
                                	<div class="col col-md-2">
                                		<p align="right"><button type="button" class="btn btn-info btn-outline-secondary" data-toggle="modal" data-target="#modalDetalles">CONCEPTOS</button></p>
                                	</div>
                                </div>
                            </div>
                            <div class="card-body">
                            	AQUI VAN LOS DETALLES DE LA FACTURA XML
                            </div>
                            <div class="card-footer">
                            	<div class="col-md-12">
                        			<div class="row">
                        				<div class="col col-md-6">
                        					<div class="col-md-12">
                        						<div class="row">
                        							<div class="input-group-addon">XML</div>
                        							<div class="col col-md-5">
                        								<label>NOMBRE XML</label>
                        							</div>
                        							<div class="col col-md-4">
                        								<p align="center"><button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#modalXML">Agregar XML</button></p>
                        								<p align="center"><button type="button" class="btn btn-danger">Eliminar</button></p>
                        							</div>
                        							<div class="col col-md-1"></div>
                        						</div>
                        					</div>
                        				</div>
                        				<div class="col col-md-6">
                        					<div class="col-md-12">
                        						<div class="row">
                        							<div class="col col-md-1"></div>
                        							<div class="input-group-addon">PDF</div>
                        							<div class="col col-md-5">
                        								<label>Nombre PDF</label>
                        							</div>
                        							<div class="col col-md-4">
                        								<p align="center"><button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#modalPDF">Agregar PDF</button></p>
                        								<p align="center"><button type="button" class="btn btn-danger">Eliminar</button></p>
                        							</div>
                        						</div>
                        					</div>
                        				</div>
                        			</div>
                        		</div>
                            </div>
                        </div>
                    </div>
					<div id="listFacturas"></div>
				</div>
				<div class="tab-pane fade" id="otrosArchivos" role="tabpanel" aria-labelledby="otrosArchivos-tab">
					<div class="col-lg-12">
						<form align="center" id="filesForm" name="filesForm" method="POST" enctype="multipart/form-data">
							<br><div class="row form-group">
								<div class="col col-md-6">
									<input type="file" id="archivo" name="archivo" class="form-control" accept=".png, .jpeg, .pdf, .docx" />
								</div>
								<div class="col col-md-4">
									<div id="listFileType"></div>
								</div>
								<div class="col col-md-2">
									<button id="saveFile" name="saveFile" class="btn btn-primary">Agregar</button>
								</div>
							</div><br>
							<div id="listFiles"></div>
						</form>
					</div>
				</div>
			</div>
	    </div>