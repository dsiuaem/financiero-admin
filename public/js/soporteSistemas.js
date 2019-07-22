$(document).ready(function () {
  alertify.set('notifier', 'position', 'top-right');

  $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    checkboxClass: 'icheckbox_flat-blue',
    radioClass   : 'iradio_flat-blue'
  });

  $('.datepicker').datepicker({
      language: 'es',
      autoclose: true
  });
  $( ".fecha" ).datepicker({dateFormat:"yy/mm/dd"}).datepicker("setDate",new Date());

  //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
  $('#registroAviso').validate({
     rules: {
       tituloAviso: "required",
       aviso: "required",
       systemName: "required",
       selectEmpleado: "required",
       fecha: "required"
     },
      messages: {
       tituloAviso: "El campo Título del aviso es requerido",
       aviso: "El campo Aviso es requerido",
       systemName: "El campo Sistema es requerido",
       selectEmpleado: "El campo Empleado solicitante es requerido",
       fecha: "El campo fecha es requerido"
      }
   });

  $('#registroPreguntas').validate({
    rules: {
      pregunta: "required",
      respuesta: "required",
      systemName: "required"
    },
     messages: {
      pregunta: "El campo Pregunta del aviso es requerido",
      respuesta: "El campo Respuesta es requerido",
      systemName: "El campo Sistema es requerido"
     }
  });

  $('.selectEmpleado').change(function(){
		if(this.value != null){
			if(this.value != ""){
				if(empleadoSeleccionado != this.value){
					empleadoSeleccionado = this.value;
          cargarEmpleado(empleadoSeleccionado);
				}
			}
		}
  });

  $("select[class$='selectEmpleado']").select2({
		placeholder: 'Selecciona empleado',
		width: '100%',
		minimumInputLength: 3,
		ajax: {
			url: 'SoporteSistemas/getAllTodosEmpleadosSelect',
			dataType: 'json',
			data: function (params) {
				var query = {
					search: params.term,
					page: params.page || 1,
				}
				return query;
			}
		}
	});

  // $(".btnRegresar").click(function(e) {
  //   redireccionarVista(1);
  // });

});

var empleadoSeleccionado = 0;
//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarVista(optionMenu) {
    // alert(optionMenu);
    resetForm();
    $('#listadoSistemas').show();
    $('.contenedor').hide();
    $('#listado').show();
    $('#idTablaSistemas').show();
    switch (optionMenu) {
        case 1:
            tablaSistemas("SoporteSistemas/obtenerAvisos","Aviso");
            break;
        case 2:
            tablaSistemas("SoporteSistemas/obtenerPreguntasFrecuentes","Pregunta");
            break;
        default:
            //alert("default");
            break;
    }
    return false;
}

