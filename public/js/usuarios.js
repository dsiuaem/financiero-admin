var tableUsuarios;
var id_usuarios;
var tableListadoAsignacionPerfiles;
var tableListadoAsignacionPerfilesExistentes;
var enSistemaPerfil;
var sinSistemaPerfil;

$(document).ready(function () {
  alertify.set('notifier', 'position', 'top-right');
  redireccionarVista(3);
    $('#checkboxPassword').click(function() {
        // this will contain a reference to the checkbox
        if (this.checked) {
            $('.editarPassword').show();
            $('#updatePassUsuario').prop('disabled',false);
            $('#password_repeat').prop('disabled',false);
            $('#checkboxPassword').val(1);
        } else {
            $('.editarPassword').hide();
            $('#updatePassUsuario').prop('disabled',true);
            $('#password_repeat').prop('disabled',true);
            $('#checkboxPassword').val(0);
        }
    });

    $('#editUserBtn').click(function(){
        var form = $('#actualizacionUsuario');
  	 	 	if(!form.valid()){
          return false;
  			}
        var texto = $('#actualizacionUsuario').serializeArray();
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
        $.ajax({
            url: 'Usuarios/editUser',
            type: 'POST',
            async:false,
            data: ({data:data}),
            success: function (response) {
               var respuesta = jQuery.parseJSON(response);
               if(respuesta.respuesta==200){
                  tableUsuarios.ajax.reload(null,false);
                  alertify.success('Usuario modificado');
                  $('#modalEditarUsuario').modal('hide');
                  $('#updatePassUsuario').val('');
                  $('#password_repeat').val('');
                  if($('#checkboxPassword').val()==1){
                     $('#checkboxPassword').click();
                  }
                  $('#actualizacionPerfil')[0].reset();
               }else{
                  alertify.error('Algo salio mal');
               }
            },
            error: function () {
                alert("Error al obtener el servicio para cargar la lista");
            }
        });
    });

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="registroUsuarios"]').validate({
        rules: {
            systemNameNewUser: 'required',
            userTypeNewUser: 'required',
            userNameR: 'required',
            userPass: 'required',
            confirmarCorreo: 'required',
            confirmarCorreo:{
              equalTo: "#userNameR"
            }
        },
        messages: {
            systemNameNewUser: 'Falta seleccionar un sistema',
            userTypeNewUser: 'Falta seleccionar un tipo de usuario',
            userNameR: 'Falta ingresar un correo válido',
            userPass: 'Falta ingresar contraseña al usuario',
            confirmarCorreo: {
              equalTo: 'Falta confirmar correo electrónico',
              email: 'correo electrónico no valido'
            }
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            saveRegistroUsuarios();
        }
    });

    $("#actualizacionUsuario").validate({
        rules: {
            email: 'required',
            updatePassUsuario: 'required',
            password_repeat: 'required',
            password_repeat:{
              equalTo: "#updatePassUsuario"
            }
        },
        messages: {
            email: 'El campo correo es requerido',
            updatePassUsuario: 'El campo contraseña es requerido',
            password_repeat: {
              equalTo: 'Contraseña incorrecta',
              password: 'contraseña no valido'
            }
        },
        submitHandler: function () {
        }
    });

    $('form[id="asignarPerfiles"]').validate({
        rules: {
            systemNameAsignarPerfil: 'required',
            perfilUser: 'required'
        },
        messages: {
            systemNameAsignarPerfil: 'Falta seleccionar un sistema',
            perfilUser: 'Falta seleccionar un tipo de usuario'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            saveAsignarperfil();
        }
    });

    $('#systemNameAsignarPerfil').change(function(){
        $('.infoUsers').hide();
        var id_sistema = $('select[name=systemNameAsignarPerfil]').val();
        resetearSelect($('#perfilUser'));

        if (id_sistema != "") {
            $.ajax({
                url: 'Perfiles/perfilesListSelect',
                type: 'POST',
                data: ({data: id_sistema}),
                success: function (response) {
                    var modules = jQuery.parseJSON(response);
                    var arreglo = modules.perfilesDTO;
                    arreglo = jQuery.parseJSON(arreglo);
                    var $dropdown = $("select[name$='perfilUser']");
                    for (var i = arreglo.length - 1; i >= 0; i--) {
                        $dropdown.append($("<option />").val(arreglo[i].idPerfil).text(arreglo[i].perfil));
                    }
                    $dropdown.select2();
                },
                error: function () {
                    alert("Error al obtener el servicio para cargar la lista");
                }
            });
        }
    });

    $('#perfilUser').change(function(){
        var id_system = $('select[name=systemNameAsignarPerfil]').val();
        var id_perfil = $('select[name=perfilUser]').val();
        $('.infoUsers').hide();
        if (id_perfil != "") {
            $('.infoUsers').show();
            $.ajax({
                url: 'Usuarios/usuariosListTableSinPerfil',
                type: 'POST',
                data: ({id_perfil: id_perfil, id_system: id_system}),
                success: function (response) {
                    console.log(response);
                },
                error: function () {
                    alertify.error("Error al obtener el servicio para cargar lista de sistemas");
                }
            });
            tableListadoAsignacionPerfiles = $('#tableListadoAsignacionPerfiles').DataTable({
               destroy: true,
               ajax: {
                  url: 'Usuarios/usuariosListTableSinPerfil',
                  type: 'POST',
                  data: ({id_perfil: id_perfil, id_system: id_system}),
                  dataSrc: "",
               },
               select: {
                  style: 'multi'
               },
               dom: 'Bfrtip',
                buttons: [{
                    text: 'Guardar',
                    className: 'btn btn-lg btn-outline btn-registra',
                    action: function () {
                        saveAsignarperfil();
                    }
                }],
                columns: [{
                    data: "idUser",
                    visible: false,
                    searchable: false
                },
                {data: "user"
                }],
                fixedColumns: true,
                    language: {
                       "url": "public/plugins/DataTables/Spanish.json",
                }
            });

            tableListadoAsignacionPerfilesExistentes = $('#tableListadoAsignacionPerfilesExistentes').DataTable({
                destroy: true,
                ajax: {
                    url: 'Usuarios/usuariosListTableConPerfil',
                    type: 'POST',
                    data: ({id_perfil: id_perfil, id_system: id_system}),
                    dataSrc: "",
                },
                columns: [{
                      data: "idUser",
                      visible: false,
                      searchable: false
                    },
                    {data: "user"
                }],
                fixedColumns: true,
                language: {
                    "url": "public/plugins/DataTables/Spanish.json",
                }
            });
        }
    });

    $('#systemNameListarUsuarios').change(function(){
        $('.listaUsuarios').hide();
        if ( this.value != "") {
            tablaUsuarios(this.value);
        }
    });


    $('#empleadoNewUser').change(function(){
        var idEmpleado=$('#empleadoNewUser').val();
        $.ajax({
            url: 'Usuarios/getEmpleado',
            async: false,
            type: 'POST',
            dataType: 'JSON',
            data:{idEmpleado},
            success: function (response) {
                if(response.respuesta==200){
                    var empleado=jQuery.parseJSON(response.empleadoList);
                    $('#userNameR').val(empleado[0].email);
                    $('#userName').val(empleado[0].email);
                    $('.divName').show();
                    $('.divPassword').show();
                    if($('#userNameR').val()==""){
                      $('#userNameR').prop('disabled',false);
                      $('.divConfirmarCorreo').show();
                    }else{
                      $('#userNameR').prop('disabled',true);
                      $('.divConfirmarCorreo').hide();
                    }
                    $('.btn-registra').prop('disabled',false);
                }else{
                    alertify.error("Error: getEmpleado");
                }
            },
            error: function () {
                alertify.error("Error al obtener el servicio para cargar lista de sistemas");
            }
        });
    });

   $('#userTypeNewUser').change(function(){
        var valor=$('#userTypeNewUser').val();
        $('.divempleadoNewUser').hide();
        $('.btn-registra').prop('disabled',true);
        $('.divName').hide();
        $('.divPassword').hide();
        $('.divConfirmarCorreo').hide();
        switch(valor){
            case '1':
                  getEmpleados();
               break;
            default:
               alertify.error("Acción no disponible");
               resetearSelect($('#empleadoNewUser'));
        }
    });

   $('#editUserPerfilBtn').click(function(){
        var texto = $('#actualizacionPerfil').serializeArray();
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

        $.ajax({
            url: 'Usuarios/changePerfil',
            type: 'POST',
            async:false,
            data: ({data:data, actualIdPerfiles: arrayPerfilesActuales, sistemas: sistemaSeleccionado}),
            success: function (response) {
               var respuesta= jQuery.parseJSON(response);
               if(respuesta.respuesta==200){
                  alertify.success("Perfil modificado");
                  enSistemaPerfil.ajax.reload(null,false);
                  tableUsuarios.ajax.reload(null,false);
                  resetearSelect($('.perfilEditSelect'));
                  $('#actualizacionPerfil')[0].reset();
                  $('#modalEditarPerfilUsuario').modal('hide');

               }else{
                  alertify.error('Algo salio mal');
               }
            },
            error: function () {
                alert("Error al obtener el servicio para cargar la lista");
            }
        });
   });

   $('#addPerfilBtn').click(function(){
        var data = {};
        data[0] = $('#idUserP').val();

        var id_system = $('#idSystemAdd').val();
        var id_perfil = $('.perfilAddSelect').val();
        var form=$('#agregarPerfil').serializeArray();;
        $(form).each(function (index, obj) {
            if (data[obj.name] != undefined) {
                data[obj.name] += "," + obj.value;
            } else {
                data[obj.name] = obj.value;
            }
        });
        console.log(data);
        // return false;
        if(id_perfil!=""){
            $.ajax({
                url: 'Usuarios/registrarPerfil',
                type: 'POST',
                data: ({datos: data, id_system: id_system}),
                success: function (response) {
                    console.log(response);
                    var obj = jQuery.parseJSON(response);
                    if (obj.respuesta == 200) {
                        enSistemaPerfil.ajax.reload(null,false);
                        sinSistemaPerfil.ajax.reload(null,false);
                        $('#modalSelectPerfil').modal('hide');
                        alertify.success("Perfil asignado exitosamente");
                        return false;
                    } else {
                        alertify.error("Error al asignar perfiles");
                    }
                },
                error: function () {
                    alertify.error("Error al obtener el servicio para asignar perfiles");
                }
            });
        }else{
            alertify.error("Selecciona un perfil");
        }
    });

    $(".btn_cancel").click(function(e) {
      tablaUsuarios.ajax.reload(null,false);
    });

});

