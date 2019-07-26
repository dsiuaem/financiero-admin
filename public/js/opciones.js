var tableOpciones;
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
    //showSystems();
    //showSystemsTable();

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
            submoduleName: 'Falta seleccionar un submódulo',
            nameOption: 'Falta introducir nombre de la opción',
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

    $('#systemNameTable').change(function(){

        var id_sistema = $('select[name=systemNameTable]').val();
        $('.listTableOption').hide();
        resetearSelect($('#moduleListTable'));
        resetearSelect($('#submoduleListTable'));
        $('#moduleListTable').prop('disabled', false);
        $('#submoduleListTable').prop('disabled', true);

        if (id_sistema != "") {
            $.ajax({
                url: 'Modulos/moduleListSelect',
                type: 'POST',
                data: ({data: id_sistema}),
                success: function (response) {
                    var modules = jQuery.parseJSON(response);
                    var arreglo = modules.modulosDTO;
                    arreglo = jQuery.parseJSON(arreglo);
                    var $dropdown = $("select[name$='moduleListTable']");
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

    $('#moduleListTable').change(function(){
        var id_module = $('select[name=moduleListTable]').val();
        $('.listTableOption').hide();
        resetearSelect($('#submoduleListTable'));
        $('#submoduleListTable').prop('disabled', false);
        if (id_module != "") {
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


    $(document).on('change', '#submoduleListTable', function () {

        var id_submodulo = $('select[name=submoduleListTable]').val();
        $('.listTableOption').hide();
        if (id_submodulo != "") {
            $('.listTableOption').show();
            tableOpciones = $('#tableOpciones').DataTable({
                destroy: true,
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
                            return '<button id="btnUpdateOption" data-toggle="modal" data-target="#modalEditarOpciones" class="btn btn-outline-primary btn-sm btn-rounded btn-custom mr-1"><i class="fas fa-edit"></i></button> ' +
                                '' +
                                '<label class="switch switch-text switch-success switch-pill">' +
                                '<input id="btnEnableOption" type="' + estado + '" class="switch-input" checked="true">' +
                                '<span data-on="On" data-off="Off" class="switch-label"></span>' +
                                '<span class="switch-handle"></span>' +
                                '</label> ';
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
                        tableOpciones.ajax.reload();
                        alertify.error('Acción cancelada')
                    });
            });

            /*$('#tableOpciones tbody').off('click', '#btnDeleteOption').on('click', '#btnDeleteOption', function () {
                var data = tableOpciones.row(this.closest('tr')).data();
                var id = data.idModuleOption;
                alertify.confirm('Eliminar la opción seleccionada ', function () {
                        deleteOpcion(id);
                    }
                    , function () {
                        alertify.error('Acción cancelada')
                    });

            });*/

        }

    });

    $('#systemName').change(function() {
        var id_sistema = $('select[name=systemName]').val();
        resetearSelect($('#submoduleName'));
        resetearSelect($('#moduleName'));
        $('#moduleName').prop('disabled', false);
        $('#submoduleName').prop('disabled',true);
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
        $('#submoduleName').prop('disabled', false);
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
            cleanNewOptionSystem();
            $('#registrar').show();
            $('#listarOpciones').hide();
            break;
        case 2:
            cleanListOpciones();
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

function cleanNewOptionSystem(){
    $('#registroOpciones')[0].reset();
    resetearSelect($('#systemName'));
    resetearSelect($('#moduleName'));
    resetearSelect($('#submoduleName'));
    showSystems();
}

function resetearSelect(select){
    select.empty();
    select.append($('<option>', { value : '' , text: 'Selecciona una opción' }));
    select.select2();
}

function cleanListOpciones(){
    resetearSelect($('#systemNameTable'));
    resetearSelect($('#moduleListTable'));
    resetearSelect($('#submoduleListTable'));
    $('.listTableOption').hide();
    showSystemsTable();
}

//Funcion para llevar a cabo el registro de un sistema
function saveRegistroOpciones() {
    var texto = $('#registroOpciones').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

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
                            cleanNewOptionSystem();
                            alertify.success("Opción registrada exitosamente");
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
                alertify.success('Estado modificado');
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
