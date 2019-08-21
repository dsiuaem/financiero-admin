var tableSubmodulos;
$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');
    redireccionarVista(2);

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
          $('.divmoduleNameTable').hide();
          resetearSelect($('#moduleNameTable'));
          $.ajax({
              url: 'Modulos/moduleListSelect',
              type: 'POST',
              data: ({data: id_sistema}),
              success: function (response) {
                  var modules = jQuery.parseJSON(response);
                  var arreglo = modules.modulosDTO;
                  arreglo = jQuery.parseJSON(arreglo);
                  var $dropdown = $("select[name$='moduleNameTable']");
                  for (var i = arreglo.length - 1; i >= 0; i--) {
                      $dropdown.append($("<option />").val(arreglo[i].idModule).text(arreglo[i].name));
                  }
                  $dropdown.select2();
                  $('.divmoduleNameTable').show();
              },
              error: function () {
                  alert("Error al obtener el servicio para cargar lista de módulos");
              }
          });
      } else {
          $('.divmoduleNameTable').hide();
      }
    });


     $('#moduleNameTable').change(function(){
        var id_modulo = $('select[name=moduleNameTable]').val();
        if (id_modulo != "") {
          $('.tableSubModulosSystem').show();

          $.ajax({
            url: "Submodulos/submoduleListTable",
            type: 'POST',
            data: ({id: id_modulo}),
            success: function (response) {
              var obj = jQuery.parseJSON(response);
              console.log(obj);
            }
          });

          tableSubmodulos = $('#tableSubmodulos').DataTable({
            destroy: true,
            ajax: {
                url: 'Submodulos/submoduleListTable',
                type: 'POST',
                data: ({id: id_modulo}),
                dataSrc: "",
            },
            dom: "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
                  "<'row'<'col-sm-12'tr>>" +
                  "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            buttons: [
                {
                    text: 'Cambiar orden',
                    className:'btn btn-custom btn-rounded btn-outline-cambiar mb-4 buttonDt ml-4 mt-3 cambiar-orden',
                    action: function () {
                        $('.titulo').html('CAMBIAR ORDEN SUBMODULOS');
                        listarOrden(id_modulo);
                        $('.btn_cancel').show();
                    }
                }
            ],
            columns: [
            {data: "idSubModule"},
            {data: "name"},
            {data: "controller"},
            {data: "order"},
            {
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
            }
            ],
            order: [[3, "asc"]],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });

        $('#tableSubmodulos tbody').off('click', '#btnUpdateSubModule').on('click', '#btnUpdateSubModule', function () {
            var data = tableSubmodulos.row(this.closest('tr')).data();
            if(data==undefined){
              data = tableSubmodulos.row( this ).data();
            }
            $('#updateNameSubmodule').val(data.name);
            $('#updateNameController').val(data.controller);
            $('#idSubModuleUpdate').val(data.idSubModule);

        });

        $('#tableSubmodulos tbody').off('click', '#btnEnableSubModule').on('click', '#btnEnableSubModule', function () {
            var data = tableSubmodulos.row(this.closest('tr')).data();
            if(data==undefined){
              data = tableSubmodulos.row( this ).data();
            }
            if (data.enable == 1){
                var texto = "Desactivar";
            }else if(data.enable == 0){
                var texto = "Activar";
            }
            alertify.confirm(texto + ' el submódulo seleccionado ', function () {
                estadoSwitch(data.idSubModule, data.enable);
            },function () {
                tableSubmodulos.ajax.reload(null,false);
                //alertify.error('Acción cancelada')
            });
        });

        $('#tableSubmodulos tbody').off('click', '#btnDeleteSubModule').on('click', '#btnDeleteSubModule', function () {
            var data = tableSubmodulos.row(this.closest('tr')).data();
            if(data==undefined){
              data = tableSubmodulos.row( this ).data();
            }
            alertify.confirm('Eliminar el submódulo seleccionado ', function () {
                deleteSubModulo(data.idSubModule);
            },function () {
                //alertify.error('Acción cancelada')
            });
        });
      }else{
        $('.tableSubModulosSystem').hide();
      }
    });

    $('#systemName').change(function(){
        var id_sistema = $('select[name=systemName]').val();
        resetearSelect($('#moduleName'));
        if (id_sistema != "") {
            $.ajax({
                url: 'Modulos/moduleListSelect',
                async: false,
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
                    $dropdown.select2();
                    $('.btn-registra').prop('disabled', false);
                    $('.divmoduleName').show();
                    $('.divnameSubmodule').show();
                    $('.divnameController').show();
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de módulos");
                }
            });
        } else {
          $('.btn-registra').prop('disabled', true);
          $('.divmoduleName').hide();
          $('.divnameSubmodule').hide();
          $('.divnameController').hide();
        }
    });

    $(".btn_cambiar_orden").click(function(e) {
      var ordenar = 1;
      var texto = $('#modalCambiarOrden').serializeArray();
      var data = {};
      $(texto ).each(function(index, obj){
        if (data[obj.name]!=undefined) {
            data[obj.name] += ","+obj.value;
        }else{
            data[obj.name] = obj.value;
        }
      });
      console.log(data);
      //return false;
      ordenarLista(data);
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
            $('.btn-registra').prop('disabled', true);
            $('#listarSubmodulos').hide();
            $('.divmoduleName').hide();
            $('.divnameSubmodule').hide();
            $('.divnameController').hide();
            cleanNewSubModule();
            $('#registrar').show();
            break;
        case 2:
            $('.divmoduleNameTable').hide();
            $('#registrar').hide();
            cleanListSubModules();
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
                        //cleanNewSubModule();
                        $('#nameSubmodule').val('');
                        $('#nameController').val('');
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
                tableSubmodulos.ajax.reload(null,false);
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
                tableSubmodulos.ajax.reload(null,false);
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
                tableSubmodulos.ajax.reload(null,false);
                alertify.success("Cambio de estado realizado");
                return false;
            } else {
                //alertify.error("Error en la acción");
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

function ordenarLista(data){
  $.ajax({
      url: 'Submodulos/actualizarOrden',
      type: 'POST',
      data: ({datos: data}),
      success: function (response) {
          var obj = jQuery.parseJSON(response);
          if (obj.respuesta == 200) {
            $('#modalOrden').modal('hide');
              alertify.success("orden actualizado");
              tableSubmodulos.ajax.reload(null,false);
          } else {
              alertify.error("Error al actualizar el orden");
          }
      },
      error: function () {
          alertify.error("Error al obtener el servicio para actualizar el orden");
      }
  });
}

function listarOrden(id_opcion) {
  $( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  } );
  $.ajax({
    url: "Submodulos/submoduleListTable",
    type: 'POST',
    data: {id:id_opcion},
    success: function (response) {
      var obtener = jQuery.parseJSON(response);
      $('.ordenLista').empty();
      var html = "";
      if(obtener.length>0){
        $('#modalOrden').modal('show');
      }
      for (var i = 0; i < obtener.length; i++) {
        html += "<li class='ui-state-highlight mt-1' id='"+i+"'><span class='mr-3 ml-2'></span>"+obtener[i].name;
        html += "<input type='hidden' class='form-control' name='idTemp' value='"+obtener[i].idSubModule+"'>";
        html += "</li>";
        html += "<input type='hidden' name='orden' class='form-control' value='"+obtener[i].order+"'>";
      }
      $('.ordenLista').append(html);
    }
  });
  return false;
}