function tablaUsuarios(id_system){
  $('.listaUsuarios').show();
  // $.ajax({
  //   url: "Usuarios/usersListTable",
  //   type: 'POST',
  //   data: ({id: id_system}),
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
          data: ({id: id_system}),
          dataSrc: "",
      },
      columns: [
          {
              data: "idUser"
          },
          {
           data: null,
           render: function (data, type, full, meta) {
             if(data.nombre == null){
               return "<lable style='color:blue;'>Usuario no registrado</label>";
             }else{
               return data.nombre+" "+data.apPaterno+" "+data.apMaterno;
             }
           }
         },
          {data: "user"},
          {
              data: null,
              render: function (data, type, full, meta) {
                if(data.Sistemas == null){
                  return "<lable style='color:blue;'>Sin sistema</label>";
                }else{
                  return data.Sistemas;
                }
              }
          },
          {
              data: null,
              render: function (data, type, full, meta) {
                  var estado;
                  data.enable==1?estado='checked':estado='';
                  var botones='<a id="btnUpdateUser" data-toggle="modal" data-target="#modalEditarUsuario" href="" class="btn btn-outline-primary btn-sm btn-rounded btn-custom mr-2"><i class="fas fa-edit"></i></a> ';
                      if(id_system!=0){
                          botones=botones+' <label class="switch switch-text switch-success switch-pill">' + '<input id="btnEnableUser" type="checkbox" class="switch-input" '+estado+'>' +
                          '<span data-on="On" data-off="Off" class="switch-label"></span>' +
                          '<span class="switch-handle"></span>';
                      }
                      botones =botones+' </label> '+'<a class="btn btn-outline-primary btn-sm btn-rounded btn-custom ml-2 fas fa-plus" href="#" onclick="verUserSystemsPefil('+data.idUser+')"data-toggle="modal" data-target="#modalAdminSystems"></a>';
                      //'<a id="btnDeleteUser" title="Eliminar concepto" href="#" class="btn btn-danger btn-sm buttonDt btn-elimina"><i class="fa fa-trash"></i></a>';
                      return botones;
              },
          }
      ],
      language: {
          "url": "public/plugins/DataTables/Spanish.json",
      }
  });

  $('#tableUsuarios tbody').off('click', '#btnUpdateUser').on('click', '#btnUpdateUser', function () {
      var data = tableUsuarios.row(this.closest('tr')).data();
      if(data==undefined){
        data = tableUsuarios.row( this ).data();
      }
      $('#idUserUpdate').val(data.idUser);
      $('#updateCorreoUsuario').val(data.user);
      $('#updatePassUsuario').prop('disabled',true);
      $('#password_repeat').prop('disabled',true);
  });

  $('#tableUsuarios tbody').off('click', '#btnEnableUser').on('click', '#btnEnableUser', function () {
      var data = tableUsuarios.row(this.closest('tr')).data();
      if(data==undefined){
        data = tableUsuarios.row( this ).data();
      }
      var id = data.idUser;

      alertify.confirm("¿Desea cambiar el estado ?",
          function(){
            cambiarEstado(id,id_system,data.enable);
          },
          function(){
           //alertify.error('Acción cancelada');
           tableUsuarios.ajax.reload(null,false);
          }
      );

  });
}

