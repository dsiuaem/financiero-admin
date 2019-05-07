<h3 class="text-center title-2">CAPTURADA NO ENVIADA</h3>

<div class="row">
    <div class="col-lg-9">
    </div>
    <div class="col-lg-2">
	 	<label id="idLectura" style="text-indent: 30px; width: 150px;"></label>
	 	<button id="btnSendSolicitudPago" name="btnSendSolicitudPago" class="btn btn-primary">Enviar Solicitud</button>
    </div>
</div>

<form align="center" id="lecturaSolicitudPagoForm" name="lecturaSolicitudPagoForm" method="POST" enctype="multipart/form-data">
	<table>
	<tr>
		<td>
			<h2>DATOS DEL SOLICITANTE</h2><br>
		</td>
	</tr>
	<tr>
		<td style="width: 50%;">
			<label>TIPO DE TRAMITE:</label>
		</td>
		<td style="width: 50%;" colspan="2">
			<label id="tipoTramiteLectura" name="tipoTramiteLectura"></label>
		</td>
	</tr>
	<tr>
		<td>
			<label>UNIDAD ACADEMICA:</label>
		</td>
		<td colspan="2">
			<label id="unidadAcademicaLectura" name="unidadAcademicaLectura"></label>
		</td>
	</tr>
	<tr>
		<td>
			<label>TIPO RECURSO:</label>
		</td>
		<td colspan="2">
			<label id="tipoRecursoLectura" name="tipoRecursoLectura"></label>
		</td>
	</tr>
	<tr>
		<td><br><br><br>
			<h2>SOLICITUD DE PAGO</h2><br>
		</td>
		<td colspan="3"><br><br><br>
			<h5>(GASTOS A COMPROBAR O RECUPERACIÓN DE GASTOS)</h5>
		</td>
	</tr>
	<tr>
		<td>
			<label>IMPORTE $:</label>
		</td>
		<td colspan="2">
			<label id="importeLectura" name="importeLectura"></label>
		</td>
	</tr>
	<tr>
		<td>
			<label>CONCEPTO:</label>
		</td>
		<td>
			<label id="conceptoLectura" name="conceptoLectura"></label>
		</td>
	</tr>
	<tr>
		<td>
			<label>TIPO DE GASTO</label>
		</td>
		<td>
			<label id="tipoGastoLectura" name="tipoGastoLectura"></label>
		</td>
	</tr>
	<tr>
		<td><br><br><br><br>
			<h2>ARCHIVOS ADJUNTOS</h2>
		</td>
	</tr><br><br>
	</table><br>
	<div id="listFilesLectura">
	</div>
</form>