//  ------------------------------------- AVISOS--------------------------------
var listaAvisos;
var dataPregunta;
function tablaAvisos(id){
    // $.ajax({
    //   url: 'SoporteSistemas/obtenerAvisos',
    //   type: 'POST',
    //   data: {idSystem: id},
    //   success: function (response) {
    //     console.log(response);
    //   }
    // });

    listaAvisos = $('#tablaAvisos').DataTable({
    destroy: true,
    ajax: {
      url: "SoporteSistemas/obtenerAvisos",
      type: 'POST',
      data: {idSystem:id},
      dataSrc: "",
    },
    select :{
      style: 'multi'
    },
    dom: "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    buttons: [
        {
            text: 'Restablecer',
            className:'btn btn-custom btn-rounded btn-outline-warning mb-4 buttonDt',
            action: function () {
                listaAvisos.rows().deselect();
            }
        },
        ,
        {
            text: 'Eliminar seleccionados',
            className:'btn btn-custom btn-rounded btn-outline-danger mb-4 buttonDt ml-4',
            action: function () {
                //eliminarGrupo();
            }
        },
        {
            text: 'Agregar Aviso',
            className:'btn btn-custom btn-rounded btn-outline-primary mb-4 buttonDt ml-4',
            action: function () {
                vistaAvisos(0,0);
            }
        }
    ],
    columns: [
      {
        data: "idAviso",
        render: function ( data, type, row, meta ) {
          return '<button title="Eliminar" class="btn btn-outline-danger btn-sm btn-rounded btn-custom ml-3 btn-eliminar-aviso"><i class="fas fa-trash"></i></button>'+
                 '<button title="Editar" class="btn btn-outline-success btn-sm btn-rounded btn-custom ml-3 btn-edit-aviso"><i class="fas fa-edit"></i></button>';
          },
          className: "text-center"
     },
     {data: "tituloAviso"},
     {data: "aviso"},
     {data: "sistemas"},
     {data: null,
      render: function ( data, type, row, meta ) {
        if (data.activo==1) {
          return "Activo";
        }else {
          return 'Deshabilitado';
        }
       },
       className: "text-center"
      }
    ],
    language: {
        "url":     "public/plugins/DataTables/Spanish.json",
    }
	});
  $('#tablaAvisos tbody').off('click', 'button.btn-edit-aviso').on( 'click', 'button.btn-edit-aviso', function () {
      var data = listaAvisos.row( this.closest('tr') ).data();
      vistaAvisos(2,data);
  });
  $('#tablaAvisos tbody').off('click', 'button.btn-eliminar-aviso').on( 'click', 'button.btn-eliminar-aviso', function () {
      var data = listaAvisos.row( this.closest('tr') ).data();
      confirmarEliminarAviso(data.idAviso);
  });
}

function vistaAvisos(vista,data){
  resetForm();
  switch(vista){
    case 0:
      showSystems();
      $('#listadoAviso').hide();
      $('#avisoForm').show();
      $('#estatusAviso').hide();
      $('.btnUpdateAviso').hide();
      $('.btnSaveAviso').show();
      $("select[name$='systemName']").prop('multiple',true);
    break;
    case 1:
      $('#avisos').show();
      tablaAvisos(data.idSystem);
      $('#listadoAviso').show();
      $('#idTablaAvisos').show();
      $('#avisoForm').hide();
    break;
    case 2:
      showSystems();
      $('#listadoAviso').hide();
      $('#avisoForm').show();
      $('.idAviso').val(data.idAviso);
      $('.lastSystem').val(data.idSystem);
      $('.tituloAviso').val(data.tituloAviso);
      $('.aviso').val(data.aviso);
      $("select[name$='systemName']").prop('multiple',true);

      option = new Option(data.nombre, data.idEmpleado, true, true);
      $("select[name$='selectEmpleado']").append(option).trigger('change');
      $(".divNivelSuperior").show();
      $('.secretariaLabel').html(data.unidad);
      $('.btnSaveAviso').hide();
      $('.btnUpdateAviso').show();
      $('#estatusAviso').show();
      if(data.identificaSolicitante == 1){
				$('input[class$="mostrarEmpleado"]').attr('checked', true);
				$('input[type="checkbox"].flat-red.mostrarEmpleado').iCheck('check');
			}
      if(data.activo == 1){
				$('input[class$="mostrarAviso"]').attr('checked', true);
				$('input[type="checkbox"].flat-red.mostrarAviso').iCheck('check');
			}
      var sistemas = (data.sistemas).split(',');
      var idSistemas = (data.idSistemas).split(',');
      for (var i = 0; i < idSistemas.length; i++) {
        var option = new Option(sistemas[i], idSistemas[i], true, true);
        $("select[name$='systemName']").append(option).trigger('change');
      }
    break;
  }
}

function nuevoAviso(){
  if($('form[id="registroAviso"]').valid()){
    var texto = $('#registroAviso').serializeArray();
    var data = {};
    $(texto ).each(function(index, obj){
      if (data[obj.name]!=undefined) {
          data[obj.name] += ","+obj.value;
      }else{
          data[obj.name] = obj.value;
      }
    });
    console.log(data);
    //return false;
    $.ajax({
        url: 'SoporteSistemas/registrarAviso',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                resetForm();
                alertify.success("Registro exitoso");
            } else {
                alertify.error("Error al registrar aviso");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para registrar el sistema");
        }
    });
  }
}

