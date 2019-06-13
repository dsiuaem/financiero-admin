$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');
    // oculta las vistas del usuario hasta que el cambie la vista
    $('#registrar').hide();
    $('#listarModulos').hide();

    //Mostrar información en el select
    showSystems();
    showSystemsTable();

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="registroModulos"]').validate({
        rules: {
            systemName: 'required',
            nameModule: 'required',
            description: 'required',
            nameModuleMenu: 'required'
        },
        messages: {
            systemName: 'No has seleccionado un sistema',
            nameModule: 'Falta introducir nombre del módulo',
            description: 'Falta introducir la descripción',
            nameModuleMenu: 'Falta introducir nombre del módulo'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            saveRegistroModulos();

            /*
            $(function () {
                $("#btnSaveModule").click(saveRegistroModulos());
            });

             */

        }
    });

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="actualizacionModulos"]').validate({
        rules: {
            updateNameModule: 'required',
            updateDescription: 'required',
            updateNameModuleMenu: 'required'
        },
        messages: {
            updateNameModule: 'Falta introducir nombre del módulo',
            updateDescription: 'Falta introducir la descripción',
            updateNameModuleMenu: 'Falta introducir nombre del módulo'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            updateModulos();

        }
    });


});

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarEstatus(optionMenu) {
    switch (optionMenu) {
        case 1:
            $('#registrar').show();
            $('#listarModulos').hide();
            break;
        case 2:
            $('#registrar').hide();
            $('#listarModulos').show();
            break;
    }
}

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarVista(optionMenu) {
    // alert(optionMenu);
    switch (optionMenu) {
        case 1:
            $('#registrar').show();
            $('#listarModulos').hide();
            break;
        case 2:
            $('#registrar').hide();
            $('#listarModulos').show();
            //redireccionarEstatus(1);
            break;
        default:
            //alert("default");
            break;
    }
    return false;
}

//Funcion para llevar a cabo el registro de un sistema
function saveRegistroModulos() {
    var texto = $('#registroModulos').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    //console.log(data);

    //console.log("hola");

    //console.log(data.systemName);


    if (data.systemName != 0) {

        $.ajax({
            url: 'Modulos/registrarModulo',
            type: 'POST',
            data: ({datos: data}),
            success: function (response) {

                console.log(response);

                var obj = jQuery.parseJSON(response);
                if (obj.respuesta == 200) {
                    //Resetear formulario
                    resetForm();
                    //Recargar tabla
                    tableModulos.ajax.reload();
                    alertify.success("Módulo registrado exitosamente");
                    return false;
                } else {
                    //alert("Error al insertar los datos");
                    alertify.error("Error al registrar el módulo");
                }
            },
            error: function () {
                alertify.error("Error al obtener el servicio para registrar el módulo");
            }
        });
        return false;

    } else {

        alertify.warning("No has seleccionado un sistema");

    }

}

//Funcion para llevar a cabo el registro de un sistema
function updateModulos() {
    var texto = $('#actualizacionModulos').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    console.log(data);

    $.ajax({
        url: 'Modulos/updateModulo',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {

            console.log(response);

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                $("#modalEditarModulo").modal('hide');
                //Recargar tabla
                tableModulos.ajax.reload();
                alertify.success("Módulo actualizado exitosamente");
                return false;
            } else {
                //alert("Error al insertar los datos");
                alertify.error("Error al actualizar el módulo");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para actualizar el módulo");
        }
    });
    return false;

}

//Funcion para llevar a cabo el registro de un sistema
function deleteModulo(id_module) {

    $.ajax({
        url: 'Modulos/deleteModulo',
        type: 'POST',
        data: ({datos: id_module}),
        success: function (response) {

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                //Recargar tabla
                tableModulos.ajax.reload();
                alertify.success("Módulo eliminado exitosamente");
                return false;
            } else {
                alertify.error("Error al eliminar el módulo");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para eliminar el módulo");
        }
    });
    return false;

}

