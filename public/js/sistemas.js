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
            nombreSistema: 'required'
        },
        messages: {
            nombreSistema: 'Falta introducir nombre del sistema'
        },
        submitHandler: function () {
            //Se llama a la función para registrar el sistema después de que todo esta bien
            saveRegistroSistema();
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
            /*
            $("#registroSistemas")[0].reset();
            document.getElementById("textoBeneficiario").style.display = "none";
            document.getElementById("listBeneficiarios").style.display = "none";
            document.getElementById("textoSubfondo").style.display = "none";
            document.getElementById("listSubRecurso").style.display = "none";
            document.getElementById("listBeneficiarios").innerHTML = "";
            document.getElementById("listSubRecurso").innerHTML = "";
            unidadUsuarioEmpleado();
            contBeneficiario = 0;
            contSubfondo = 0;
            */
            $('#registrar').show();
            $('#listarSistemas').hide();
            break;
        case 2:
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

//Funcion para llevar a cabo el registro de un sistema
function saveRegistroSistema() {
    var texto = $('#registroSistemas').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    //console.log(data);

    $.ajax({
        url: 'Sistemas/registerSystem',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                resetForm();
                //Función para recargar tabla
                tableSistemas.ajax.reload();
                alertify.success("Registro exitoso");
                return false;
            } else {
                //alert("Error al insertar los datos");
                alertify.error("Error al registrar el sistema");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para registrar el sistema");
        }
    });
    return false;

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

var tableSistemas;

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

                        var estado = "checkbox";

                    } else if (data.enable == 0) {

                        var estado = "";

                    }

                    return '<button id="btnUpdateSystem" data-toggle="modal" data-target="#modalEditarSistema" class="btn btn-primary btn-sm buttonDt btn-ver"><i class="fa fa-search"></i></button> ' +
                        '' +
                        '<label class="switch switch-text switch-success switch-pill">\n' +
                        '<input id="btnEnableSystem" type="' + estado + '" class="switch-input" checked="true">\n' +
                        '<span data-on="On" data-off="Off" class="switch-label"></span>\n' +
                        '<span class="switch-handle"></span>\n' +
                        '</label> ' +
                        '' +
                        '<button id="btnDeleteSystem" title="Eliminar concepto" class="btn btn-danger btn-sm buttonDt btn-elimina"><i class="fa fa-trash"></i></button>';

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
        var estado = data.enable;

        if (estado == 1) {

            var texto = "Desactivar";

        } else if (estado == 0) {

            var texto = "Activar";

        }

        alertify.confirm(texto + ' el sistema seleccionado ', function () {
                estadoSwitch(id, estado);
            }
            , function () {
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