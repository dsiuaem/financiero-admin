$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');
    // oculta las vistas del usuario hasta que el cambie la vista
    $('#registrar').hide();
    $('#listarSubmodulos').hide();

    //Apartado para obtener los resultados en los select

    $('#moduleName').prop('disabled', 'disabled');
    $('#moduleNameTable').prop('disabled', 'disabled');

    //Mostrar información en el select
    showSystems();
    showSystemsTable();

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="registroSubmodulos"]').validate({
        rules: {
            systemName: 'required',
            moduleName: 'required',
            nameSubmodule: 'required',
            nameController: 'required',
            order: 'required'
        },
        messages: {
            systemName: 'Falta seleccionar un sistema',
            moduleName: 'Falta seleccionar un módulo',
            nameSubmodule: 'Falta introducir un nombre al submdulo',
            nameController: 'Falta introducir nombre al controlador',
            order: 'Falta introducir un orden'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            saveRegistroSubModulos();

            /*
            $(function () {
                $("#btnSaveModule").click(saveRegistroSubModulos());
            });

             */

        }
    });

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="actualizacionSubModulos"]').validate({
        rules: {
            updateNameSubmodule: 'required',
            updateNameController: 'required'
        },
        messages: {
            updateNameSubmodule: 'Falta introducir un nombre al submdulo',
            updateNameController: 'Falta introducir nombre al controlador'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            updateSubModulos();

        }
    });

});

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarEstatus(optionMenu) {
    switch (optionMenu) {
        case 1:
            $('#registrar').show();
            $('#listarSubmodulos').hide();
            break;
        case 2:
            $('#registrar').hide();
            $('#listarSubmodulos').show();
            break;
    }
}

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarVista(optionMenu) {
    // alert(optionMenu);
    switch (optionMenu) {
        case 1:
            $('#registrar').show();
            $('#listarSubmodulos').hide();
            break;
        case 2:
            $('#registrar').hide();
            $('#listarSubmodulos').show();
            //redireccionarEstatus(1);
            break;
        default:
            //alert("default");
            break;
    }
    return false;
}

//Funcion para llevar a cabo el registro de un sistema
function saveRegistroSubModulos() {
    var texto = $('#registroSubmodulos').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    console.log(data);

    $.ajax({
        url: 'Submodulos/registrarSubmodulo',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {

            console.log(response);

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                tableSubmodulos.ajax.reload();
                resetForm();
                alertify.success("Submodulo registrado exitosamente");
                return false;
            } else {
                //alert("Error al insertar los datos");
                alertify.error("Error al registrar el submodulo");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para registrar el submodulo");
        }
    });
    return false;

}

//Función para vaciar formularios depués de cada acción
function resetForm() {
    $('#registroSubmodulos')[0].reset();
}

//Funcion para llevar a cabo el registro de un sistema
function updateSubModulos() {
    var texto = $('#actualizacionSubModulos').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    console.log(data);

    $.ajax({
        url: 'Submodulos/updateSubmodulo',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                $("#modalEditarSubModulo").modal('hide');
                tableSubmodulos.ajax.reload();
                alertify.success("Submodulo actualizado exitosamente");
                return false;
            } else {
                //alert("Error al insertar los datos");
                alertify.error("Error al actualizar el submodulo");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para actualizar el submodulo");
        }
    });
    return false;

}

//Funcion para llevar a cabo el registro de un sistema
function deleteSubModulo(id_submodule) {

    $.ajax({
        url: 'Submodulos/deleteSubmodulo',
        type: 'POST',
        data: ({datos: id_submodule}),
        success: function (response) {

            console.log(response);

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                tableSubmodulos.ajax.reload();
                alertify.success("Submodulo eliminado exitosamente");
                return false;
            } else {
                //alert("Error al insertar los datos");
                alertify.error("Error al eliminar el submodulo");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para eliminar el submodulo");
        }
    });
    return false;

}