function estadoSwitch(id_module, estado) {

    $.ajax({
        url: 'Modulos/enableModulo',
        type: 'POST',
        data: ({datos: id_module, estado: estado}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                //Función para recargar tabla
                tableModulos.ajax.reload();
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

//Función para vaciar formularios depués de cada acción
function resetForm() {
    $('#registroModulos')[0].reset();
}

function showSystems() {

    $.ajax({
        url: 'Sistemas/systemListSelect',
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {

            var systems = jQuery.parseJSON(response.sistemasDTO);
            var $dropdown = $("select[name$='systemName']");
            for (var i = systems.length - 1; i >= 0; i--) {
                $dropdown.append($("<option />").val(systems[i].idSystem).text(systems[i].name));
            }

        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });
    return false;

}

function showSystemsTable() {

    $.ajax({
        url: 'Sistemas/systemListSelect',
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {

            var systems = jQuery.parseJSON(response.sistemasDTO);
            var $dropdown = $("select[name$='systemNameTable']");
            for (var i = systems.length - 1; i >= 0; i--) {
                $dropdown.append($("<option />").val(systems[i].idSystem).text(systems[i].name));
            }

        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });
    return false;

}

var tableModulos;
//Para DataTable
//Funciones para obtener información de los select
$(document).on('change', '#systemNameTable', function () {

    var id_sistema = $('select[name=systemNameTable]').val();

    if (id_sistema != "0") {

        tableModulos = $('#tableModulos').DataTable({
            destroy: true,
            responsive: {
                details: false
            },
            ajax: {
                url: 'Modulos/moduleListTable',
                type: 'POST',
                data: ({id: id_sistema}),
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

                        return '<button id="btnUpdateModule" data-toggle="modal" data-target="#modalEditarModulo" class="btn btn-primary btn-sm buttonDt btn-ver"><i class="fa fa-search"></i></button> ' +
                            '' +
                            '<label class="switch switch-text switch-success switch-pill">\n' +
                            '<input id="btnEnableModule" type="' + estado + '" class="switch-input" checked="true">\n' +
                            '<span data-on="On" data-off="Off" class="switch-label"></span>\n' +
                            '<span class="switch-handle"></span>\n' +
                            '</label> ' +
                            '' +
                            '<button id="btnDeleteModule" class="btn btn-danger btn-sm buttonDt btn-elimina"><i class="fa fa-trash"></i></button>';

                    }
                },
                {
                    data: "idModule",
                    visible: false,
                    searchable: false
                },
                {data: "name"},
                {data: "description"},
                {data: "moduleMenu"}

            ],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });

        $('#tableModulos tbody').off('click', '#btnUpdateModule').on('click', '#btnUpdateModule', function () {
            var data = tableModulos.row(this.closest('tr')).data();
            //console.log(data);

            document.getElementById('updateNameModule').value = data.name;
            document.getElementById('updateDescription').value = data.description;
            document.getElementById('updateNameModuleMenu').value = data.moduleMenu;
            document.getElementById('idModuleUpdate').value = data.idModule;

            //confirmEliminar(data["idConcepto"], (data["descripcion"]));
        });

        $('#tableModulos tbody').off('click', '#btnEnableModule').on('click', '#btnEnableModule', function () {
            var data = tableModulos.row(this.closest('tr')).data();

            var id = data.idModule;
            var estado = data.enable;

            if (estado == 1) {

                var texto = "Desactivar";

            } else if (estado == 0) {

                var texto = "Activar";

            }

            alertify.confirm(texto + ' el módulo seleccionado ', function () {
                    estadoSwitch(id, estado);
                }
                , function () {
                    alertify.error('Acción cancelada')
                });

        });

        $('#tableModulos tbody').off('click', '#btnDeleteModule').on('click', '#btnDeleteModule', function () {
            var data = tableModulos.row(this.closest('tr')).data();
            var id = data.idModule;

            alertify.confirm('Eliminar el módulo seleccionado ', function () {
                    deleteModulo(id);
                }
                , function () {
                    alertify.error('Acción cancelada')
                });

        });

    }

});