function actualizarAviso(){
  if($('form[id="registroAviso"]').valid()){
    var texto = $('#registroAviso').serializeArray();
    var data = {};
    $(texto ).each(function(index, obj){
      if (data[obj.name]!=undefined) {
          data[obj.name] += ","+obj.value;
      }else{
          data[obj.name] = obj.value;
      }
    });
    console.log(data);
    //return false;
    $.ajax({
        url: 'SoporteSistemas/actualizarAviso',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                alertify.success("Registro actualizado");
            } else {
                alertify.error("Error al actualizar aviso");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para actualizar el sistema");
        }
    });
  }
}

function confirmarEliminarAviso(idAviso){
  alertify.confirm("¿Deseas eliminar el registro seleccionado?",
  function(){
		eliminarAviso(idAviso);
  },
  function(){
    //alertify.warning('Cancelado');
  });
}

function eliminarAviso(idAviso){
  console.log(idAviso);
	$.ajax({
		url: 'SoporteSistemas/eliminarAviso',
		type: 'POST',
		data: {idAviso: idAviso},
		success: function (response) {
			alertify.success("Registro borrado");
			listaAvisos.ajax.reload();
		}
  });
}

function regresar(){
  redireccionarVista(1);
}
// ------------------------------- END AVISO -----------------------------------


// ------------------------------- PREGUNTAS FRECUENTES ------------------------


var listaSistemas;
function tablaSistemas(url,tipo){
    listaSistemas = $('#tablaSistemas').DataTable({
    destroy: true,
    ajax: {
      url: url,
      type: 'POST',
      data: {idSystem:0},
      dataSrc: "",
    },
    select :{
      style: 'multi'
    },
    dom: "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    buttons: [
        {
            text: 'Agregar '+tipo,
            className:'btn btn-custom btn-rounded btn-outline-primary mb-4 buttonDt ml-4',
            action: function () {
              if(tipo=="Pregunta"){
                vistaPreguntas(0,0);
              }
              if(tipo=="Aviso"){
                vistaAvisos(0,0);
              }
            }
        }
    ],
    columns: [
      {
        data: "idSystem",
        render: function ( data, type, row, meta ) {
          return '<button title="Ver" class="btn btn-outline-info btn-sm btn-rounded btn-custom ml-3 btn-ver-sistema"><i class="fas fa-eye"></i></button>';
          },
          className: "text-center"
     },
     {data: "name"},
     {data: "total"}
    ],
    language: {
        "url":     "public/plugins/DataTables/Spanish.json",
    }
	});
  $('#tablaSistemas tbody').off('click', 'button.btn-ver-sistema').on( 'click', 'button.btn-ver-sistema', function () {
      var data = listaSistemas.row( this.closest('tr') ).data();
      if(tipo=="Pregunta"){
        vistaPreguntas(1,data);
      }
      if(tipo=="Aviso"){
        vistaAvisos(1,data);
      }
  });
}

