$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');
    // oculta las vistas del usuario hasta que el cambie la vista
    $('#registrar').hide();
    $('#listarOpciones').hide();

    //Apartado para obtener los resultados en los select

    $('#moduleName').prop('disabled', 'disabled');
    $('#submoduleName').prop('disabled', 'disabled');

    $('#moduleListTable').prop('disabled', 'disabled');
    $('#submoduleListTable').prop('disabled', 'disabled');

    //Mostrar información en el select
    showSystems();
    showSystemsTable();

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="registroOpciones"]').validate({
        rules: {
            systemName: 'required',
            moduleName: 'required',
            submoduleName: 'required',
            nameOption: 'required',
            description: 'required',
            order: 'required'
        },
        messages: {
            systemName: 'Falta seleccionar un sistema',
            moduleName: 'Falta seleccionar un módulo',
            submoduleName: 'Falta seleccionar un submodulo',
            nameOption: 'Falta introducir nombre a la opción',
            description: 'Falta introducir una descripción',
            order: 'Falta introducir un orden'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            saveRegistroOpciones();
            /*
            $(function () {
                $("#btnSaveModule").click(saveRegistroOpciones());
            });

             */

        }
    });

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="actualizacionOpciones"]').validate({
        rules: {
            updateNameOption: 'required',
            updateDescription: 'required'
        },
        messages: {
            updateNameOption: 'Falta introducir nombre a la opción',
            updateDescription: 'Falta introducir una descripción'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            updateOpciones();

        }
    });

});

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarEstatus(optionMenu) {
    switch (optionMenu) {
        case 1:
            $('#registrar').show();
            $('#listarOpciones').hide();
            break;
        case 2:
            $('#registrar').hide();
            $('#listarOpciones').show();
            break;
    }
}

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarVista(optionMenu) {
    // alert(optionMenu);
    switch (optionMenu) {
        case 1:
            $('#registrar').show();
            $('#listarOpciones').hide();
            break;
        case 2:
            $('#registrar').hide();
            $('#listarOpciones').show();
            //redireccionarEstatus(1);
            break;
        default:
            //alert("default");
            break;
    }
    return false;
}

//Funcion para llevar a cabo el registro de un sistema
function saveRegistroOpciones() {
    var texto = $('#registroOpciones').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    //console.log(data);

    if (data.systemName != 0) {

        if (data.moduleName != 0) {

            if (data.submoduleName != 0) {

                $.ajax({
                    url: 'Opciones/registrarOpcion',
                    type: 'POST',
                    data: ({datos: data}),
                    success: function (response) {

                        console.log(response);

                        var obj = jQuery.parseJSON(response);
                        if (obj.respuesta == 200) {
                            tableOpciones.ajax.reload();
                            resetForm();
                            alertify.success("Opción registrada exitosamente");
                            return false;
                        } else {
                            //alert("Error al insertar los datos");
                            alertify.error("Error al registrar la opción");
                        }
                    },
                    error: function () {
                        alertify.error("Error al obtener el servicio para registrar la opción");
                    }
                });
                return false;

            } else {
                alertify.warning("No has seleccionado un submodulo");
            }

        } else {
            alertify.warning("No has seleccionado un módulo");
        }

    } else {
        alertify.warning("No has seleccionado un sistema");
    }

}

//Función para vaciar formularios depués de cada acción
function resetForm() {
    $('#registroOpciones')[0].reset();
}

//Funcion para llevar a cabo el registro de un sistema
function updateOpciones() {
    var texto = $('#actualizacionOpciones').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    console.log(data);

    $.ajax({
        url: 'Opciones/updateOpcion',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {

            console.log(response);

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                $("#modalEditarOpciones").modal('hide');
                tableOpciones.ajax.reload();
                alertify.success("Opción actualizada exitosamente");
                return false;
            } else {
                //alert("Error al insertar los datos");
                alertify.error("Error al actualizar la opción");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para actualizar la opción");
        }
    });
    return false;

}

//Funcion para llevar a cabo el registro de un sistema
function deleteOpcion(id_option) {

    $.ajax({
        url: 'Opciones/deleteOpcion',
        type: 'POST',
        data: ({datos: id_option}),
        success: function (response) {

            console.log(response);

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                tableOpciones.ajax.reload();
                alertify.success("Opción eliminada exitosamente");
                return false;
            } else {
                alertify.error("Error al eliminar la opción");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para eliminar la opción");
        }
    });
    return false;

}