var perfilesActuales = [];
function verUserSystemsPefil(idUser){
    $.ajax({
      url: "Usuarios/getSystemPerfil",
      type: 'POST',
      data: {idUser},
      success: function (response) {
        var obj = jQuery.parseJSON(response);
        if(obj!=null){
          perfilesActuales = [];
          $.each(obj, function(e,i){
            perfilesActuales.push(i.idPerfil);
          });
        }
      }
    });

    enSistemaPerfil=$('.enSistemaPerfil').DataTable({
            destroy: true,
            ajax: {
                url:'Usuarios/getSystemPerfil',
                type:'POST',
                data:{idUser},
                dataSrc: "",
            },
            columns: [
                { data: "name"},
                { data: "perfil"},
                { data: null, render: function(data,type, full, meta)
                   {
                     return "<a class='btn btn-outline-primary btn-sm btn-rounded btn-custom fas fa-edit' onclick='editarPerfilSystem("+data.idsystem+","+data.idPerfil+","+idUser+")' href='#'></a>";
                   }
                }
            ],
                language: {
                   "url": "public/plugins/DataTables/Spanish.json",
            }
    });

    sinSistemaPerfil=$('.sinSistemaPerfil').DataTable({
            destroy: true,
            ajax: {
                url:'Usuarios/getOutSystemPerfil',
                type:'POST',
                data:{idUser},
                dataSrc: "",
            },
            columns: [
                { data: "name"},
                { data: "idSystem", render: function(data)
                   {
                     return "<a class='btn btn-outline-primary btn-sm btn-rounded btn-custom fas fa-edit' onclick='addPerfil("+data+","+idUser+")' href='#'></a>";
                   }
                }
            ],
            fixedColumns: true,
                language: {
                   "url": "public/plugins/DataTables/Spanish.json",
            }
    });

}

