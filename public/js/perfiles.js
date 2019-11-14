var tableListadoPerfiles;
$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');
    redireccionarVista(2);

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="registroPerfiles"]').validate({
        rules: {
            systemName: 'required',
            namePerfil: 'required'
        },
        messages: {
            systemName: 'Falta seleccionar un sistema',
            namePerfil: 'Falta ingresar nombre al perfíl'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            saveRegistroPerfiles();
        }
    });

    $('#systemNameTable').change(function(){
        var id_sistema = $('select[name=systemNameTable]').val();
        $('.listarPerfiles').hide();
        if (id_sistema != "") {
            $('.listarPerfiles').show();
            tableListadoPerfiles = $('#tableListadoPerfiles').DataTable({
                destroy: true,
                ajax: {
                    url: 'Perfiles/perfilesListTable',
                    type: 'POST',
                    data: ({id: id_sistema}),
                    dataSrc: "",
                },
                columns: [
                    {data: "idPerfil"},
                    {data: "perfil"},
                    {data: "usuarioConPerfil"},
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button id="btnUpdatePerfil" data-toggle="modal" onclick="editarPerfil('+data.idPerfil+',\''+data.perfil+'\')" data-target="#modalEditarPerfil" class="btn btn-outline-primary btn-sm btn-rounded btn-custom mr-1 buttonDt"><i class="fas fa-edit"></i></button>'+
                             ' <button id="btnUsuariosConPerfil" class="btn btn-outline-info btn-sm btn-rounded btn-custom"><i class="fas fa-search"></i></button>'+
                             ' <button id="btnDeletePerfil" class="btn btn-outline-danger btn-sm btn-rounded btn-custom"><i class="fas fa-trash-alt"></i></button>';
                        }
                    }
                ],
                fixedColumns: true,
                language: {
                    "url": "public/plugins/DataTables/Spanish.json",
                }
            });

            $('#tableListadoPerfiles tbody').off('click', '#btnUpdatePerfil').on('click', '#btnUpdatePerfil', function () {
                var data = tableListadoPerfiles.row(this.closest('tr')).data();
                if(data==undefined){
                  data = tableListadoPerfiles.row( this ).data();
                }
            });

            $('#tableListadoPerfiles tbody').off('click', '#btnDeletePerfil').on('click', '#btnDeletePerfil', function () {
                var data = tableListadoPerfiles.row(this.closest('tr')).data();
                if(data==undefined){
                  data = tableListadoPerfiles.row( this ).data();
                }
                alertify.confirm('Eliminar el perfil seleccionado ', function () {
                    deletePerfil(data.idPerfil);
                }
                , function () {
                    tableListadoPerfiles.ajax.reload(null,false);
                    //alertify.error('Acción cancelada')
                });

            });

            $('#tableListadoPerfiles tbody').off('click', '#btnUsuariosConPerfil').on('click', '#btnUsuariosConPerfil', function () {
                var data = tableListadoPerfiles.row(this.closest('tr')).data();
                if(data==undefined){
                  data = tableListadoPerfiles.row( this ).data();
                }
                console.log(data);
                tablaUsuarios(data.idSystem,data.idPerfil);
                $('#modaltableUsuarios').modal('show');
            });


        }
    });

    $('#systemName').change(function () {
        var id_sistema = $('select[name=systemName]').val();
        if (id_sistema != "") {
            $('#modulospo').empty();
            $('.opcsPerfil').show();
            //$('.opcsPerfil').click();
            var $dropdownModulos = $("#modulospo");
            var $dropdownSubModulos = $("div[name$='submodulos']");
            var $dropdownOpciones = $("div[name$='opciones']");
            var $dropdownTipoOpciones = $("div[name$='tipoOpciones']");
            despliege(id_sistema,$dropdownModulos,null);
        }else{
            $('.opcsPerfil').hide();
        }

    });
});

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
//Función para mostrar un formúlario en especifico
function redireccionarEstatus(optionMenu) {
    switch (optionMenu) {
        case 1:
            $('#nuevoPerfil').show();
            $('#listarPerfiles').hide();
            break;
        case 2:
            $('#nuevoPerfil').hide();
            $('#listarPerfiles').show();
            break;
    }
}

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarVista(optionMenu) {
    // alert(optionMenu);
    switch (optionMenu) {
        case 1://Captura
            cleanNewPerfil();
            $('#nuevoPerfil').show();
            $('#listarPerfiles').hide();
            break;
        case 2:
            $('#nuevoPerfil').hide();
            cleanListarPerfiles();
            $('#listarPerfiles').show();
            //redireccionarEstatus(1);
            break;
        default:
            //alert("default");
            break;
    }
    return false;
}

function cleanNewPerfil(){
    resetearSelect($('#systemName'));
    showSystems();
    $('#namePerfil').val('');
    $('.opcsPerfil').hide();
}

