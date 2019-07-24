$(document).ready(function () {
  alertify.set('notifier', 'position', 'top-right');
  redireccionarVista(1);
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

  $(".btn_cambiar_orden").click(function(e) {
    var ordenar = 1;
    var texto = $('#ordenListaPreguntas').serializeArray();
    var data = {};
    $(texto ).each(function(index, obj){
      if (data[obj.name]!=undefined) {
          data[obj.name] += ","+obj.value;
      }else{
          data[obj.name] = obj.value;
      }
    });
    var list = data["orden"].split(',');
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result)===-1) {
          result.push(e);
        }else{
          alertify.warning("Verifica el número de orden");
          ordenar = 0;
        }
    });
    if(ordenar==1){
      ordenarPreguntas(data);
    }
  });

});



var empleadoSeleccionado = 0;
//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarVista(optionMenu) {
    // alert(optionMenu);
    resetForm();
    $('.contenedor').hide();
    switch (optionMenu) {
        case 1:
            $('#listadoSistemas').hide();
            $('#avisos').show();
            $('#listadoAviso').show();
            $('#idTablaAvisos').show();
            tablaAvisos(optionMenu);
            break;
        case 2:
            $('#listadoSistemas').show();
            $('#listado').show();
            $('#idTablaSistemas').show();
            tablaSistemas(optionMenu);
            break;
        default:
            //alert("default");
            break;
    }
    return false;
}

