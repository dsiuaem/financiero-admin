$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');
    // oculta las vistas del usuario hasta que el cambie la vista
    $('#registrar').hide();
    $('#listarTipoOpciones').hide();

    //Select desactivados de registro
    $('#moduleName').prop('disabled', 'disabled');
    $('#submoduleName').prop('disabled', 'disabled');
    $('#optionName').prop('disabled', 'disabled');

    //Select desactivados de table
    $('#moduleListTable').prop('disabled', 'disabled');
    $('#submoduleListTable').prop('disabled', 'disabled');
    $('#optionNameTable').prop('disabled', 'disabled');

    //Mostrar información en el select
    showSystems();
    showSystemsTable();

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="registroTipoOpciones"]').validate({
        rules: {
            systemName: 'required',
            moduleName: 'required',
            submoduleName: 'required',
            optionName: 'required',
            nameTypeOption: 'required'
        },
        messages: {
            systemName: 'Falta seleccionar un sistema',
            moduleName: 'Falta seleccionar un módulo',
            submoduleName: 'Falta seleccionar un submodulo',
            optionName: 'Falta seleccionar una opción',
            nameTypeOption: 'Falta introducir nombre al tipo opción'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            saveRegistroTipoOpciones();

            /*
            $(function () {
                $("#btnSaveTypeOption").click(saveRegistroTipoOpciones());
            });

             */

        }
    });

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="actualizacionTipoOpciones"]').validate({
        rules: {
            updateNameTypeOption: 'required'
        },
        messages: {
            updateNameTypeOption: 'Falta introducir nombre al tipo opción'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            updateTipoOpciones();

        }
    });

});

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarEstatus(optionMenu) {
    switch (optionMenu) {
        case 1:
            $('#registrar').show();
            $('#listarTipoOpciones').hide();
            break;
        case 2:
            $('#registrar').hide();
            $('#listarTipoOpciones').show();
            break;
    }
}

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarVista(optionMenu) {
    // alert(optionMenu);
    switch (optionMenu) {
        case 1:
            $('#registrar').show();
            $('#listarTipoOpciones').hide();
            break;
        case 2:
            $('#registrar').hide();
            $('#listarTipoOpciones').show();
            //redireccionarEstatus(1);
            break;
        default:
            //alert("default");
            break;
    }
    return false;
}