function cleanListarPerfiles(){
    resetearSelect($('#systemNameTable'));
    showSystemsTable();
    $('.listarPerfiles').hide();
}

function resetearSelect(select){
     select.empty();
     select.append($('<option>', { value : '' , text: 'Selecciona una opción' }));
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
            $dropdown.select2();

        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });
    return false;
}


//Funcion para llevar a cabo el registro de un sistema
function saveRegistroPerfiles() {
    var texto = $('#registroPerfiles').serializeArray();
    var data = {};
    var modulos = {};
    $(texto).each(function (index, obj) {
        if (data[obj.name] != undefined) {
            data[obj.name] += "," + obj.value;
        } else {
            data[obj.name] = obj.value;
        }
    });
    if(data.systemName != 0){
    	if (data.idModuleOption != undefined) {
        $.ajax({
            url: 'Perfiles/registrarPerfil',
            type: 'POST',
            data: ({datos: data}),
            success: function (response) {
                var obj = jQuery.parseJSON(response);
                if (obj.respuesta == 200) {
                    cleanNewPerfil();
                    alertify.success("Perfil registrado exitosamente");
                    return false;
                } else {
                    //alert("Error al insertar los datos");
                    alertify.error("Error al registrar el perfil");
                }
            },
            error: function () {
                alertify.error("Error al obtener el servicio para registrar el perfil");
            }
        });
        return false;
      } else {
        alertify.warning("No has marcado ninguna opción");
      }
    }else{
    	alertify.warning("No has seleccionado ningún sistema");
    }
}

//Función para vaciar formularios depués de cada acción
function resetForm() {
    $('#registroPerfiles')[0].reset();
}

//JS para los checkbox
$(document).ready(function () {
    $('input[type="checkbox"]').change(function (e) {
        var checked = $(this).prop("checked"),
            container = $(this).parent(),
            siblings = container.siblings();
        container.find('input[type="checkbox"]').prop({
            indeterminate: false,
            checked: checked
        });
        function checkSiblings(el) {
            var parent = el.parent().parent(),
                all = true;
            el.siblings().each(function () {
                return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
            });
            if (all && checked) {
                parent.children('input[type="checkbox"]').prop({
                    indeterminate: false,
                    checked: checked
                });
                checkSiblings(parent);
            } else if (all && !checked) {
                parent.children('input[type="checkbox"]').prop("checked", checked);
                parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
                checkSiblings(parent);
            } else {
                el.parents("li").children('input[type="checkbox"]').prop({
                    indeterminate: true,
                    checked: false
                });
            }
        }
        checkSiblings(container);
    });
});

//Listado de perfiles
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

function editarPerfil(idPerfil,perfil){
    if (id_sistema != "0"){
        $('.perfil').val(perfil);
        var id_sistema = $('select[name=systemNameTable]').val();
        $('#modulos').empty();
        $('#modulospoEditar').empty();
        $('.idPerfilEdit').val(idPerfil);
        var opciones=getOpciones(idPerfil);
        console.log(opciones);
        if(opciones!=null){
          opciones=obtenerArrayOpciones(opciones);
          console.log(opciones);
        }
        var dropdownModulos = $("#modulospoEditar");
        despliege(id_sistema,dropdownModulos,opciones);
    }
}

function despliege(idSistema,$dropdownModulos,opciones){
    $.ajax({
        url: 'Modulos/getDespliege',
        type: 'POST',
        async:false,
        data: ({idSystem:idSistema}),
        success: function (response) {
            var br = "<br>";
            var salida = "</div>";
            var res=jQuery.parseJSON(response);
            if(res.respuesta==200){
                var cont = 0;
                var permisos = "";
                mod=jQuery.parseJSON(res.modulosDTO);
                $.each(mod,function(modulos,modulo){
                    permisos = permisos+"<br><br><hr><div><h2 align='center'>"+modulo[0].name+"</h2></div><hr>";
                    $.each(modulo.subModulos,function(subs,sub){
                        if(cont==0){
                            permisos = permisos+"<div class='row form-group'><div class='col-md-6 divListadoPermisos' align='center'><label for='description' class='form-control-label'><h3>"+sub[0].name+"</h3></label>";
                            cont++;
                        }else{
                            permisos = permisos+"<div class='col-md-6 divListadoPermisos' align='center'><label for='description' class='form-control-label'><h3>"+sub[0].name+"</h3></label>";
                            cont++;
                        }
                        $.each(sub.opcion,function(opcs,opc){
                            if(opciones!=null){
                                if(jQuery.inArray(opc[0].idModuleOption, opciones)!=-1){
                                    var opcItem="<input type='checkbox' name='idModuleOption' id='idModuleOption' value='"+ opc[0].idModuleOption +"' checked>";
                                }else{
                                    var opcItem="<input type='checkbox' name='idModuleOption' id='idModuleOption' value='"+ opc[0].idModuleOption +"'>";
                                }
                                permisos = permisos + "<label class='container paddingCheck'>" + opc[0].name + opcItem + "<span class='checkmarkPermisos'></span></label>";
                            }else{
                                var check = "<input type='checkbox' name='idModuleOption' id='idModuleOption' value='" + opc[0].idModuleOption + "'>" + opc[0].name + "<span class='checkmarkPermisos'></span></label>";
                                permisos = permisos+"<label class='container paddingCheck'>" + check;
                            }
                         });
                         if(cont==2){
                            cont = 0;
                            permisos = permisos + "</div></div><hr>";
                         }else{
                            permisos = permisos + "</div>";
                         }
                    });
                    permisos = permisos + "</div>";
                });
                $dropdownModulos.append(permisos);
            }
        },
        error: function () {
            alert("Error al obtener el servicio para cargar el contenido de los sistemas");
        }

    });
}

