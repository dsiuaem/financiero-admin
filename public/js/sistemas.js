$(document).ready(function () {
    //Establecer la posició de la alerta
    alertify.set('notifier', 'position', 'top-right');
    redireccionarVista(2)

    //Variable y función para validar datos del icono
    var iconoSistema = document.getElementById("iconoSistema");
      iconoSistema.onchange = function () {
      var fileName = this.files[0].name;
      if (this.files[0].size > 2000000) {
          alertify.error("La imagen que intentas subir es demasiado grande, favor de subir una menor a 2 MB");
          this.value = "";
      } else {
          var ext = fileName.split('.').pop();
          switch (ext) {
              case 'jpg':
              case 'jpeg':
              case 'png':
              case 'JPG':
              case 'JPEG':
              case 'PNG':
                  break;
              default:
                  alertify.error("El archivo no tiene la extensión adecuada solo se aceptan jpg, jpeg, png");
                  this.value = ''; // reset del valor
          }
      }
    };

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="registroSistemas"]').validate({
        rules: {
            nombreSistema: {
                required:true,
                minlength: 6,
                //pattern: '^[a-zA-Z\ \á\é\í\ó\ú\Á\É\Í\Ó\Ú]+$'
            }
        },
        messages: {
            nombreSistema:{
                required:"Campo es requerido",
                minlength: "6 caracteres como mínimo",
                //pattern: 'Formato incorrecto'
            }
        }
    });

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="actualizacionSistemas"]').validate({
        rules: {
            updateNombreSistema: 'required'
        },
        messages: {
            updateNombreSistema: 'Falta introducir nombre del sistema'
        },
        submitHandler: function () {
            //Se llama a la función para registrar el sistema después de que todo esta bien
            updateSistema();
        }
    });
});

function saveRegistroSistema(){
    if($('form[id="registroSistemas"]').valid()){
        var texto = $('#registroSistemas').serializeArray();
        var data = {};
        $(texto).each(function (index, obj) {
            data[obj.name] = obj.value;
        });
        console.log(data)
        $.ajax({
            url: 'Sistemas/registerSystem',
            type: 'POST',
            data: ({datos: data}),
            success: function (response) {
                var obj = jQuery.parseJSON(response);
                if (obj.respuesta == 200) {
                    $('#nombreSistema').val("");
                    alertify.success("Registro exitoso");
                } else {
                    //alert("Error al insertar los datos");
                    alertify.error("Error al registrar el sistema");
                }
            },
            error: function () {
                alertify.error("Error al obtener el servicio para registrar el sistema");
            }
        });
    }
}

var tableSistemas;
var estado;
function systemsTable() {
    tableSistemas = $('#tableSistemas').DataTable({
        destroy: true,
        ajax: {
            url: 'Sistemas/sistemasListTable',
            dataSrc: "",
        },
        columns: [
            {
                data: "idSystem",
                visible: true
            },
            {
                data: "name"
            },
            {
                data: null,
                render: function (data, type, row) {
                    if (data.enable == 1) {
                         estado = "checkbox";
                    } else if (data.enable == 0) {
                         estado = "";
                    }
                    return '<button id="btnUpdateSystem" data-toggle="modal" data-target="#modalEditarSistema" class="btn btn-outline-primary btn-sm btn-rounded btn-custom mr-3"><i class="fas fa-edit"></i></button> ' +
                        '' +
                        '<label class="switch switch-text switch-success switch-pill">' +
                        '<input id="btnEnableSystem" type="' + estado + '" class="switch-input" checked="true">' +
                        '<span data-on="On" data-off="Off" class="switch-label"></span>' +
                        '<span class="switch-handle"></span>\n' +
                        '</label> ' +
                        '';
                }
            },
        ],
        fixedColumns: true,
        language: {
            "url": "public/plugins/DataTables/Spanish.json",
        }
    });
    $('#tableSistemas tbody').off('click', '#btnUpdateSystem').on('click', '#btnUpdateSystem', function () {
        var data = tableSistemas.row(this.closest('tr')).data();
        if(data==undefined){
          data = tableSistemas.row( this ).data();
        }
        $('#updateNombreSistema').val(data.name);
        $('#idSystemUpdate').val(data.idSystem);
    });

    $('#tableSistemas tbody').off('click', '#btnEnableSystem').on('click', '#btnEnableSystem', function () {
        var data = tableSistemas.row(this.closest('tr')).data();
        if(data==undefined){
          data = tableSistemas.row( this ).data();
        }
        if (data.enable == 1) {
            var texto = "Desactivar";
        } else if (data.enable == 0) {
            var texto = "Activar";
        }
        alertify.confirm(texto + ' el sistema seleccionado ', function () {
            estadoSwitch(data.idSystem, data.enable);
        },function () {
           tableSistemas.ajax.reload(null,false);
            //alertify.error('Acción cancelada');
        });

    });

    $('#tableSistemas tbody').off('click', '#btnDeleteSystem').on('click', '#btnDeleteSystem', function () {
        var data = tableSistemas.row(this.closest('tr')).data();
        if(data==undefined){
          data = tableSistemas.row( this ).data();
        }
        alertify.confirm('Eliminar el sistema seleccionado ', function () {
            deleteSistema(data.idSystem);
        },function () {
            //alertify.error('Acción cancelada');
        });
    });
}

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
//Función para mostrar un formúlario en especifico
function redireccionarEstatus(optionMenu) {
    switch (optionMenu) {
        case 1:
            $('#registrar').show();
            $('#listarSistemas').hide();
            break;
        case 2:
            $('#registrar').hide();
            $('#listarSistemas').show();
            break;
    }
}

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarVista(optionMenu) {
    switch (optionMenu) {
        case 1://Captura
            $('#nombreSistema').val("");
            $('#registrar').show();
            $('#listarSistemas').hide();
            break;
        case 2://Lista
            systemsTable();
            $('#registrar').hide();
            $('#listarSistemas').show();
            break;
        default:
            //alert("default");
            break;
    }
    return false;
}


//Funcion para llevar a cabo el registro de un sistema
function updateSistema() {
    var texto = $('#actualizacionSistemas').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });
    console.log(data);
    $.ajax({
        url: 'Sistemas/updateSystem',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                $("#modalEditarSistema").modal('hide');
                //Función para recargar tabla
                tableSistemas.ajax.reload(null,false);
                alertify.success("Actualización exitosa");
                return false;
            } else {
                alertify.error("Error al actualizar el sistema");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para actualizar el sistema");
        }
    });
    return false;
}

function deleteSistema(id_system) {
    $.ajax({
        url: 'Sistemas/deleteSystem',
        type: 'POST',
        data: ({datos: id_system}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                //Función para recargar tabla
                tableSistemas.ajax.reload(null,false);
                alertify.success("Sistema eliminado de manera exitosa");
                return false;
            } else {
                alertify.error("Error al eliminar el sistema");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para eliminar el sistema");
        }
    });
    return false;
}

function estadoSwitch(id_system, estado) {
    $.ajax({
        url: 'Sistemas/enableSystem',
        type: 'POST',
        data: ({datos: id_system, estado: estado}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                tableSistemas.ajax.reload(null,false);
                return false;
            } else {
                //alertify.error("Error en la acción");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio");
        }
    });
    return false;
}
