var tableTipoOpciones;
$(document).ready(function () {
    redireccionarVista(2);
    alertify.set('notifier', 'position', 'top-right');

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
                    var $dropdown = $("select[name$='moduleListTable']");;
                    for (var i = arreglo.length - 1; i >= 0; i--) {
                        $dropdown.append($("<option />").val(arreglo[i].idModule).text(arreglo[i].name));
                    }
                    $dropdown.select2();
                    $('.divmoduleListTable').show();
                    $('.divsubmoduleListTable').hide();
                    $('.divoptionNameTable').hide();
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de módulos");
                }
            });
        } else {
          $('.divmoduleListTable').hide();
          $('.divsubmoduleListTable').hide();
          $('.divoptionNameTable').hide();
        }
    });

    $('#moduleListTable').change(function () {
        var id_module = $('select[name=moduleListTable]').val();
        $('.listTableTipoOptions').hide();
        resetearSelect($('#submoduleListTable'));
        resetearSelect($('#optionNameTable'));
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
                    $('.divoptionNameTable').hide();
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de submódulos");
                }
            });
        } else {
          $('.divsubmoduleListTable').hide();
          $('.divoptionNameTable').hide();
        }
    });

    $('#submoduleListTable').change(function(){
        var id_submodule = $('select[name=submoduleListTable]').val();
        $('.listTableTipoOptions').hide();
        resetearSelect($('#optionNameTable'));
        if (id_submodule != "") {
            $.ajax({
                url: 'Opciones/opcionesListSelect',
                async: false,
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
                    $dropdown.select2();
                    $('.divoptionNameTable').show();
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de submódulos");
                }
            });

        } else {
            $('.divoptionNameTable').hide();
        }
    });

    $('#optionNameTable').change(function(){
        var id_opcion = $('select[name=optionNameTable]').val();
        if (id_opcion != "") {
          $('.listTableTipoOptions').show();

            $.ajax({
              url: "TipoOpciones/tipoOpcionesListTable",
              type: 'POST',
              data: ({id: id_opcion}),
              success: function (response) {
                var obj = jQuery.parseJSON(response);
                console.log(obj);
              }
            });

            tableTipoOpciones = $('#tableTipoOpciones').DataTable({
                destroy: true,
                ajax: {
                    url: 'TipoOpciones/tipoOpcionesListTable',
                    type: 'POST',
                    data: ({id: id_opcion}),
                    dataSrc: "",
                },
                dom: "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
                      "<'row'<'col-sm-12'tr>>" +
                      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                buttons: [
                    {
                        text: 'Cambiar orden',
                        className:'btn btn-custom btn-rounded btn-outline-cambiar mb-4 buttonDt ml-4 mt-3',
                        action: function () {
                            $('.titulo').html('CAMBIAR ORDEN TIPO OPCIONES');
                            listarOrden(id_opcion);
                            $('.btn_cancel').show();
                        }
                    }
                ],
                columns: [
                  {
                      data: "idTipoOption",
                      visible: false
                  },
                  {data: "name"},
                  {data: "tipo"},
                  {data: "order"},
                  {
                    data: null,
                    render: function (data, type, row) {
                      if (data.enable == 1) {
                        var estado = "checkbox";
                      } else if (data.enable == 0) {
                        var estado = "";
                      }
                      return '<button id="btnUpdateTipoOption" data-toggle="modal" data-target="#modalEditarTipoOpciones" class="btn btn-outline-primary btn-sm btn-rounded btn-custom mr-2"><i class="fas fa-edit"></i></button> ' +
                      '' +
                      '<label class="switch switch-text switch-success switch-pill">' +
                      '<input id="btnEnableTipoOption" type="' + estado + '" class="switch-input" checked="true">' +
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

            $('#tableTipoOpciones tbody').off('click', '#btnUpdateTipoOption').on('click', '#btnUpdateTipoOption', function () {
                var data = tableTipoOpciones.row( this.closest('tr') ).data();
                if(data==undefined){
                  data = tableTipoOpciones.row( this ).data();
                }
                $('input[type="checkbox"]#updateTypeTwo').iCheck('uncheck');
                $('input[type="checkbox"]#updateTypeOne').iCheck('uncheck');
                $("#updateTypeTwo").prop('disabled', false);
                $("#updateTypeOne").prop('disabled', false);
                if (data.tipo == 1) {
                    $('#updateTypeOne').iCheck('check');
                    $("#updateTypeTwo").prop('disabled', false);
                    $("#updateTypeTwo").prop('disabled', 'disabled');
                } else if (data.tipo == 2) {
                    $('#updateTypeTwo').iCheck('check');
                    $("#updateTypeOne").prop('disabled', false);
                    $("#updateTypeOne").prop('disabled', 'disabled');
                }
                $('#updateNameTypeOption').val(data.name);
                $('#idTipoOpcionesUpdate').val(data.idTipoOption);
            });

            $('#tableTipoOpciones tbody').off('click', '#btnEnableTipoOption').on('click', '#btnEnableTipoOption', function () {
                var data = tableTipoOpciones.row( this.closest('tr') ).data();
                if(data==undefined){
                  data = tableTipoOpciones.row( this ).data();
                }
                if (data.enable == 1) {
                    var texto = "Desactivar";
                } else if (data.enable == 0) {
                    var texto = "Activar";
                }
                alertify.confirm(texto + ' el tipo opción seleccionado ', function () {
                    estadoSwitch(data.idTipoOption, data.enable);
                }
                , function () {
                    tableTipoOpciones.ajax.reload(null,false);
                    //alertify.error('Acción cancelada')
                });
            });

            $('#tableTipoOpciones tbody').off('click', '#btnDeleteTipoOption').on('click', '#btnDeleteTipoOption', function () {
                var data = tableTipoOpciones.row( this.closest('tr') ).data();
                if(data==undefined){
                  data = tableTipoOpciones.row( this ).data();
                }
                alertify.confirm('Eliminar el tipo opción seleccionado ', function () {
                    deleteTipoOpcion(data.idTipoOption);
                }
                , function () {
                    //alertify.error('Acción cancelada')
                });
            });
        }else{
          $('.listTableTipoOptions').hide();
        }
    });

    $('#systemName').change(function(){
        var id_sistema = $('select[name=systemName]').val();
        resetearSelect($('#moduleName'));
        resetearSelect($('#submoduleName'));
        resetearSelect($('#optionName'));
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
                    $('.divoptionName').hide();
                    $('.btn-registra').prop('disabled',true);
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de módulos");
                }
            });
        } else {
          $('.divmoduleName').hide();
          $('.divsubmoduleName').hide();
          $('.divoptionName').hide();
          $('.divnameTypeOption').hide();
          $('.divcheck').hide();
          $('.btn-registra').prop('disabled',true);
        }
    });

    $('#moduleName').change(function () {
        var id_module = $('select[name=moduleName]').val();
        resetearSelect($('#submoduleName'));
        resetearSelect($('#optionName'));
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
                    $('.divoptionName').hide();
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de submódulos");
                }
            });
        } else {
          $('.divsubmoduleName').hide();
          $('.divoptionName').hide();
        }
    });

    //Funciones para obtener información de los select
    $('#submoduleName').change(function(){
        var id_submodule = $('select[name=submoduleName]').val();
        resetearSelect($('#optionName'));
        if (id_submodule != "") {
            $.ajax({
                url: 'Opciones/opcionesListSelect',
                async: false,
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
                    $dropdown.select2();
                    $('.divoptionName').show();
                    $('.divnameTypeOption').show();
                    $('.divcheck').show();
                    $('.btn-registra').prop('disabled',false);
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar lista de submódulos");
                }
            });
        } else {
            $('.divoptionName').hide();
            $('.divnameTypeOption').hide();
            $('.divcheck').hide();
            $('.btn-registra').prop('disabled',true);
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
            $('.divmoduleName').hide();
            $('.divsubmoduleName').hide();
            $('.divoptionName').hide();
            $('.divnameTypeOption').hide();
            $('.divcheck').hide();
            $('.btn-registra').prop('disabled',true);
            cleanNewTipoOption();
            $('#listarTipoOpciones').hide();
            $('#registrar').show();
            break;
        case 2:
            $('.divmoduleListTable').hide();
            $('.divsubmoduleListTable').hide();
            $('.divoptionNameTable').hide();
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
    if(data["typeOne"] == undefined && data["typeTwo"] == undefined){
      alertify.warning("Selecciona un tipo");
      return false;
    }
    console.log(data);
    if (data.systemName != 0) {
        if (data.moduleName != 0) {
            if (data.submoduleName != 0) {
                if (data.optionName != 0) {
                    $.ajax({
                        url: 'TipoOpciones/registrarTipoOpcion',
                        type: 'POST',
                        data: ({datos: data}),
                        success: function (response) {
                            var obj = jQuery.parseJSON(response);
                            if (obj.respuesta == 200) {
                                $('#nameTypeOption').val('');
                                $('input[type="checkbox"]').iCheck('uncheck');
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
    if(data["updateTypeOne"] == undefined && data["updateTypeTwo"] == undefined){
      alertify.warning("Selecciona un tipo");
      return false;
    }
    console.log(data);
    $.ajax({
        url: 'TipoOpciones/updateTipoOpcion',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                $("#modalEditarTipoOpciones").modal('hide');
                tableTipoOpciones.ajax.reload(null,false);
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
                tableTipoOpciones.ajax.reload(null,false);
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
                tableTipoOpciones.ajax.reload(null,false);
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

//#################################################################################
//Despliegue en DATATABLES
function showSystemsTable() {
    $.ajax({
        url: 'Sistemas/systemListSelect',
        type: 'POST',
        async: false,
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
      url: 'TipoOpciones/actualizarOrden',
      type: 'POST',
      data: ({datos: data}),
      success: function (response) {
          var obj = jQuery.parseJSON(response);
          if (obj.respuesta == 200) {
            $('#modalOrden').modal('hide');
              alertify.success("orden actualizado");
              tableTipoOpciones.ajax.reload(null,false);
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
    url: "TipoOpciones/tipoOpcionesListTable",
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
        html += "<li class='ui-state-highlight' id='"+i+"'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>"+obtener[i].name;
        html += "<input type='hidden' class='form-control' name='idTemp' value='"+obtener[i].idTipoOption+"'>";
        html += "</li>";
        html += "<input type='hidden' name='orden' class='form-control' value='"+obtener[i].order+"'>";
      }
      $('.ordenLista').append(html);
    }
  });
  return false;
}