function addPerfil(id_system,idUser){
    $('#idUserP').val(idUser);
    $('#idSystemAdd').val(id_system);
    $('#modalSelectPerfil').modal('show');
    //resetearSelect($('#perfilAddSelect'));
    $('#perfilAddSelect').empty();
    $.ajax({
        url: 'Perfiles/perfilesListSelect',
        type: 'POST',
        async:false,
        data: ({data: id_system}),
        success: function (response) {
            var respuesta=jQuery.parseJSON(response);
            if(respuesta.respuesta==200){
                var perfiles=jQuery.parseJSON(respuesta.perfilesDTO);
                var permisos = "";
                $('.listaPerfiles').empty();
                permisos = permisos = "<div class='col-md-12' align='center'><label for='description' class='form-control-label'><h3>Perfiles</h3></label>";
                $.each(perfiles,function(e,i){
                    permisos = permisos + "<label class='container paddingCheck'>"+ i.perfil +"<input type='checkbox' name='perfilAddSelect' class='perfilAddSelect' value='"+i.idPerfil+"'><span class='checkmarkPermisos'></span></label>";
                });
                permisos = permisos + "</div>";
                $('.listaPerfiles').append(permisos);
            }else{
                alertify.error('Algo salio mal');
            }
        },
        error: function () {
            alert("Error al obtener el servicio para cargar la lista");
        }
    });
}