var listaPreguntas;
function tablaPreguntas(id){
    listaPreguntas = $('#tablaPreguntas').DataTable({
    destroy: true,
    ajax: {
      url: "SoporteSistemas/obtenerPreguntasFrecuentes",
      type: 'POST',
      data: {idSystem:id},
      dataSrc: "",
    },
    select :{
      style: 'multi'
    },
    dom: "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    buttons: [
        {
            text: 'Restablecer',
            className:'btn btn-custom btn-rounded btn-outline-warning mb-4 buttonDt',
            action: function () {
                listaPreguntas.rows().deselect();
            }
        },
        ,
        {
            text: 'Eliminar seleccionados',
            className:'btn btn-custom btn-rounded btn-outline-danger mb-4 buttonDt ml-4',
            action: function () {
                //eliminarGrupo();
            }
        },
        {
            text: 'Agregar Pregunta',
            className:'btn btn-custom btn-rounded btn-outline-primary mb-4 buttonDt ml-4',
            action: function () {
                vistaPreguntas(0,0);
            }
        }
    ],
    columns: [
      {
        data: "idPregunta",
        render: function ( data, type, row, meta ) {
          return '<button title="Eliminar" class="btn btn-outline-danger btn-sm btn-rounded btn-custom ml-3 btn-eliminar-pregunta"><i class="fas fa-trash"></i></button>'+
                 '<button title="Ver" class="btn btn-outline-info btn-sm btn-rounded btn-custom ml-3 btn-edit-pregunta"><i class="fas fa-eye"></i></button>';
          },
          className: "text-center"
     },
     {data: "pregunta"},
     {data: "respuesta"},
     {data: "name"},
     {data: null,
      render: function ( data, type, row, meta ) {
        if (data.activo==1) {
          return "Activo";
        }else {
          return 'Deshabilitado';
        }
       },
       className: "text-center"
      }
    ],
    language: {
        "url":     "public/plugins/DataTables/Spanish.json",
    }
	});
  $('#tablaPreguntas tbody').off('click', 'button.btn-edit-pregunta').on( 'click', 'button.btn-edit-pregunta', function () {
      var data = listaPreguntas.row( this.closest('tr') ).data();
      vistaPreguntas(2,data);
      dataPregunta = data;
  });
  $('#tablaPreguntas tbody').off('click', 'button.btn-eliminar-pregunta').on( 'click', 'button.btn-eliminar-pregunta', function () {
      var data = listaPreguntas.row( this.closest('tr') ).data();
      confirmarEliminarPregunta(data.idPregunta);
  });
}

function vistaPreguntas(vista,data){
  resetForm();
  switch(vista){
    case 0:
      showSystems();
      $('#listadoPreguntas').hide();
      $('#preguntasFrecuentesForm').show();
      $('#estatusPregunta').hide();
      $('.btnUpdatePregunta').hide();
      $('.btnSavePregunta').show();
      $("select[name$='systemName']").prop('multiple',false);
    break;
    case 1:
      $('#preguntasFrecuentes').show();
      tablaPreguntas(data.idSystem);
      $('#idTablaPreguntas').show();
      $('#listadoPreguntas').show();
      $('#preguntasFrecuentesForm').hide();
    break;
    case 2:
      showSystems();
      $('#idTablaPreguntas').hide();
      $('#preguntasFrecuentesForm').show();
      $('#estatusPregunta').show();
      $('.btnUpdatePregunta').show();
      $('.btnSavePregunta').hide();
      $('.btnPreguntaCancel').show();
      $("select[name$='systemName']").prop('multiple',false);
      $('.idPregunta').val(data.idPregunta);
      $('.pregunta').val(data.pregunta);
      $('.respuesta').val(data.respuesta);
      var option = new Option(data.name, data.idSystem, true, true);
      $("select[name$='systemName']").append(option).trigger('change');
      $('#estatusPregunta').show();
      if(data.activo == 1){
				$('input[class$="mostrarPregunta"]').attr('checked', true);
				$('input[type="checkbox"].flat-red.mostrarPregunta').iCheck('check');
			}
    break;
  }
}

function nuevaPregunta(){
  if($('form[id="registroPreguntas"]').valid()){
    var texto = $('#registroPreguntas').serializeArray();
    var data = {};
    $(texto ).each(function(index, obj){
      if (data[obj.name]!=undefined) {
          data[obj.name] += ","+obj.value;
      }else{
          data[obj.name] = obj.value;
      }
    });
    console.log(data);
    //return false;
    $.ajax({
        url: 'SoporteSistemas/registrarPreguntaFrecuente',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                alertify.success("Registro exitoso");
            } else {
                alertify.error("Error al registrar aviso");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para registrar el sistema");
        }
    });
  }
}

