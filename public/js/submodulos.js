var tableSubmodulos;
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
            nameSubmodule: 'Falta introducir un nombre al submódulo',
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
            updateNameSubmodule: 'Falta introducir un nombre al submódulo',
            updateNameController: 'Falta introducir nombre al controlador'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            updateSubModulos();

        }
    });

    $('#systemNameTable').change(function(){
      var id_sistema = $('select[name=systemNameTable]').val();
      $('.tableSubModulosSystem').hide();
       resetearSelect($('#moduleNameTable'));
      if (id_sistema != "") {
          //$('.tableSubModulosSystem').hide();
          $('#moduleNameTable').prop('disabled', false);

          $.ajax({
              url: 'Modulos/moduleListSelect',
              type: 'POST',
              data: ({data: id_sistema}),
              success: function (response) {

                  resetearSelect($('#moduleNameTable'));
                  var modules = jQuery.parseJSON(response);
                  //console.log(modules);
                  var arreglo = modules.modulosDTO;
                  //console.log(typeof (arreglo));
                  arreglo = jQuery.parseJSON(arreglo);
                  //console.log(typeof (arreglo));
                  var $dropdown = $("select[name$='moduleNameTable']");
                  for (var i = arreglo.length - 1; i >= 0; i--) {
                      $dropdown.append($("<option />").val(arreglo[i].idModule).text(arreglo[i].name));
                  }

              },
              error: function () {
                  alert("Error al obtener el servicio para cargar lista de módulos");
              }
          });

      } else {
          $('#moduleNameTable').prop('disabled', 'disabled');
      }

    });


     $('#moduleNameTable').change(function(){
            var id_modulo = $('select[name=moduleNameTable]').val();
            $('.tableSubModulosSystem').hide();
            if (id_modulo != "") {
                $('.tableSubModulosSystem').show();
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
                    columns: [{
                        data: null,
                        render: function (data, type, row) {
                            if (data.enable == 1) {
                                var estado = "checkbox";
                            } else if (data.enable == 0) {
                                var estado = "";
                            }
                            return '<button id="btnUpdateSubModule" data-toggle="modal" data-target="#modalEditarSubModulo" class="btn btn-outline-primary btn-sm btn-rounded btn-custom mr-1"><i class="fas fa-edit"></i></button> ' +
                                '' +
                                '<label class="switch switch-text switch-success switch-pill">' +
                                '<input id="btnEnableSubModule" type="' + estado + '" class="switch-input" checked="true">' +
                                '<span data-on="On" data-off="Off" class="switch-label"></span>' +
                                '<span class="switch-handle"></span>' +
                                '</label>';
                                //'<button id="btnDeleteSubModule" class="btn btn-danger btn-sm buttonDt btn-elimina"><i class="fa fa-trash"></i></button>';
                         }
                    },
                    {
                        data: "idSubModule",
                        visible: false,
                        searchable: false
                    },
                    {data: "name"},
                    {data: "controller"}],
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

                alertify.confirm(texto + ' el submódulo seleccionado ', function () {
                        estadoSwitch(id, estado);
                    }
                    , function () {
                        alertify.error('Acción cancelada')
                    });

            });

            $('#tableSubmodulos tbody').off('click', '#btnDeleteSubModule').on('click', '#btnDeleteSubModule', function () {
                var data = tableSubmodulos.row(this.closest('tr')).data();
                var id = data.idSubModule;

                alertify.confirm('Eliminar el submódulo seleccionado ', function () {
                        deleteSubModulo(id);
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
        if (id_sistema != "") {
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
            cleanNewSubModule();
            $('#registrar').show();
            $('#listarSubmodulos').hide();
            break;
        case 2:
            cleanListSubModules();
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

function cleanNewSubModule(){
    $('#registroSubmodulos')[0].reset();
    resetearSelect($('#systemName'));
    resetearSelect($('#moduleName'));
    showSystems();
}

function resetearSelect(select){
     select.empty();
     select.append($('<option>', { value : '' , text: 'Selecciona una opción' }));
     select.select2();
     //select.val(null).trigger('change')
}

function cleanListSubModules(){
    resetearSelect($('#systemNameTable'));
    resetearSelect($('#moduleNameTable'));
    $('.tableSubModulosSystem').hide();
    showSystemsTable()
}

//Funcion para llevar a cabo el registro de un sistema
function saveRegistroSubModulos() {
    var texto = $('#registroSubmodulos').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    //console.log(data.systemName);

    if (data.systemName != 0) {

        if (data.moduleName != 0) {

            $.ajax({
                url: 'Submodulos/registrarSubmodulo',
                type: 'POST',
                data: ({datos: data}),
                success: function (response) {
                    var obj = jQuery.parseJSON(response);
                    console.log(obj);
                    if (obj.respuesta == 200) {
                        cleanNewSubModule();
                        alertify.success("Submódulo registrado exitosamente");
                    } else {
                        //alert("Error al insertar los datos");
                        alertify.error("Error al registrar el submodulo");
                    }
                },
                error: function () {
                    alertify.error("Error al obtener el servicio para registrar el submódulo");
                }
            });
            return false;

        } else {

            alertify.warning("No has seleccionado un módulo");

        }

    } else {
        alertify.warning("No has seleccionado un sistema");
    }

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
                alertify.success("Submódulo actualizado exitosamente");
                return false;
            } else {
                //alert("Error al insertar los datos");
                alertify.error("Error al actualizar el submódulo");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para actualizar el submódulo");
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
                alertify.success("Submódulo eliminado exitosamente");
                return false;
            } else {
                //alert("Error al insertar los datos");
                alertify.error("Error al eliminar el submódulo");
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para eliminar el submódulo");
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
                alertify.success("Cambio de estado realizado");
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
