var tableModulos;
$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');
    redireccionarVista(2);

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
            nameModuleMenu: 'Falta introducir nombre del módulo menú'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            saveRegistroModulos();
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
            updateNameModuleMenu: 'Falta introducir nombre del módulo menú'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            updateModulos();
        }
    });

    $('#systemNameTable').change(function(){
      var id_sistema = this.value;
      if (id_sistema != "") {
          $('.listModulosSystem').show();
          tableModulos = $('#tableModulos').DataTable({
              destroy: true,
              ajax: {
                  url: 'Modulos/moduleListTable',
                  type: 'POST',
                  data: ({id: id_sistema}),
                  dataSrc: "",
              },
              columns: [
                  {data: "idModule"},
                  {data: "name"},
                  {data: "description"},
                  {data: "moduleMenu"},
                  {
                      data: null,
                      render: function (data, type, row) {
                          if (data.enable == 1) {
                              var estado = "checkbox";
                          } else if (data.enable == 0) {
                              var estado = "";
                          }
                          return '<button id="btnUpdateModule" data-toggle="modal" data-target="#modalEditarModulo" class="btn btn-outline-primary btn-sm btn-rounded btn-custom mr-3"><i class="fas fa-edit"></i></button> ' +
                              '' +
                              '<label class="switch switch-text switch-success switch-pill">' +
                              '<input id="btnEnableModule" type="' + estado + '" class="switch-input" checked="true">' +
                              '<span data-on="On" data-off="Off" class="switch-label"></span>' +
                              '<span class="switch-handle"></span>' +
                              '</label> ';
                      }
                  }
              ],
              fixedColumns: true,
              language: {
                  "url": "public/plugins/DataTables/Spanish.json",
              }
          });

          $('#tableModulos tbody').off('click', '#btnUpdateModule').on('click', '#btnUpdateModule', function () {
              var data = tableModulos.row(this.closest('tr')).data();
              if(data==undefined){
                data = tableModulos.row( this ).data();
              }
              $('#updateNameModule').val(data.name);
              $('#updateDescription').val(data.description);
              $('#updateNameModuleMenu').val(data.moduleMenu);
              $('#idModuleUpdate').val(data.idModule);
          });

          $('#tableModulos tbody').off('click', '#btnEnableModule').on('click', '#btnEnableModule', function () {
              var data = tableModulos.row(this.closest('tr')).data();
              if(data==undefined){
                data = tableModulos.row( this ).data();
              }
              if (data.enable == 1) {
                  var texto = "Desactivar";
              } else if (data.enable == 0) {
                  var texto = "Activar";
              }
              alertify.confirm(texto + ' el módulo seleccionado ', function () {
                  estadoSwitch(data.idModule, data.enable);
              },function () {
                  tableModulos.ajax.reload(null,false);
                  //alertify.error('Acción cancelada')
              });
          });

          $('#tableModulos tbody').off('click', '#btnDeleteModule').on('click', '#btnDeleteModule', function () {
              var data = tableModulos.row(this.closest('tr')).data();
              if(data==undefined){
                data = tableModulos.row( this ).data();
              }
              alertify.confirm('Eliminar el módulo seleccionado ', function () {
                  deleteModulo(data.idModule);
              },function () {
                  //alertify.error('Acción cancelada')
              });
          });
      }else{
        $('.listModulosSystem').hide();
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
            cleanAddModulo();
            $('#listarModulos').hide();
            $('#registrar').show();
            break;
        case 2:
            cleanListModulos();
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

function cleanAddModulo(){
   $('#registroModulos')[0].reset();
   resetearSelect($('#systemName'));
   showSystems();

}

function resetearSelect(select){
     select.empty();
     select.append($('<option>', { value : '' , text: 'Selecciona una opción' }));
     select.select2();
}



function cleanListModulos(){
    resetearSelect($('#systemNameTable'));
    $('.listModulosSystem').hide();
    showSystemsTable();
}


//Funcion para llevar a cabo el registro de un sistema
function saveRegistroModulos() {
    var texto = $('#registroModulos').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });
    if (data.systemName != '') {
        $.ajax({
            url: 'Modulos/registrarModulo',
            type: 'POST',
            data: ({datos: data}),
            success: function (response) {
                var obj = jQuery.parseJSON(response);
                if (obj.respuesta == 200) {
                    cleanAddModulo();
                    alertify.success("Módulo registrado exitosamente");
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
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                $("#modalEditarModulo").modal('hide');
                //Recargar tabla
                tableModulos.ajax.reload(null,false);
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
                tableModulos.ajax.reload(null,false);
                alertify.success("Módulo eliminado exitosamente");
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
                tableModulos.ajax.reload(null,false);
                if(estado==1){
                    alertify.success('Módulo desactivado');
                }else{
                    alertify.success('Módulo activado');
                }
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
        async: false,
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            var systems = jQuery.parseJSON(response.sistemasDTO);
            var $dropdown = $("select[name$='systemName']");
            for (var i = systems.length - 1; i >= 0; i--) {
                $dropdown.append($("<option />").val(systems[i].idSystem).text(systems[i].name));
            }
            $dropdown.select2();
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
        async: false,
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            var systems = jQuery.parseJSON(response.sistemasDTO);
            var $dropdown = $("select[name$='systemNameTable']");
            for (var i = systems.length - 1; i >= 0; i--) {
                $dropdown.append($("<option />").val(systems[i].idSystem).text(systems[i].name));
            }
            $dropdown.select2();
        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });
    return false;
}