var arrayPerfilesActuales = [];
var sistemaSeleccionado;
function editarPerfilSystem(id_system,idPerfil,idUser){
    $('#modalEditarPerfilUsuario').modal('show');
    $('#idUserPerfil').val(idUser);
    resetearSelect($('.perfilEditSelect'));
    $.ajax({
        url: 'Perfiles/perfilesListSelect',
        type: 'POST',
        async:false,
        data: ({data: id_system}),
        success: function (response) {
          var respuesta=jQuery.parseJSON(response);
          console.log(respuesta);
          if(respuesta.respuesta==200){
              var perfiles=jQuery.parseJSON(respuesta.perfilesDTO);
              var permisos = "";
              arrayPerfilesActuales = [];
              sistemaSeleccionado = 0;
              $('.listaEditarPerfiles').empty();
              permisos = permisos = "<div class='col-md-12' align='center'><label for='description' class='form-control-label'><h3>Perfiles Actuales</h3></label>";
              $.each(perfiles,function(e,i){
                if(sistemaSeleccionado ==0 ) sistemaSeleccionado = i.idSystem;
                  if(perfilesActuales.includes(i.idPerfil)){
                    permisos = permisos + "<label class='container paddingCheck'>"+ i.perfil +"<input type='checkbox' name='perfilAddSelect' class='perfilAddSelect' value='"+i.idPerfil+"' checked><span class='checkmarkPermisos'></span></label>";
                    arrayPerfilesActuales.push(i.idPerfil);
                  }else{
                    permisos = permisos + "<label class='container paddingCheck'>"+ i.perfil +"<input type='checkbox' name='perfilAddSelect' class='perfilAddSelect' value='"+i.idPerfil+"'><span class='checkmarkPermisos'></span></label>";
                  }
              });
              permisos = permisos + "</div>";
              $('.listaEditarPerfiles').append(permisos);
          }else{
              alertify.error('Algo salio mal');
          }
        },
        error: function () {
            alert("Error al obtener el servicio para cargar la lista");
        }
    });

}
//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
//Función para mostrar un formúlario en especifico
function redireccionarEstatus(optionMenu) {
    switch (optionMenu) {
        case 1:
            $('#nuevoUsuario').show();
            $('#asignarPerfiles').hide();
            $('#listarUsuarios').hide();
            break;
        case 2:
            $('#nuevoUsuario').hide();
            $('#asignarPerfiles').show();
            $('#listarUsuarios').hide();
            break;
        case 3:
            $('#nuevoUsuario').hide();
            $('#asignarPerfiles').hide();
            $('#listarUsuarios').show();
            break;
    }
}



//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarVista(optionMenu) {
    // alert(optionMenu);
    $('.divempleadoNewUser').hide();
    $('.btn-registra').prop('disabled',true);
    $('.divName').hide();
    $('.divPassword').hide();
    $('.divConfirmarCorreo').hide();
    $('#modalEditarUsuario').modal('hide');
    $('#modalEditarPerfilUsuario').modal('hide');
    $('#modalSelectPerfil').modal('hide');
    $('#modalAdminSystems').modal('hide');

    switch (optionMenu) {
        case 1:
            cleanAgregarUser();
            $('#nuevoUsuario').show();
            $('#asignarPerfiles').hide();
            $('#listarUsuarios').hide();
            break;
        case 2:
            cleanAsignarPerfiles();
            $('#nuevoUsuario').hide();
            $('#asignarPerfiles').show();
            $('#listarUsuarios').hide();
            break;
        case 3:
            cleanListarUsuarios();
            $('#nuevoUsuario').hide();
            $('#asignarPerfiles').hide();
            $('#listarUsuarios').show();
            break;
        default:
            //alert("default");
            break;
    }
    return false;
}