function estadoSwitch(id_option, estado) {

    $.ajax({
        url: 'Opciones/enableOpcion',
        type: 'POST',
        data: ({datos: id_option, estado: estado}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                //Función para recargar tabla
                tableOpciones.ajax.reload();
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

//Funciones para obtener información de los select
$(document).on('change', '#systemName', function () {

    var id_sistema = $('select[name=systemName]').val();

    if (id_sistema != "0") {
        $('#moduleName').prop('disabled', false);

        $.ajax({
            url: 'Modulos/moduleListSelect',
            type: 'POST',
            data: ({data: id_sistema}),
            success: function (response) {

                $('#moduleName').empty();

                var modules = jQuery.parseJSON(response);
                //console.log(modules);
                var arreglo = modules.modulosDTO;
                //console.log(typeof (arreglo));
                arreglo = jQuery.parseJSON(arreglo);
                //console.log(typeof (arreglo));
                var $dropdown = $("select[name$='moduleName']");
                $dropdown.append($("<option />").val(0).text("-- Selecciona --"));
                for (var i = arreglo.length - 1; i >= 0; i--) {
                    $dropdown.append($("<option />").val(arreglo[i].idModule).text(arreglo[i].name));
                }

                /*
                var modules = jQuery.parseJSON(response.modulosDTO);
                var $dropdown = $("select[name$='moduleName']");
                for (var i = modules.length - 1; i >= 0; i--) {
                    $dropdown.append($("<option />").val(modules[i].idModule).text(modules[i].name));
                }

                 */

            },
            error: function () {
                alert("Error al obtener el servicio para cargar lista de módulos");
            }
        });

    } else {
        $('#moduleName').prop('disabled', 'disabled');
    }


});

//Funciones para obtener información de los select
$(document).on('change', '#moduleName', function () {

    var id_module = $('select[name=moduleName]').val();

    if (id_module != "0") {
        $('#submoduleName').prop('disabled', false);

        $.ajax({
            url: 'Submodulos/submoduleListSelect',
            type: 'POST',
            data: ({data: id_module}),
            success: function (response) {

                $('#submoduleName').empty();

                var modules = jQuery.parseJSON(response);
                //console.log(modules);
                var arreglo = modules.submodulosDTO;
                //console.log(typeof (arreglo));
                arreglo = jQuery.parseJSON(arreglo);
                //console.log(typeof (arreglo));
                var $dropdown = $("select[name$='submoduleName']");
                $dropdown.append($("<option />").val(0).text("-- Selecciona --"));
                for (var i = arreglo.length - 1; i >= 0; i--) {
                    $dropdown.append($("<option />").val(arreglo[i].idSubModule).text(arreglo[i].name));
                }

                /*
                var modules = jQuery.parseJSON(response.modulosDTO);
                var $dropdown = $("select[name$='moduleName']");
                for (var i = modules.length - 1; i >= 0; i--) {
                    $dropdown.append($("<option />").val(modules[i].idModule).text(modules[i].name));
                }

                 */

            },
            error: function () {
                alert("Error al obtener el servicio para cargar lista de submodulos");
            }
        });

    } else {
        $('#submoduleName').prop('disabled', 'disabled');
    }


});

//############################################################################################
//Despliegue en DATATABLES
//Funciones para obtener información de los select
$(document).on('change', '#systemNameTable', function () {

    var id_sistema = $('select[name=systemNameTable]').val();

    if (id_sistema != "0") {
        $('#moduleListTable').prop('disabled', false);

        $.ajax({
            url: 'Modulos/moduleListSelect',
            type: 'POST',
            data: ({data: id_sistema}),
            success: function (response) {

                $('#moduleListTable').empty();

                var modules = jQuery.parseJSON(response);
                //console.log(modules);
                var arreglo = modules.modulosDTO;
                //console.log(typeof (arreglo));
                arreglo = jQuery.parseJSON(arreglo);
                //console.log(typeof (arreglo));
                var $dropdown = $("select[name$='moduleListTable']");
                $dropdown.append($("<option />").val(0).text("-- Selecciona --"));
                for (var i = arreglo.length - 1; i >= 0; i--) {
                    $dropdown.append($("<option />").val(arreglo[i].idModule).text(arreglo[i].name));
                }

                /*
                var modules = jQuery.parseJSON(response.modulosDTO);
                var $dropdown = $("select[name$='moduleName']");
                for (var i = modules.length - 1; i >= 0; i--) {
                    $dropdown.append($("<option />").val(modules[i].idModule).text(modules[i].name));
                }

                 */

            },
            error: function () {
                alert("Error al obtener el servicio para cargar lista de módulos");
            }
        });

    } else {
        $('#moduleListTable').prop('disabled', 'disabled');
    }


});

//Funciones para obtener información de los select
$(document).on('change', '#moduleListTable', function () {

    var id_module = $('select[name=moduleListTable]').val();

    if (id_module != "0") {
        $('#submoduleListTable').prop('disabled', false);

        $.ajax({
            url: 'Submodulos/submoduleListSelect',
            type: 'POST',
            data: ({data: id_module}),
            success: function (response) {

                $('#submoduleListTable').empty();

                var modules = jQuery.parseJSON(response);
                //console.log(modules);
                var arreglo = modules.submodulosDTO;
                //console.log(typeof (arreglo));
                arreglo = jQuery.parseJSON(arreglo);
                //console.log(typeof (arreglo));
                var $dropdown = $("select[name$='submoduleListTable']");
                $dropdown.append($("<option />").val(0).text("-- Selecciona --"));
                for (var i = arreglo.length - 1; i >= 0; i--) {
                    $dropdown.append($("<option />").val(arreglo[i].idSubModule).text(arreglo[i].name));
                }

                /*
                var modules = jQuery.parseJSON(response.modulosDTO);
                var $dropdown = $("select[name$='moduleName']");
                for (var i = modules.length - 1; i >= 0; i--) {
                    $dropdown.append($("<option />").val(modules[i].idModule).text(modules[i].name));
                }

                 */

            },
            error: function () {
                alert("Error al obtener el servicio para cargar lista de submodulos");
            }
        });

    } else {
        $('#submoduleListTable').prop('disabled', 'disabled');
    }


});

var tableOpciones;
//Para DataTable
//Funciones para obtener información de los select
$(document).on('change', '#submoduleListTable', function () {

    /*
    var id_modulo = $('select[name=moduleNameTable]').val();

    console.log("entra id: " + " " + id_modulo);

    $.ajax({
        url: 'Submodulos/submoduleListTable',
        type: 'POST',
        data: ({id: id_modulo}),
        success: function (response) {
            console.log("datos");
            console.log(response);

        },
        error: function () {
            alertify.error("Error al obtener el servicio");
        }
    });

     */

    var id_submodulo = $('select[name=submoduleListTable]').val();

    if (id_submodulo != "0") {

        console.log("entra" + " " + id_submodulo);

        tableOpciones = $('#tableOpciones').DataTable({
            destroy: true,
            responsive: {
                details: false
            },
            ajax: {
                url: 'Opciones/opcionesListTable',
                type: 'POST',
                data: ({id: id_submodulo}),
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

                        return '<button id="btnUpdateOption" data-toggle="modal" data-target="#modalEditarOpciones" class="btn btn-primary btn-sm buttonDt btn-ver"><i class="fa fa-search"></i></button> ' +
                            '' +
                            '<label class="switch switch-text switch-success switch-pill">\n' +
                            '<input id="btnEnableOption" type="' + estado + '" class="switch-input" checked="true">\n' +
                            '<span data-on="On" data-off="Off" class="switch-label"></span>\n' +
                            '<span class="switch-handle"></span>\n' +
                            '</label> ' +
                            '' +
                            '<button id="btnDeleteOption" class="btn btn-danger btn-sm buttonDt btn-elimina"><i class="fa fa-trash"></i></button>';

                    }
                },
                {
                    data: "idModuleOption",
                    visible: false,
                    searchable: false
                },

                {data: "name"},
                {data: "description"}

            ],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });

        $('#tableOpciones tbody').off('click', '#btnUpdateOption').on('click', '#btnUpdateOption', function () {
            var data = tableOpciones.row(this.closest('tr')).data();
            //console.log(data);
            document.getElementById('updateNameOption').value = data.name;
            document.getElementById('updateDescription').value = data.description;
            document.getElementById('idOpcionesUpdate').value = data.idModuleOption;

        });

        $('#tableOpciones tbody').off('click', '#btnEnableOption').on('click', '#btnEnableOption', function () {
            var data = tableOpciones.row(this.closest('tr')).data();
            var id = data.idModuleOption;
            var estado = data.enable;

            if (estado == 1) {

                var texto = "Desactivar";

            } else if (estado == 0) {

                var texto = "Activar";

            }

            alertify.confirm(texto + ' la opción seleccionada ', function () {
                    estadoSwitch(id, estado);
                }
                , function () {
                    alertify.error('Acción cancelada')
                });


        });

        $('#tableOpciones tbody').off('click', '#btnDeleteOption').on('click', '#btnDeleteOption', function () {
            var data = tableOpciones.row(this.closest('tr')).data();
            var id = data.idModuleOption;

            alertify.confirm('Eliminar la opción seleccionada ', function () {
                    deleteOpcion(id);
                }
                , function () {
                    alertify.error('Acción cancelada')
                });

        });

    }

});