function actualizarPregunta(){
  if($('form[id="registroPreguntas"]').valid()){
    var texto = $('#registroPreguntas').serializeArray();
    var data = {};
    $(texto ).each(function(index, obj){
      if (data[obj.name]!=undefined) {
          data[obj.name] += ","+obj.value;
      }else{
          data[obj.name] = obj.value;
      }
    });
    console.log(data);
    //return false;
    $.ajax({
        url: 'SoporteSistemas/actualizarPreguntaFrecuente',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                alertify.success("Registro actualizado");
            } else {
                alertify.error("Error al actualizar pregunta");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para actualizar la pregunta");
        }
    });
  }
}

function confirmarEliminarPregunta(idPregunta){
  alertify.confirm("¿Deseas eliminar el registro seleccionado?",
  function(){
		eliminarPregunta(idPregunta);
  },
  function(){
    //alertify.warning('Cancelado');
  });
}

function eliminarPregunta(idPregunta){
	$.ajax({
			url: 'SoporteSistemas/eliminarPreguntaFrecuente',
			type: 'POST',
			data: {idPregunta: idPregunta},
			success: function (response) {
				alertify.success("Registro borrado");
				listaPreguntas.ajax.reload();
			}
		});
}


function cancelarPregunta(){
  vistaPreguntas(1,dataPregunta);
}

// ------------------------------- END PREGUNTAS -------------------------------

function showSystems() {
    $.ajax({
        url: 'SoporteSistemas/systemListSelect',
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            var systems = jQuery.parseJSON(response.soporteSistemasDTO);
            var $dropdown = $("select[name$='systemName']");
            for (var i = systems.length - 1; i >= 0; i--) {
              if($("select[name$='systemName']").val()!=systems[i].idSystem){
                $dropdown.append($("<option />").val(systems[i].idSystem).text(systems[i].name));
              }
            }
            $dropdown.select2();
        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });
    return false;
}

//Función para vaciar formularios depués de cada acción
function resetForm() {
    $('#registroAviso')[0].reset();
    $('#registroPreguntas')[0].reset();
    $("select[name$='systemName']").empty();
    $('select[name$="selectEmpleado"]').val(null).trigger('change');
    $("select[name$='selectEmpleado']").empty();
    $( ".fecha" ).datepicker({dateFormat:"yy/mm/dd"}).datepicker("setDate",new Date());
    ocultarElementos();
}

function ocultarElementos(){
  //$('#listadoSistemas').hide();
  $('#idTablaSistemas').hide();
  $('#idTablaPreguntas').hide();
  $('.divNivelSuperior').hide();
}

function cargarEmpleado(idEmpleado){
	$.ajax({
		type: "POST",
		async: false,
		data: { idEmpleado: idEmpleado },
		url: 'SoporteSistemas/getEmpleadoNiveles',
		success: function(response) {
			var datos = jQuery.parseJSON(response);
			var nivel = jQuery.parseJSON(datos.soporteSistemasDTO);
			if(nivel.length>0){
				cargarNiveles(nivel, idEmpleado);
			}
    },
		error: function() {
			alert("Error");
		}
	});
}

function cargarNiveles(nivel, idEmpleado){
	if(nivel.length>0){
		// muestra informacion de remitente
		$(".divNivelSuperior").show();
		if(nivel[0].unidad4){
			$('.secretariaLabel').html(nivel[0].unidad4);
		}else if(nivel[0].unidad3){
			$('.secretariaLabel').html(nivel[0].unidad3);
			}else if(nivel[0].unidad2){
				$('.secretariaLabel').html(nivel[0].unidad2);
				}else if(nivel[0].unidad1){
					$('.secretariaLabel').html(nivel[0].unidad1);
				}else{
					$('.secretariaLabel').html(nivel[0].unidad0);
				}
	}else{
		//alertify.warning("El usuario no esta asociado a una unidad administrativa o académica. Consulte con el administrador del sistema");
	}
}