//Funcion para llevar a cabo el registro de un sistema
function saveRegistroTipoOpciones() {

    var texto = $('#registroTipoOpciones').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    //console.log(data);

    if (data.systemName != 0) {

        if (data.moduleName != 0) {

            if (data.submoduleName != 0) {

                if (data.optionName != 0) {

                    $.ajax({
                        url: 'TipoOpciones/registrarTipoOpcion',
                        type: 'POST',
                        data: ({datos: data}),
                        success: function (response) {

                            console.log(response);

                            var obj = jQuery.parseJSON(response);
                            if (obj.respuesta == 200) {
                                tableTipoOpciones.ajax.reload();
                                resetForm();
                                alertify.success("Tipo opción registrado exitosamente");
                                return false;
                            } else {
                                //alert("Error al insertar los datos");
                                alertify.error("Error al registrar tipo opción");
                            }
                        },
                        error: function () {
                            alertify.error("Error al obtener el servicio para registrar tipo opción");
                        }
                    });
                    return false;

                } else {
                    alertify.warning("No has seleccionado una opción");
                }

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
    $('#registroTipoOpciones')[0].reset();
}

//Funcion para llevar a cabo el registro de un sistema
function updateTipoOpciones() {

    var texto = $('#actualizacionTipoOpciones').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    //console.log(data);

    $.ajax({
        url: 'TipoOpciones/updateTipoOpcion',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {

            console.log(response);

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                $("#modalEditarTipoOpciones").modal('hide');
                tableTipoOpciones.ajax.reload();
                alertify.success("Tipo opción actualizado exitosamente");
                return false;
            } else {
                //alert("Error al insertar los datos");
                alertify.error("Error al actualizar tipo opción");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para actualizar tipo opción");
        }
    });
    return false;

}

//Funcion para llevar a cabo el registro de un sistema
function deleteTipoOpcion(id_typeOption) {

    $.ajax({
        url: 'TipoOpciones/deleteTipoOpcion',
        type: 'POST',
        data: ({datos: id_typeOption}),
        success: function (response) {

            console.log(response);

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                tableTipoOpciones.ajax.reload();
                alertify.success("Tipo opción eliminado exitosamente");
                return false;
            } else {
                //alert("Error al insertar los datos");
                alertify.error("Error al eliminar tipo opción");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para eliminar tipo opción");
        }
    });
    return false;

}

function estadoSwitch(id_typeOption, estado) {

    $.ajax({
        url: 'TipoOpciones/enableTipoOpcion',
        type: 'POST',
        data: ({datos: id_typeOption, estado: estado}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                //Función para recargar tabla
                tableTipoOpciones.ajax.reload();
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

//#################################################################
//Funciones para activar o desactivar los checkbox
function checkOne() {

    if ($('#typeOne').is(':checked')) {
        $("#typeTwo").prop('disabled', 'disabled');
    } else {
        $("#typeTwo").prop('disabled', false);
    }

}

function checkTwo() {

    if ($('#typeTwo').is(':checked')) {
        $("#typeOne").prop('disabled', 'disabled');
    } else {
        $("#typeOne").prop('disabled', false);
    }

}

//Funciones para activar o desactivar los checkbox
function checkOneUpate() {

    if ($('#updateTypeOne').is(':checked')) {
        $("#updateTypeTwo").prop('disabled', 'disabled');
    } else {
        $("#updateTypeTwo").prop('disabled', false);
    }

}

function checkTwoUpate() {

    if ($('#updateTypeTwo').is(':checked')) {
        $("#updateTypeOne").prop('disabled', 'disabled');
    } else {
        $("#updateTypeOne").prop('disabled', false);
    }

}

//#################################################################

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

//Funciones para obtener información de los select
$(document).on('change', '#submoduleName', function () {

    var id_submodule = $('select[name=submoduleName]').val();

    if (id_submodule != "0") {
        $('#optionName').prop('disabled', false);

        $.ajax({
            url: 'Opciones/opcionesListSelect',
            type: 'POST',
            data: ({data: id_submodule}),
            success: function (response) {

                $('#optionName').empty();

                var modules = jQuery.parseJSON(response);
                //console.log(modules);
                var arreglo = modules.opcionesDTO;
                //console.log(typeof (arreglo));
                arreglo = jQuery.parseJSON(arreglo);
                //console.log(typeof (arreglo));
                var $dropdown = $("select[name$='optionName']");
                $dropdown.append($("<option />").val(0).text("-- Selecciona --"));
                for (var i = arreglo.length - 1; i >= 0; i--) {
                    $dropdown.append($("<option />").val(arreglo[i].idModuleOption).text(arreglo[i].name));
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
        $('#optionName').prop('disabled', 'disabled');
    }


});

//#################################################################################
//Despliegue en DATATABLES
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

//Funciones para obtener información de los select
$(document).on('change', '#submoduleListTable', function () {

    var id_submodule = $('select[name=submoduleListTable]').val();

    if (id_submodule != "0") {
        $('#optionNameTable').prop('disabled', false);

        $.ajax({
            url: 'Opciones/opcionesListSelect',
            type: 'POST',
            data: ({data: id_submodule}),
            success: function (response) {

                $('#optionNameTable').empty();

                var modules = jQuery.parseJSON(response);
                //console.log(modules);
                var arreglo = modules.opcionesDTO;
                //console.log(typeof (arreglo));
                arreglo = jQuery.parseJSON(arreglo);
                //console.log(typeof (arreglo));
                var $dropdown = $("select[name$='optionNameTable']");
                $dropdown.append($("<option />").val(0).text("-- Selecciona --"));
                for (var i = arreglo.length - 1; i >= 0; i--) {
                    $dropdown.append($("<option />").val(arreglo[i].idModuleOption).text(arreglo[i].name));
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
        $('#optionNameTable').prop('disabled', 'disabled');
    }


});

var tableTipoOpciones;
//Para DataTable
//Funciones para obtener información de los select
$(document).on('change', '#optionNameTable', function () {

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

    var id_opcion = $('select[name=optionNameTable]').val();

    if (id_opcion != "0") {

        console.log("entra" + " " + id_opcion);

        tableTipoOpciones = $('#tableTipoOpciones').DataTable({
            destroy: true,
            responsive: {
                details: false
            },
            ajax: {
                url: 'TipoOpciones/tipoOpcionesListTable',
                type: 'POST',
                data: ({id: id_opcion}),
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

                        return '<button id="btnUpdateTipoOption" data-toggle="modal" data-target="#modalEditarTipoOpciones" class="btn btn-primary btn-sm buttonDt btn-ver"><i class="fa fa-search"></i></button> ' +
                            '' +
                            '<label class="switch switch-text switch-success switch-pill">\n' +
                            '<input id="btnEnableTipoOption" type="' + estado + '" class="switch-input" checked="true">\n' +
                            '<span data-on="On" data-off="Off" class="switch-label"></span>\n' +
                            '<span class="switch-handle"></span>\n' +
                            '</label> ' +
                            '' +
                            '<button id="btnDeleteTipoOption" class="btn btn-danger btn-sm buttonDt btn-elimina"><i class="fa fa-trash"></i></button>';

                    }
                },
                {
                    data: "idTipoOption",
                    visible: false,
                    searchable: false
                },

                {data: "name"},
                {data: "tipo"}

            ],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });

        $('#tableTipoOpciones tbody').off('click', '#btnUpdateTipoOption').on('click', '#btnUpdateTipoOption', function () {
            var data = tableTipoOpciones.row(this.closest('tr')).data();
            //console.log(data);
            var type = data.tipo;

            document.getElementById('updateNameTypeOption').value = data.name;

            if (type == 1) {

                $(function () {
                    $("#updateTypeOne").prop("checked", true);
                });


            } else if (type == 2) {

                $(function () {
                    $("#updateTypeTwo").prop("checked", true);
                });

            }

            document.getElementById('idTipoOpcionesUpdate').value = data.idTipoOption;

        });

        $('#tableTipoOpciones tbody').off('click', '#btnEnableTipoOption').on('click', '#btnEnableTipoOption', function () {
            var data = tableTipoOpciones.row(this.closest('tr')).data();
            var id = data.idTipoOption;
            var estado = data.enable;

            if (estado == 1) {

                var texto = "Desactivar";

            } else if (estado == 0) {

                var texto = "Activar";

            }

            alertify.confirm(texto + ' el tipo opción seleccionado ', function () {
                    estadoSwitch(id, estado);
                }
                , function () {
                    alertify.error('Acción cancelada')
                });


        });

        $('#tableTipoOpciones tbody').off('click', '#btnDeleteTipoOption').on('click', '#btnDeleteTipoOption', function () {

            var data = tableTipoOpciones.row(this.closest('tr')).data();
            var id = data.idTipoOption;

            alertify.confirm('Eliminar el tipo opción seleccionado ', function () {
                    deleteTipoOpcion(id);
                }
                , function () {
                    alertify.error('Acción cancelada')
                });

        });

    }

});

