$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');
    $('#avisos').hide();

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('#registroAviso').validate({
       rules: {
         tituloAviso: "required",
         aviso: "required",
         systemName: "required"
       },
        messages: {
         tituloAviso: "El campo Título del aviso es requerido",
         aviso: "El campo Aviso es requerido",
         systemName: "El campo Sistema es requerido"
        }
     });


    // $(".btn-btnSaveAviso").click(function(e) {
    //   if($('form[id="registroAviso"]').valid()){
    //     nuevoAviso();
    //   }
		// });

});


//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarVista(optionMenu) {
    // alert(optionMenu);
    switch (optionMenu) {
        case 1:
            tablaAvisos(optionMenu)
            $('.contenedorAviso').hide();
            $('#avisos').show();
            $('#listado').show();
            break;
        case 2:
            //redireccionarEstatus(1);
            break;
        default:
            //alert("default");
            break;
    }
    return false;
}




var listaAvisos;
function tablaAvisos(id){
    listaAvisos = $('#tablaAvisos').DataTable({
    destroy: true,
    ajax: {
      url: "SoporteSistemas/obtenerAvisos",
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
            className:'btn btn-custom btn-rounded btn-outline-danger mb-4 buttonDt',
            action: function () {
                //eliminarGrupo();
            }
        },
        {
            text: 'Agregar Aviso',
            className:'btn btn-custom btn-rounded btn-outline-primary mb-4 buttonDt',
            action: function () {
                vistaAvisos(0,0);
            }
        }
    ],
    columns: [
      {
        data: "idAviso",
        render: function ( data, type, row, meta ) {
          return '<button title="Eliminar" class="btn btn-outline-danger btn-sm btn-rounded btn-custom ml-3 btn-eliminar-externo"><i class="fa fa-trash"></i></button>'+
                 '<button title="Editar" class="btn btn-outline-success btn-sm btn-rounded btn-custom ml-3 btn-edit-externo"><i class="fa fa-edit"></i></button>';
          },
          className: "text-center"
     },
     {data: "tituloAviso"},
     {data: "aviso"}
    ],
    language: {
        "url":     "public/plugins/DataTables/Spanish.json",
    }
	});
  $('#tablaAvisos tbody').off('click', 'button.btn-outline-primary').on( 'click', 'button.btn-outline-primary', function () {
    var data = listaAvisos.row( this.closest('tr') ).data();
    vistaAvisos(1,data);
  });
}


function vistaAvisos(vista,data){
  switch(vista){
    case 0:
      showSystems();
      $('#listado').hide();
      $('#avisoForm').show();
    break;
    case 1:
      showSystems();
      $('#listado').hide();
      $('#avisoForm').show();
      console.log(data);
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

function showSystems() {
    $.ajax({
        url: 'SoporteSistemas/systemListSelect',
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            var systems = jQuery.parseJSON(response.soporteSistemasDTO);
            var $dropdown = $("select[name$='systemName']");
            for (var i = systems.length - 1; i >= 0; i--) {
                $dropdown.append($("<option />").val(systems[i].idSystem).text(systems[i].name));
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
}
