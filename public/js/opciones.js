var tableOpciones;
$(document).ready(function () {
    redireccionarVista(2);
    alertify.set('notifier', 'position', 'top-right');

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
                    var $dropdown = $("select[name$='moduleListTable']");
                    for (var i = arreglo.length - 1; i >= 0; i--) {
                        $dropdown.append($("<option />").val(arreglo[i].idModule).text(arreglo[i].name));
                    }
                    $dropdown.select2();
                    $('.divmoduleListTable').show();
                    $('.divsubmoduleListTable').hide();
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de módulos");
                }
            });
        }else{
          $('.divmoduleListTable').hide();
          $('.divsubmoduleListTable').hide();
        }
    });

    $('#moduleListTable').change(function(){
        var id_module = $('select[name=moduleListTable]').val();
        $('.listTableOption').hide();
        resetearSelect($('#submoduleListTable'));
        if (id_module != "") {
            $.ajax({
                url: 'Submodulos/submoduleListSelect',
                async: false,
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
                    $dropdown.select2();
                    $('.divsubmoduleListTable').show();
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de submódulos");
                }
            });
        }else{
          $('.divsubmoduleListTable').hide();
        }
    });


    $(document).on('change', '#submoduleListTable', function () {
        var id_submodulo = $('select[name=submoduleListTable]').val();
        if (id_submodulo != "") {
            $('.listTableOption').show();

            $.ajax({
              url: "Opciones/opcionesListTable",
              type: 'POST',
              data: ({id: id_submodulo}),
              success: function (response) {
                var obj = jQuery.parseJSON(response);
                console.log(obj);
              }
            });

            tableOpciones = $('#tableOpciones').DataTable({
                destroy: true,
                ajax: {
                    url: 'Opciones/opcionesListTable',
                    type: 'POST',
                    data: ({id: id_submodulo}),
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
                            $('.titulo').html('CAMBIAR ORDEN OPCIONES');
                            listarOrden(id_submodulo);
                            $('.btn_cancel').show();
                        }
                    }
                ],
                columns: [
                  {
                      data: "idModuleOption",
                      visible: false,
                      searchable: false
                  },
                  {data: "name"},
                  {data: "description"},
                  {data: "order"},
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
                  }
                ],
                order: [[3, "asc"]],
                fixedColumns: true,
                language: {
                    "url": "public/plugins/DataTables/Spanish.json",
                }
            });

            $('#tableOpciones tbody').off('click', '#btnUpdateOption').on('click', '#btnUpdateOption', function () {
                var data = tableOpciones.row(this.closest('tr')).data();
                if(data==undefined){
                  data = tableOpciones.row( this ).data();
                }
                $('#updateNameOption').val(data.name);
                $('#updateDescription').val(data.description);
                $('#idOpcionesUpdate').val(data.idModuleOption);

            });

            $('#tableOpciones tbody').off('click', '#btnEnableOption').on('click', '#btnEnableOption', function () {
                var data = tableOpciones.row(this.closest('tr')).data();
                if(data==undefined){
                  data = tableOpciones.row( this ).data();
                }
                var estado = data.enable;
                if (data.idModuleOption == 1) {
                    var texto = "Desactivar";
                } else if (data.idModuleOption == 0) {
                    var texto = "Activar";
                }
                alertify.confirm(texto + ' la opción seleccionada ', function () {
                  estadoSwitch(id, estado);
                }, function () {
                    tableOpciones.ajax.reload(null,false);
                    //alertify.error('Acción cancelada')
                });
            });
        }else{
            $('.listTableOption').hide();
        }
    });

    $('#systemName').change(function() {
        var id_sistema = $('select[name=systemName]').val();
        resetearSelect($('#submoduleName'));
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
                    $('.divmoduleName').show();
                    $('.divsubmoduleName').hide();
                    $('.btn-registra').prop('disabled', true);
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de módulos");
                }
            });
        }else{
          $('.divmoduleName').hide();
          $('.divsubmoduleName').hide();
          $('.divnameOption').hide();
          $('.divdescription').hide();
          $('.btn-registra').prop('disabled', true);
        }
    });

    $('#moduleName').change(function () {
        var id_module = $('select[name=moduleName]').val();
        resetearSelect($('#submoduleName'));
        if (id_module != "") {
            $.ajax({
                url: 'Submodulos/submoduleListSelect',
                async: false,
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
                    $dropdown.select2();
                    $('.divsubmoduleName').show();
                    $('.divnameOption').show();
                    $('.divdescription').show();
                    $('.btn-registra').prop('disabled', false);
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de submódulos");
                }
            });
        }else{
          $('.divsubmoduleName').hide();
          $('.divnameOption').hide();
          $('.divdescription').hide();
          $('.btn-registra').prop('disabled', true);
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
            $('.divmoduleName').hide();
            $('.divsubmoduleName').hide();
            $('.divnameOption').hide();
            $('.divdescription').hide();
            $('.btn-registra').prop('disabled', true);
            cleanNewOptionSystem();
            $('#registrar').show();
            $('#listarOpciones').hide();
            break;
        case 2:
            $('.divmoduleListTable').hide();
            $('.divsubmoduleListTable').hide();
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
                        var obj = jQuery.parseJSON(response);
                        if (obj.respuesta == 200) {
                            //cleanNewOptionSystem();
                            $('#nameOption').val('');
                            $('#description').val('');
                            alertify.success("Opción registrada exitosamente");
                        } else {
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
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                $("#modalEditarOpciones").modal('hide');
                tableOpciones.ajax.reload(null,false);
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
                tableOpciones.ajax.reload(null,false);
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
                tableOpciones.ajax.reload(null,false);
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
      url: 'Opciones/actualizarOrden',
      type: 'POST',
      data: ({datos: data}),
      success: function (response) {
          var obj = jQuery.parseJSON(response);
          if (obj.respuesta == 200) {
            $('#modalOrden').modal('hide');
              alertify.success("orden actualizado");
              tableOpciones.ajax.reload(null,false);
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
    url: "Opciones/opcionesListTable",
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
        html += "<input type='hidden' class='form-control' name='idTemp' value='"+obtener[i].idModuleOption+"'>";
        html += "</li>";
        html += "<input type='hidden' name='orden' class='form-control' value='"+obtener[i].order+"'>";
      }
      $('.ordenLista').append(html);
    }
  });
  return false;
}
