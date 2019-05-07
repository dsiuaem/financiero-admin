<div>
<form id="registroEmpleadoForm" align="center">
	<br/>
	<b><h2>PRUEBA DE REGISTRO</h2></b><br><br><br><br>
	<input type="text" name="nombre" placeholder="NOMBRE" require><br><br>
	<input type="number"name="edad" placeholder="EDAD"><br><br>
	<input type="number"name="salario" placeholder="SALARIO"><br><br>
	<input type="password" name="contra" placeholder="CONTRASEÑA"><br><br>
	<input type="date" name="fechaN"><br><br>
	<select name="departamento" >
		<option value="" selected disabled>SELECCIONA UN DEPARTAMENTO</option>
		<option value="RH">RECURSOS HUMANOS</option>
		<option value="CON">CONTADURIA</option>
	</select><br><br>
	<select name="area" >
		<option value="" selected disabled>SELECCIONA UN AREA</option>
		<option value="asistente">ASISTENTE</option>
		<option value="secretario">SECRETARIO/A</option>
	</select><br><br>
	<input type="radio" name="sexo" value="hombre">HOMBRE
	<input type="radio" name="sexo" value="mujer">MUJER
	<br><br>
	<input type="checkbox" name="registro">REGISTRO
	<input type="checkbox" name="actualizar">ACTUALIZAR
	<input type="checkbox" name="eliminar">ELIMINAR
	<br><br>
	<textarea name="comentario" placeholder="COMENTARIOS"></textarea><p></p><p></p>
	<button id="btnSaveEmpleados" name="btnSaveEmpleados">Guardar empleado</button>
</form>
</div>