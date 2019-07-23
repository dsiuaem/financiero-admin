$(document).ready(function () {

    //Establecer la posició de la alerta
    alertify.set('notifier', 'position', 'top-right');
    // oculta las vistas del usuario hasta que el cambie la vista
    $('#registrar').hide();
    $('#listarSistemas').hide();

    //Despliegue de información en DATATABLE
    systemsTable();

    //Variable y función para validar datos del icono
    var iconoSistema = document.getElementById("iconoSistema");

    iconoSistema.onchange = function () {

        var fileName = this.files[0].name;

        if (this.files[0].size > 2000000) {
            alertify.error("La imagen que intentas subir es demasiado grande, favor de subir una menor a 2 MB");
            this.value = "";
        } else {
            var ext = fileName.split('.').pop();

            // console.log(ext);
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

        //console.log(data)
        $.ajax({
            url: 'Sistemas/registerSystem',
            type: 'POST',
            data: ({datos: data}),
            success: function (response) {
                console.log(response);
                var obj = jQuery.parseJSON(response);
                if (obj.respuesta == 200) {
                    cleanNewSystem();
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
        responsive: {
            details: false
        },
        ajax: {
            url: 'Sistemas/sistemasListTable',
            dataSrc: "",
        },
        columns: [
            {
                data: null,
                render: function (data, type, row) {

                    if (data.enable == 1) {

                         estado = "checkbox";

                    } else if (data.enable == 0) {

                         estado = "";

                    }

                    return '<button id="btnUpdateSystem" data-toggle="modal" data-target="#modalEditarSistema" class="btn btn-outline-primary btn-sm btn-rounded btn-custom mr-1"><i class="fas fa-edit"></i></button> ' +
                        '' +
                        '<label class="switch switch-text switch-success switch-pill mr-1">' +
                        '<input id="btnEnableSystem" type="' + estado + '" class="switch-input" checked="true">' +
                        '<span data-on="On" data-off="Off" class="switch-label"></span>' +
                        '<span class="switch-handle"></span>\n' +
                        '</label> ' +
                        '' +
                        '<button id="btnDeleteSystem" title="Eliminar concepto" class="btn btn-outline-danger btn-sm btn-rounded btn-custom"><i class="fas fa-trash-alt"></i></i></button>';

                }
            },
            {
                data: "idSystem",
                visible: false,
                searchable: false
            },
            {data: "name"}
        ],
        fixedColumns: true,
        language: {
            "url": "public/plugins/DataTables/Spanish.json",
        }
    });
    $('#tableSistemas tbody').off('click', '#btnUpdateSystem').on('click', '#btnUpdateSystem', function () {
        var data = tableSistemas.row(this.closest('tr')).data();
        //console.log(data);

        document.getElementById('updateNombreSistema').value = data.name;
        document.getElementById('idSystemUpdate').value = data.idSystem;

        //confirmEliminar(data["idConcepto"], (data["descripcion"]));
    });

    $('#tableSistemas tbody').off('click', '#btnEnableSystem').on('click', '#btnEnableSystem', function () {
        var data = tableSistemas.row(this.closest('tr')).data();
        var id = data.idSystem;
        var estadoBase = data.enable;

        if (estadoBase == 1) {

            var texto = "Desactivar";

        } else if (estadoBase == 0) {

            var texto = "Activar";

        }

        alertify.confirm(texto + ' el sistema seleccionado ', function () {
                estadoSwitch(id, estadoBase);
            }
            , function () {
            
               tableSistemas.ajax.reload();
                alertify.error('Acción cancelada')
            });

    });

    $('#tableSistemas tbody').off('click', '#btnDeleteSystem').on('click', '#btnDeleteSystem', function () {
        var data = tableSistemas.row(this.closest('tr')).data();
        var id = data.idSystem;

        alertify.confirm('Eliminar el sistema seleccionado ', function () {
                deleteSistema(id);
            }
            , function () {
                alertify.error('Acción cancelada')
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
    // alert(optionMenu);
    switch (optionMenu) {
        case 1://Captura
            cleanNewSystem();
            $('#registrar').show();
            $('#listarSistemas').hide();
            break;
        case 2:
            cleanShowSystemsR();
            $('#registrar').hide();
            $('#listarSistemas').show();
            //redireccionarEstatus(1);
            break;
        default:
            //alert("default");
            break;
    }
    return false;
}

function cleanShowSystemsR(){
  tableSistemas.ajax.reload();
}

function cleanNewSystem(){
     $('#nombreSistema').val("");
}




//Función para vaciar formularios depués de cada acción
function resetForm() {
    $('#registroSistemas')[0].reset();
}

//Funcion para llevar a cabo el registro de un sistema
function updateSistema() {

    var texto = $('#actualizacionSistemas').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    //console.log(data);

    $.ajax({
        url: 'Sistemas/updateSystem',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {

                $("#modalEditarSistema").modal('hide');

                //Función para recargar tabla
                tableSistemas.ajax.reload();
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

    //console.log(id_system);

    $.ajax({
        url: 'Sistemas/deleteSystem',
        type: 'POST',
        data: ({datos: id_system}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                //Función para recargar tabla
                tableSistemas.ajax.reload();
                alertify.success("Sistema eliminado de manera exitosa");
                return false;
            } else {
                //alert("Error al insertar los datos");
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
                //Función para recargar tabla
                tableSistemas.ajax.reload();
                return false;
            } else {
                alertify.error("Error en la acción");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio");
        }
    });
    return false;

}



/*
function resetForm(){
    $('input[class$="checkGrupo"]').prop("checked", false);
    $('input[class$="checkGrupoCopia"]').prop("checked", false);
    $('input[class$="checkPersona"]').prop("checked", false);
    $('input[class$="checkPersonaCopia"]').prop("checked", false);
    $('#registroOficioForm')[0].reset();
    $('#updateOficioForm')[0].reset();
    $(".selectRemitente").val(null);
    $(".selectRemitente").select2("val","");
    $(".selectDestinatario").val(null);
    $(".selectGrupoDestinatario").val(null);
    $(".selectDestinatarioCopia").val(null);
    $(".selectGrupoDestinatarioCopia").val(null);
    ocultarSeccionFormulario();
}
 */