function cleanAgregarUser(){
    //resetearSelect($('#systemNameNewUser'));
    resetearSelect($('#userTypeNewUser'));
    resetearSelect($('#empleadoNewUser'));
    showUsersTypeNewUser();
    $('#registroUsuarios')[0].reset();
    //getEmpleados();
}

function cleanAsignarPerfiles(){
   resetearSelect($('select[name=systemNameAsignarPerfil]'));
   resetearSelect($('#perfilUser'));
   $('.infoUsers').hide();
   showSystemsAsignarPerfil();
}

function cleanListarUsuarios(){
  $('#systemNameListarUsuarios').empty();
  $('#systemNameListarUsuarios').append($("<option />").val(0).text("Todos los empleados"));
  $('#systemNameListarUsuarios').append($("<option />").val(-1).text("Sin sistema"));
  $('.listaUsuarios').hide();
  showSystemsListarUsuarios();
  tablaUsuarios(0);
}

function resetearSelect(select){
     select.empty();
     select.append($('<option>', { value : '' , text: 'Selecciona una opción' }));
     select.select2();
}


function showSystemsNewUser() {

    $.ajax({
        url: 'Sistemas/systemListSelect',
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {

            var systems = jQuery.parseJSON(response.sistemasDTO);
            var $dropdown = $("select[name$='systemNameNewUser']");
            for (var i = systems.length - 1; i >= 0; i--) {
                $dropdown.append($("<option />").val(systems[i].idSystem).text(systems[i].name));
            }

            $dropdown.select2();

        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });

}

function getEmpleados() {
    $.ajax({
        url: 'Usuarios/getEmpleados',
        async: false,
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            if(response.respuesta==200){
                var empleados=jQuery.parseJSON(response.empleadosList);
                var dropdown=$('#empleadoNewUser');
                $.each(empleados,function(e,emp){
                   dropdown.append($("<option />").val(emp.idEmpleado).text(emp.nombre+' '+emp.apPaterno+' '+emp.apMaterno));
                });
                dropdown.select2();
                $('.divempleadoNewUser').show();
            }else{
                alertify.error('Error: getEmpleados');
            }
        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });
    return false;
}

//Funcion para llevar a cabo el registro de un sistema
function saveRegistroUsuarios() {
    var texto = $('#registroUsuarios').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });
    console.log(data);
    //return false;
    if (data.userTypeNewUser != 0) {
        $.ajax({
            url: 'Usuarios/registrarUsuarios',
            type: 'POST',
            data: ({datos: data}),
            success: function (response) {
                //console.log(response);
                var obj = jQuery.parseJSON(response);
                if (obj.respuesta == 200){
                    cleanAgregarUser();
                    alertify.success("Usuario registrado exitosamente");
                } else {
                    obj.respuesta==404?alertify.error("El empleado ya tiene cuenta de usuario"):alertify.error("Error al registrar al usuario");
                }
            },
            error: function () {
                alertify.error("Error al obtener el servicio para registrar el usuario");
            }
        });
        return false;
    } else {
        alertify.warning("No has seleccionado un tipo de usuario");
    }
}

//Función para vaciar formularios depués de cada acción
function resetForm() {
    $('#registroUsuarios')[0].reset();
}