//  ------------------------------------- AVISOS--------------------------------
var listaAvisos;
var dataInfo;
function tablaAvisos(id){
    listaAvisos = $('#tablaAvisos').DataTable({
    destroy: true,
    ajax: {
      url: "SoporteSistemas/obtenerAvisos",
      type: 'POST',
      dataSrc: "",
    },
    select :{
      style: 'multi',
    },
    dom: "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    buttons: [
        {
            text: 'Agregar aviso',
            className:'btn btn-custom btn-rounded btn-outline-primary mb-4 buttonDt ml-4',
            action: function () {
                vistaAvisos(0,0);
            }
        }
    ],
    columns: [
      {
        data: null,
        render: function ( data, type, row, meta ) {
          if(data.activo == 1){
            var estado = "checkbox"
          }else{
            var estado = "";
          }
          return '' +
          '<label class="switch switch-text switch-success switch-pill mr-1">' +
          '<input type="'+estado+'" class="switch-input btnEnableSystem" checked="true">' +
          '<span data-on="On" data-off="Off" class="switch-label"></span>' +
          '<span class="switch-handle"></span>\n' +
          '</label> ' +
          '' +
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
     },
     {
       data: "idSistemas",
       visible: false,
     },
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
  $('#tablaAvisos tbody').off('click', 'input.btnEnableSystem').on( 'click', 'input.btnEnableSystem', function () {
      var data = listaAvisos.row( this.closest('tr') ).data();
      if(data.activo==1){
        confirmarDeshabilitarAviso(data.idAviso);
      }else{
        confirmarHabilitarAviso(data.idAviso);
      }
  });
}

function vistaAvisos(vista,data){
  resetForm();
  switch(vista){
    case 0:
      showSystems();
      $('#listadoAviso').hide();
      $('#avisoForm').show();
      $('.btnUpdateAviso').hide();
      $('.btnSaveAviso').show();
      $("select[name$='systemName']").prop('multiple',true);
    break;
    case 1:
      $('#avisos').show();
      tablaAvisos(0);
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

      empleadoSeleccionado = data.idEmpleado;
      option = new Option(data.nombre, data.idEmpleado, true, true);
      $("select[name$='selectEmpleado']").append(option).trigger('change');
      $(".divNivelSuperior").show();
      $('.secretariaLabel').html(data.unidad);
      $('.btnSaveAviso').hide();
      $('.btnUpdateAviso').show();
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
                redireccionarVista(1);
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
                redireccionarVista(1);
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

function confirmarDeshabilitarAviso(idAviso){
  alertify.confirm("¿Deseas deshabilitar los avisos para todos los sistemas?",
  function(){
		eliminarAviso(idAviso);
  },
  function(){
    listaAvisos.ajax.reload();
    //alertify.warning('Cancelado');
  });
}

function confirmarHabilitarAviso(idAviso){
  alertify.confirm("¿Deseas habilitar los avisos para todos los sistemas?",
  function(){
		activarAviso(idAviso);
  },
  function(){
    listaAvisos.ajax.reload();
    //alertify.warning('Cancelado');
  });
}

function eliminarAviso(idAviso){
	$.ajax({
		url: 'SoporteSistemas/eliminarAviso',
		type: 'POST',
		data: {idAviso: idAviso},
		success: function (response) {
			alertify.success("Aviso deshabilitado");
			listaAvisos.ajax.reload();
		}
  });
}

function activarAviso(idAviso){
	$.ajax({
		url: 'SoporteSistemas/activarAviso',
		type: 'POST',
		data: {idAviso: idAviso},
		success: function (response) {
			alertify.success("Aviso habilitado");
			listaAvisos.ajax.reload();
		}
  });
}

function regresar(){
  vistaAvisos(1,dataInfo);
}
// ------------------------------- END AVISO -----------------------------------


// ------------------------------- PREGUNTAS FRECUENTES ------------------------
var listaSistemas;
function tablaSistemas(option){
    // $.ajax({
    //   url: "SoporteSistemas/obtenerPreguntasFrecuentes",
    //   type: 'POST',
    //   data: {idSystem: 0},
    //   success: function (response) {
    //     console.log(response);
    //   }
    // });

    listaSistemas = $('#tablaSistemas').DataTable({
    destroy: true,
    ajax: {
      url: "SoporteSistemas/obtenerPreguntasFrecuentes",
      type: 'POST',
      data: {idSystem:0},
      dataSrc: "",
    },
    select :{
      style: 'multi',
    },
    dom: "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    buttons: [
        {
            text: 'Agregar pregunta',
            className:'btn btn-custom btn-rounded btn-outline-primary mb-4 buttonDt ml-4',
            action: function () {
                dataInfo = 0;
                vistaPreguntas(0,0);
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
      vistaPreguntas(1,data);
      dataInfo = data;
  });
}

var listaPreguntas;
function tablaPreguntas(id){
    // $.ajax({
    //   url: "SoporteSistemas/obtenerPreguntasFrecuentes",
    //   type: 'POST',
    //   data: {idSystem:id},
    //   success: function (response) {
    //     console.log(response);
    //   }
    // });

    listaPreguntas = $('#tablaPreguntas').DataTable({
    destroy: true,
    ajax: {
      url: "SoporteSistemas/obtenerPreguntasFrecuentes",
      type: 'POST',
      data: {idSystem:id},
      dataSrc: "",
    },
    select :{
      style: 'multi',
    },
    dom: "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    buttons: [
        // {
        //     text: 'Restablecer',
        //     className:'btn btn-custom btn-rounded btn-outline-warning mb-4 buttonDt',
        //     action: function () {
        //         listaPreguntas.rows().deselect();
        //     }
        // },
        {
            text: 'Cambiar orden',
            className:'btn btn-custom btn-rounded btn-outline-success mb-4 buttonDt ml-4',
            action: function () {
                listarPreguntas();
                $('#modalOrdenPreguntas').modal('show');
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
     {data: "idPregunta",
      visible: false,
     },
     {data: "pregunta"},
     {data: "orden"},
     {data: null,
      render: function ( data, type, row, meta ) {
        if (data.activo==1) {
          return "Habilitada";
        }else {
          return 'Deshabilitada';
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
      dataInfo = data;
  });
  $('#tablaPreguntas tbody').off('click', 'button.btn-eliminar-pregunta').on( 'click', 'button.btn-eliminar-pregunta', function () {
      var data = listaPreguntas.row( this.closest('tr') ).data();
      confirmarEliminarPregunta(data.idPregunta);
  });
  // $('#tablaPreguntas tbody').off('click', 'button.btn-cambiar-orden').on( 'click', 'button.btn-cambiar-orden', function () {
  //     var data = listaPreguntas.row( this.closest('tr') ).data();
  //     $('.noOrden1').val(data.orden);
  //     $('.pregunta').val(data.pregunta);
  //     $('.idPregunta1').val(data.idPregunta);
  //     $('#modalOrdenPreguntas').modal('show');
  //     dataInfo = data;
  //     listarPreguntas();
  // });
}

function vistaPreguntas(vista,data){
  resetForm();
  switch(vista){
    case 0:
      showSystems();
      $('#listadoPreguntas').hide();
      $('#listadoSistemas').hide();
      $('#preguntasFrecuentes').show();
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
  if(dataInfo == 0){
    redireccionarVista(2);
  }else{
    vistaPreguntas(1,dataInfo);
  }
}

function listarPreguntas() {
  $.ajax({
    url: "SoporteSistemas/obtenerPreguntasFrecuentes",
    type: 'POST',
    data: {idSystem:dataInfo.idSystem},
    success: function (response) {
      var obtener = jQuery.parseJSON(response);
      var html="";
      for (var i = 0; i < obtener.length; i++) {
        html += "<div class='form-group'>";
        html += "<div class='col-md-8 offset-md-2'>";
        html += "<div class='form-row mb-5'>"
        html += "<div class='col-md-10 mt-1'>";
        html += "<label class='form-control-label'>Pregunta</label>";
        html += "<input type='text' class='form-control' name='pregunta' value='"+obtener[i].pregunta+"' disabled>";
        html += "<input type='hidden' class='form-control' name='idPregunta' value='"+obtener[i].idPregunta+"'>";
        html += "</div>";
        html += "<div class='col-md-2 col-sm-12 align-self-end mt-1'>";
        html += "<label for='text-input' class='form-control-label'>Orden</label>";
        html += "<input type='number' max='"+obtener.length+"' name='orden' min='1' class='form-control' value='"+obtener[i].orden+"'>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
      }
      $('.ordenLista').append(html);
    }
  });
  return false;
}

function ordenarPreguntas(data){
  $.ajax({
      url: 'SoporteSistemas/actualizarOrdenPreguntaFrecuente',
      type: 'POST',
      data: ({datos: data}),
      success: function (response) {
          var obj = jQuery.parseJSON(response);
          if (obj.respuesta == 200) {
            $('#modalOrdenPreguntas').modal('hide');
              alertify.success("orden actualizado");
              listaPreguntas.ajax.reload();
          } else {
              alertify.error("Error al actualizar el orden");
          }
      },
      error: function () {
          alertify.error("Error al obtener el servicio para actualizar el orden");
      }
  });
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