function estadoSwitch(id_submodule, estado) {

    $.ajax({
        url: 'Submodulos/enableSubmodulo',
        type: 'POST',
        data: ({datos: id_submodule, estado: estado}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                //Función para recargar tabla
                tableSubmodulos.ajax.reload();
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

//Para DataTable
//Funciones para obtener información de los select
$(document).on('change', '#systemNameTable', function () {

    var id_sistema = $('select[name=systemNameTable]').val();

    if (id_sistema != "0") {
        $('#moduleNameTable').prop('disabled', false);

        $.ajax({
            url: 'Modulos/moduleListSelect',
            type: 'POST',
            data: ({data: id_sistema}),
            success: function (response) {

                //console.log(response);

                $('#moduleNameTable').empty();

                var modules = jQuery.parseJSON(response);
                //console.log(modules);
                var arreglo = modules.modulosDTO;
                //console.log(typeof (arreglo));
                arreglo = jQuery.parseJSON(arreglo);
                //console.log(typeof (arreglo));
                var $dropdown = $("select[name$='moduleNameTable']");
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
        $('#moduleNameTable').prop('disabled', 'disabled');
    }


});

var tableSubmodulos;
//Para DataTable
//Funciones para obtener información de los select
$(document).on('change', '#moduleNameTable', function () {

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


    var id_modulo = $('select[name=moduleNameTable]').val();

    if (id_modulo != "0") {

        console.log("entra" + " " + id_modulo);

        tableSubmodulos = $('#tableSubmodulos').DataTable({
            destroy: true,
            responsive: {
                details: false
            },
            ajax: {
                url: 'Submodulos/submoduleListTable',
                type: 'POST',
                data: ({id: id_modulo}),
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

                        return '<button id="btnUpdateSubModule" data-toggle="modal" data-target="#modalEditarSubModulo" class="btn btn-primary btn-sm buttonDt btn-ver"><i class="fa fa-search"></i></button> ' +
                            '' +
                            '<label class="switch switch-text switch-success switch-pill">\n' +
                            '<input id="btnEnableSubModule" type="' + estado + '" class="switch-input" checked="true">\n' +
                            '<span data-on="On" data-off="Off" class="switch-label"></span>\n' +
                            '<span class="switch-handle"></span>\n' +
                            '</label> ' +
                            '' +
                            '<button id="btnDeleteSubModule" class="btn btn-danger btn-sm buttonDt btn-elimina"><i class="fa fa-trash"></i></button>';

                    }
                },
                {
                    data: "idSubModule",
                    visible: false,
                    searchable: false
                },

                {data: "name"},
                {data: "controller"}

            ],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });

        $('#tableSubmodulos tbody').off('click', '#btnUpdateSubModule').on('click', '#btnUpdateSubModule', function () {
            var data = tableSubmodulos.row(this.closest('tr')).data();
            //console.log(data);
            document.getElementById('updateNameSubmodule').value = data.name;
            document.getElementById('updateNameController').value = data.controller;
            document.getElementById('idSubModuleUpdate').value = data.idSubModule;

        });

        $('#tableSubmodulos tbody').off('click', '#btnEnableSubModule').on('click', '#btnEnableSubModule', function () {
            var data = tableSubmodulos.row(this.closest('tr')).data();
            var id = data.idSubModule;
            var estado = data.enable;

            if (estado == 1) {

                var texto = "Desactivar";

            } else if (estado == 0) {

                var texto = "Activar";

            }

            alertify.confirm(texto + ' el submodulo seleccionado ', function () {
                    estadoSwitch(id, estado);
                }
                , function () {
                    alertify.error('Acción cancelada')
                });

        });

        $('#tableSubmodulos tbody').off('click', '#btnDeleteSubModule').on('click', '#btnDeleteSubModule', function () {
            var data = tableSubmodulos.row(this.closest('tr')).data();
            var id = data.idSubModule;

            alertify.confirm('Eliminar el submodulo seleccionado ', function () {
                    deleteSubModulo(id);
                }
                , function () {
                    alertify.error('Acción cancelada')
                });

        });

    }

});

