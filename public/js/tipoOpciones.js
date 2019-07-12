var tableTipoOpciones;
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
    //showSystems();
    //showSystemsTable();

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
            submoduleName: 'Falta seleccionar un submódulo',
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

    $('#systemNameTable').change(function(){
        var id_sistema = $('select[name=systemNameTable]').val();
        $('.listTableTipoOptions').hide();
        resetearSelect($('#moduleListTable'));
        resetearSelect($('#submoduleListTable'));
        resetearSelect($('#optionNameTable'));
        $('#moduleListTable').prop('disabled', false);
        $('#submoduleListTable').prop('disabled', true);
        $('#optionNameTable').prop('disabled', true);
        if (id_sistema != "") {
            $.ajax({
                url: 'Modulos/moduleListSelect',
                type: 'POST',
                data: ({data: id_sistema}),
                success: function (response) {
                    var modules = jQuery.parseJSON(response);
                    var arreglo = modules.modulosDTO;
                    arreglo = jQuery.parseJSON(arreglo);
                    var $dropdown = $("select[name$='moduleListTable']");;
                    for (var i = arreglo.length - 1; i >= 0; i--) {
                        $dropdown.append($("<option />").val(arreglo[i].idModule).text(arreglo[i].name));
                    }
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de módulos");
                }
            });

        } else {
            $('#moduleListTable').prop('disabled', 'disabled');

        }
    });

    $('#moduleListTable').change(function () {
        var id_module = $('select[name=moduleListTable]').val();
        $('.listTableTipoOptions').hide();
        resetearSelect($('#submoduleListTable'));
        resetearSelect($('#optionNameTable'));
        $('#submoduleListTable').prop('disabled', false);
        $('#optionNameTable').prop('disabled', true);
        if (id_module != "") {
            $('#submoduleListTable').prop('disabled', false);
            $.ajax({
                url: 'Submodulos/submoduleListSelect',
                type: 'POST',
                data: ({data: id_module}),
                success: function (response) {
                    var modules = jQuery.parseJSON(response);
                    var arreglo = modules.submodulosDTO;
                    arreglo = jQuery.parseJSON(arreglo);
                    var $dropdown = $("select[name$='submoduleListTable']");
                    for (var i = arreglo.length - 1; i >= 0; i--) {
                        $dropdown.append($("<option />").val(arreglo[i].idSubModule).text(arreglo[i].name));
                    }
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de submódulos");
                }
            });
        } else {
            $('#submoduleListTable').prop('disabled', 'disabled');
        }
    });

    $('#submoduleListTable').change(function(){
        var id_submodule = $('select[name=submoduleListTable]').val();
        $('.listTableTipoOptions').hide();
        resetearSelect($('#optionNameTable'));
        $('#optionNameTable').prop('disabled', false);
        if (id_submodule != "") {
            $.ajax({
                url: 'Opciones/opcionesListSelect',
                type: 'POST',
                data: ({data: id_submodule}),
                success: function (response) {
                    var modules = jQuery.parseJSON(response);
                    var arreglo = modules.opcionesDTO;
                    arreglo = jQuery.parseJSON(arreglo);
                    var $dropdown = $("select[name$='optionNameTable']");
                    for (var i = arreglo.length - 1; i >= 0; i--) {
                        $dropdown.append($("<option />").val(arreglo[i].idModuleOption).text(arreglo[i].name));
                    }
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de submódulos");
                }
            });

        } else {
            $('#optionNameTable').prop('disabled', 'disabled');
        }
    });

    $('#optionNameTable').change(function(){
        $('.listTableTipoOptions').show();
        var id_opcion = $('select[name=optionNameTable]').val();
        if (id_opcion != "") {
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

                            return '<button id="btnUpdateTipoOption" data-toggle="modal" data-target="#modalEditarTipoOpciones" class="btn btn-outline-primary btn-sm btn-rounded btn-custom mr-1"><i class="fas fa-edit"></i></button> ' +
                                '' +
                                '<label class="switch switch-text switch-success switch-pill">' +
                                '<input id="btnEnableTipoOption" type="' + estado + '" class="switch-input" checked="true">' +
                                '<span data-on="On" data-off="Off" class="switch-label"></span>' +
                                '<span class="switch-handle"></span>' +
                                '</label> ';

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

    $('#systemName').change(function(){
        var id_sistema = $('select[name=systemName]').val();
        resetearSelect($('#moduleName'));
        resetearSelect($('#submoduleName'));
        resetearSelect($('#optionName'));
        $('#moduleName').prop('disabled', false);
        $('#submoduleName').prop('disabled', true);
        $('#optionName').prop('disabled', true);
        if (id_sistema != "") {
            $.ajax({
                url: 'Modulos/moduleListSelect',
                type: 'POST',
                data: ({data: id_sistema}),
                success: function (response) {
                    var modules = jQuery.parseJSON(response);
                    var arreglo = modules.modulosDTO;
                    arreglo = jQuery.parseJSON(arreglo);
                    var $dropdown = $("select[name$='moduleName']");
                    for (var i = arreglo.length - 1; i >= 0; i--) {
                        $dropdown.append($("<option />").val(arreglo[i].idModule).text(arreglo[i].name));
                    }
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de módulos");
                }
            });
        } else {
            $('#moduleName').prop('disabled', 'disabled');
        }
    });

    $('#moduleName').change(function () {
        var id_module = $('select[name=moduleName]').val();
        resetearSelect($('#submoduleName'));
        resetearSelect($('#optionName'));
        $('#submoduleName').prop('disabled', false);
        $('#optionName').prop('disabled', true);
        if (id_module != "") {
            $.ajax({
                url: 'Submodulos/submoduleListSelect',
                type: 'POST',
                data: ({data: id_module}),
                success: function (response) {
                    var modules = jQuery.parseJSON(response);
                    var arreglo = modules.submodulosDTO;
                    arreglo = jQuery.parseJSON(arreglo);
                    var $dropdown = $("select[name$='submoduleName']");
                    for (var i = arreglo.length - 1; i >= 0; i--) {
                        $dropdown.append($("<option />").val(arreglo[i].idSubModule).text(arreglo[i].name));
                    }

                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de submódulos");
                }
            });

        } else {
            $('#submoduleName').prop('disabled', 'disabled');
        }
    });

    //Funciones para obtener información de los select
    $('#submoduleName').change(function(){
        var id_submodule = $('select[name=submoduleName]').val();
        resetearSelect($('#optionName'));
        $('#optionName').prop('disabled', false);
        if (id_submodule != "") {
            $.ajax({
                url: 'Opciones/opcionesListSelect',
                type: 'POST',
                data: ({data: id_submodule}),
                success: function (response) {
                    var modules = jQuery.parseJSON(response);
                    var arreglo = modules.opcionesDTO;
                    arreglo = jQuery.parseJSON(arreglo);
                    var $dropdown = $("select[name$='optionName']");
                    for (var i = arreglo.length - 1; i >= 0; i--) {
                        $dropdown.append($("<option />").val(arreglo[i].idModuleOption).text(arreglo[i].name));
                    }
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de submódulos");
                }
            });
        } else {
            $('#optionName').prop('disabled', 'disabled');
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
            cleanNewTipoOption();
            $('#registrar').show();
            $('#listarTipoOpciones').hide();
            break;
        case 2:
            cleanListTipoOptions();
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

function cleanNewTipoOption(){
   $('#registroTipoOpciones')[0].reset();
   resetearSelect($('#systemName'));
   resetearSelect($('#moduleName'));
   resetearSelect($('#submoduleName'));
   resetearSelect($('#optionName'));
   showSystems();
}

function cleanListTipoOptions(){
   resetearSelect($('#systemNameTable'));
   resetearSelect($('#moduleListTable'));
   resetearSelect($('#submoduleListTable'));
   resetearSelect($('#optionNameTable'));
   showSystemsTable();
   $('.listTableTipoOptions').hide();

}

function resetearSelect(select){
    select.empty();
    select.append($('<option>', { value : '' , text: 'Selecciona una opción' }));
    select.select2();
}

//Funcion para llevar a cabo el registro de un sistema
function saveRegistroTipoOpciones() {
    var texto = $('#registroTipoOpciones').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

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
                                cleanNewTipoOption();
                                alertify.success("Tipo opción registrado exitosamente");
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
                alertify.warning("No has seleccionado un submódulo");
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
                alertify.success('Estado modificado');
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