function estadoSwitch(id_user, estado) {

    $.ajax({
        url: 'Usuarios/enableUsuario',
        type: 'POST',
        data: ({datos: id_user, estado: estado}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                //Función para recargar tabla
                tableUsuarios.ajax.reload(null,false);
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

//######################################################################################################
//######################################################################################################

//Asignar perfiles

//######################################################################################################
//######################################################################################################

function showSystemsAsignarPerfil() {
    $.ajax({
        url: 'Sistemas/systemListSelect',
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {

            var systems = jQuery.parseJSON(response.sistemasDTO);
            var $dropdown = $("select[name$='systemNameAsignarPerfil']");
            for (var i = systems.length - 1; i >= 0; i--) {
                $dropdown.append($("<option />").val(systems[i].idSystem).text(systems[i].name));
            }

            $dropdown.select2();

        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });
    //return false;

}



//Funcion para llevar a cabo el registro de un sistema
function saveAsignarperfil() {

    var seleccionados = tableListadoAsignacionPerfiles.rows({selected: true}).data();
    //console.log(seleccionados);
    var data = {};
    var i = 0;
    $.each(seleccionados, function (index, usuario) {
        //console.log(usuario.idUser);
        data[i] = usuario.idUser;
        i = i + 1;
        //data[usuario.idUser] = usuario.idUser;
    });

    var id_system = $('#systemNameAsignarPerfil').val();
    var id_perfil = $('#perfilUser').val();

    //console.log(data);
    //console.log(id_system);
    //console.log(id_perfil);

    if (seleccionados.length > 0) {

        $.ajax({
            url: 'Usuarios/registrarPerfil',
            type: 'POST',
            data: ({datos: data, id_system: id_system, id_perfil: id_perfil}),
            success: function (response) {

                //console.log(response);

                var obj = jQuery.parseJSON(response);
                if (obj.respuesta == 200) {
                    tableListadoAsignacionPerfiles.ajax.reload(null,false);
                    tableListadoAsignacionPerfilesExistentes.ajax.reload(null,false);
                    alertify.success("Perfiles asignados exitosamente");
                    return false;
                } else {
                    //alert("Error al insertar los datos");
                    alertify.error("Error al asignar perfiles");
                }
            },
            error: function () {
                alertify.error("Error al obtener el servicio para asignar perfiles");
            }
        });
        return false;

    } else {
        alertify.warning("No seleccionaste ningún usuario");
    }

}

//######################################################################################################
//######################################################################################################

//Listar usuarios

//######################################################################################################
//######################################################################################################

function showSystemsListarUsuarios() {
    $.ajax({
        url: 'Sistemas/systemListSelect',
        async: false,
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            var systems = jQuery.parseJSON(response.sistemasDTO);
            var $dropdown = $("select[name$='systemNameListarUsuarios']");
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



function getUserPerfil(idUser,idSystem){
   var idPerfil;
   $.ajax({
        url: 'Perfiles/getUserPerfilSystem',
        type: 'POST',
        async:false,
        data: ({data: {idUser,idSystem}}),
        success: function (response) {
            var respuesta=jQuery.parseJSON(response);
            if(respuesta.respuesta==200){
               idPerfil=respuesta.idPerfil[0].idPerfil;
            }else{
                alertify("Algo salio mal");
            }
        },
        error: function () {
            alert("Error al obtener el servicio para cargar la lista");
        }
    });
    return idPerfil;
}

function cambiarEstado(idUser,idSystem,estado){
   $.ajax({
        url: 'Usuarios/cambiarEstado',
        type: 'POST',
        async:false,
        data: ({data: {idUser,idSystem,estado}}),
        success: function (response) {
            var respuesta=jQuery.parseJSON(response);
            if(respuesta.respuesta==200){
                alertify.success('Usuario desactivado');
                tableUsuarios.ajax.reload(null,false);
            }else{
                alertify.error('Algo salio mal');
            }
        },
        error: function () {
            alert("Error al obtener el servicio para cargar la lista");
        }
    });
}

function limpiarForm(){
      $('#updatePassUsuario').val('');
      $('#password_repeat').val('');
      if($('#checkboxPassword').val()==1){
         $('#checkboxPassword').click();
      }
}

function showUsersTypeNewUser() {
    $.ajax({
        url: 'Usuarios/userTypeList',
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {
            var userType = jQuery.parseJSON(response.usuariosDTO);
            var $dropdown = $("select[name$='userTypeNewUser']");
            for (var i = userType.length - 1; i >= 0; i--) {
                $dropdown.append($("<option />").val(userType[i].idUserType).text(userType[i].type));
            }
            $dropdown.select2();
        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });
    return false;
}