function editarPerfilOpciones(){
    alertify.confirm("¿Desea editar el perfil ?",
        function(){
          editarPerfilRealizar();
        },
        function(){
         //alertify.error('Acción cancelada');
        }
    );
}

function editarPerfilRealizar(){
    var form=$('#formPerfilEdit').serializeArray();;
    var data = {};
    $(form).each(function (index, obj) {
        if (data[obj.name] != undefined) {
            data[obj.name] += "," + obj.value;
        } else {
            data[obj.name] = obj.value;
        }
    });
    $.ajax({
        url: 'Perfiles/editarPerfil',
        type: 'POST',
        async: false,
        data: ({data: data}),
        success: function (response) {
              var respuesta=jQuery.parseJSON(response);
              if(respuesta.respuesta==200){
              	  tableListadoPerfiles.ajax.reload(null,false);
                  alertify.success('Perfil modificado exitosamente');
              }else{
                  alertify.error('Error al actualizar el perfil');
              }
        },
        error: function () {
            alert("Error al obtener el servicio para actualizar el perfil");
        }
     });
}

function obtenerArrayOpciones(opciones){
    var arr=[];
    for(i=0;i<opciones.length;i++){
        arr.push(opciones[i]['idModuleOption']);
    }
    return arr;
}

function getOpciones(idPerfil){
    var opciones;
    $.ajax({
            url: 'Perfiles/getOpciones',
            type: 'POST',
            async: false,
            data: ({data: idPerfil}),
            success: function (response) {
                  var respuesta=jQuery.parseJSON(response);
                  opciones=jQuery.parseJSON(respuesta.perfilesDTO);
            },
            error: function () {
                alert("Error al obtener el servicio para cargar el contenido de los sistemas");
            }
     });
    return opciones;
}

function deletePerfil(idPerfil){
    $.ajax({
        url: 'Perfiles/deletePerfil',
        type: 'POST',
        async: false,
        data: ({data: {idPerfil:idPerfil}}),
        success: function (response) {
              var respuesta=jQuery.parseJSON(response);
              if(respuesta.respuesta==200){
                alertify.success('Perfil eliminado');
                tableListadoPerfiles.ajax.reload();
              }else{
                alertify.error('Algo salio mal');
              }
        },
        error: function () {
            alert("Error al obtener el servicio para cargar el contenido de los sistemas");
        }
    });
}

function tablaUsuarios(id_system,idPerfil){
  // $.ajax({
  //   url: "Usuarios/usersListTable",
  //   type: 'POST',
  //   data: ({id: id_system,perfil:idPerfil}),
  //   success: function (response) {
  //     var obj = jQuery.parseJSON(response);
  //     console.log(obj);
  //   }
  // });
  tableUsuarios = $('#tableUsuarios').DataTable({
      destroy: true,
      ajax: {
          url: 'Usuarios/usersListTable',
          type: 'POST',
          data: ({id: id_system,perfil:idPerfil}),
          dataSrc: "",
      },
      columns: [
          {data: "idUser"},
          {
               data: null,
               render: function (data, type, full, meta) {
                 if(data.nombre == null){
                   return "<label style='color:blue;'>Usuario no registrado</label>";
                 }else{
                   return data.nombre+" "+data.apPaterno+" "+data.apMaterno;
                 }
               }
          },
          {data: "user"},
          {data: "Sistemas"},
          {
              data: null,
              render: function (data, type, full, meta) {
                if(data.Activo == "0" ){
                  return "<label style='color:blue;'>Inactivo</label>";
                }else{
                  return "Activo";
                }
              }
          }
      ],
      language: {
          "url": "public/plugins/DataTables/Spanish.json",
      }
  });
}
