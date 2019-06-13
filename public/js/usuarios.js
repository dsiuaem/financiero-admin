$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');

    //Mostrar información en el select
    showSystemsNewUser();
    showUsersTypeNewUser();
    showSystemsAsignarPerfil();
    showSystemsListarUsuarios();

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="registroUsuarios"]').validate({
        rules: {
            systemNameNewUser: 'required',
            userTypeNewUser: 'required',
            userName: 'required',
            userPass: 'required'
        },
        messages: {
            systemNameNewUser: 'Falta seleccionar un sistema',
            userTypeNewUser: 'Falta seleccionar un tipo de usuario',
            userName: 'Falta ingresar un correo válido',
            userPass: 'Falta ingresar contraseña al usuario'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            saveRegistroUsuarios();
            /*
            $(function () {
                $("#btnSaveModule").click(saveRegistroUsuarios());
            });

             */

        }
    });

    $('form[id="actualizacionUsuario"]').validate({
        rules: {
            updateCorreoUsuario: 'required',
            updatePassUsuario: 'required'
        },
        messages: {
            updateCorreoUsuario: 'Falta ingresar un correo válido',
            updatePassUsuario: 'Falta ingresar contraseña al usuario'
        },
        submitHandler: function () {
            //Se registran los datos del módulo
            //updateUsuario();
            /*
            $(function () {
                $("#btnSaveModule").click(saveRegistroUsuarios());
            });

             */

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
            /*
            $(function () {
                $("#btnSaveModule").click(saveRegistroUsuarios());
            });

             */

        }
    });


});

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
        default:
            //alert("default");
            break;
    }
    return false;
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

        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });
    return false;

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

    //console.log("qui esta:" + data);

    if (data.systemNameNewUser != 0) {

        if (data.userTypeNewUser != 0) {

            $.ajax({
                url: 'Usuarios/registrarUsuarios',
                type: 'POST',
                data: ({datos: data}),
                success: function (response) {

                    //console.log(response);

                    var obj = jQuery.parseJSON(response);
                    if (obj.respuesta == 200) {
                        //tableListadoAsignacionPerfiles.ajax.reload();
                        resetForm();
                        tableListadoAsignacionPerfiles.ajax.reload();
                        alertify.success("Usuario registrado exitosamente");
                        return false;
                    } else {
                        //alert("Error al insertar los datos");
                        alertify.error("Error al registrar al usuario");
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

    } else {
        alertify.warning("No has seleccionado un sistema");
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
                tableUsuarios.ajax.reload();
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

        },
        error: function () {
            alertify.error("Error al obtener el servicio para cargar lista de sistemas");
        }
    });
    return false;

}

//Funciones para obtener información de los select
$(document).on('change', '#systemNameAsignarPerfil', function () {

    var id_sistema = $('select[name=systemNameAsignarPerfil]').val();

    if (id_sistema != "0") {

        $.ajax({
            url: 'Perfiles/perfilesListSelect',
            type: 'POST',
            data: ({data: id_sistema}),
            success: function (response) {

                //console.log(response);

                $('#perfilUser').empty();

                var modules = jQuery.parseJSON(response);
                //console.log(modules);
                var arreglo = modules.perfilesDTO;
                //console.log(typeof (arreglo));
                arreglo = jQuery.parseJSON(arreglo);
                //console.log(typeof (arreglo));
                var $dropdown = $("select[name$='perfilUser']");
                $dropdown.append($("<option />").val(0).text("-- Selecciona --"));
                for (var i = arreglo.length - 1; i >= 0; i--) {
                    $dropdown.append($("<option />").val(arreglo[i].idPerfil).text(arreglo[i].perfil));
                }

            },
            error: function () {
                alert("Error al obtener el servicio para cargar la lista");
            }
        });

    }

});

//####################################
//Usuarios sin perfil asignado
//####################################
var id_usuarios;
var tableListadoAsignacionPerfiles;
//Para DataTable
//Funciones para obtener información de los select
$(document).on('change', '#perfilUser', function () {

    var id_system = $('select[name=systemNameAsignarPerfil]').val();
    var id_perfil = $('select[name=perfilUser]').val();

    if (id_perfil != "0") {

        //console.log("entra" + " " + id_system);

        tableListadoAsignacionPerfiles = $('#tableListadoAsignacionPerfiles').DataTable({
            destroy: true,
            responsive: {
                details: false
            },
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
            buttons: [
                {
                    text: 'Guardar',
                    className: 'btn btn-success buttonDt',
                    action: function () {
                        saveAsignarperfil();
                    }
                }
            ],
            columns: [
                {
                    data: "idUser",
                    visible: false,
                    searchable: false
                },
                {data: "user"}

            ],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });

    }

});

//####################################
//Usuarios con perfil asignado
//####################################

var tableListadoAsignacionPerfilesExistentes;
//Para DataTable
//Funciones para obtener información de los select
$(document).on('change', '#perfilUser', function () {

    var id_system = $('select[name=systemNameAsignarPerfil]').val();
    var id_perfil = $('select[name=perfilUser]').val();

    if (id_perfil != "0") {

        //console.log("entra" + " " + id_system);

        tableListadoAsignacionPerfilesExistentes = $('#tableListadoAsignacionPerfilesExistentes').DataTable({
            destroy: true,
            responsive: {
                details: false
            },
            ajax: {
                url: 'Usuarios/usuariosListTableConPerfil',
                type: 'POST',
                data: ({id_perfil: id_perfil, id_system: id_system}),
                dataSrc: "",
            },
            columns: [
                {
                    data: "idUser",
                    visible: false,
                    searchable: false
                },
                {data: "user"}

            ],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });

    }

});

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
                    tableListadoAsignacionPerfiles.ajax.reload();
                    tableListadoAsignacionPerfilesExistentes.ajax.reload();
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
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {

            var systems = jQuery.parseJSON(response.sistemasDTO);
            var $dropdown = $("select[name$='systemNameListarUsuarios']");
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

var tableUsuarios;
//Para DataTable
//Funciones para obtener información de los select
$(document).on('change', '#systemNameListarUsuarios', function () {

    var id_system = $('select[name=systemNameListarUsuarios]').val();

    if (id_system != "0") {

        //console.log("entra" + " " + id_system);

        tableUsuarios = $('#tableUsuarios').DataTable({
            destroy: true,
            responsive: {
                details: false
            },
            ajax: {
                url: 'Usuarios/usersListTable',
                type: 'POST',
                data: ({id: id_system}),
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

                        return '<button id="btnUpdateUser" data-toggle="modal" data-target="#modalEditarUsuario" class="btn btn-primary btn-sm buttonDt btn-ver"><i class="fa fa-search"></i></button> ' +
                            '' +
                            '<label class="switch switch-text switch-success switch-pill">\n' +
                            '<input id="btnEnableUser" type="' + estado + '" class="switch-input" checked="true">\n' +
                            '<span data-on="On" data-off="Off" class="switch-label"></span>\n' +
                            '<span class="switch-handle"></span>\n' +
                            '</label> ' +
                            '' +
                            '<button id="btnDeleteUser" title="Eliminar concepto" class="btn btn-danger btn-sm buttonDt btn-elimina"><i class="fa fa-trash"></i></button>';

                    }
                },
                {
                    data: "idUser",
                    visible: false,
                    searchable: false
                },

                {data: "user"}

            ],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });


        $('#tableUsuarios tbody').off('click', '#btnUpdateUser').on('click', '#btnUpdateUser', function () {
            var data = tableUsuarios.row(this.closest('tr')).data();
            //console.log(data);

            alert(data);

            /*
            document.getElementById('updateCorreoUsuario').value = data.user;
            document.getElementById('updatePassUsuario').value = data.password;
            document.getElementById('idUserUpdate').value = data.idUser;
            */

        });

        $('#tableUsuarios tbody').off('click', '#btnEnableUser').on('click', '#btnEnableUser', function () {
            var data = tableUsuarios.row(this.closest('tr')).data();
            var id = data.idUser;
            var estado = data.enable;

            if (estado == 1) {

                var texto = "Desactivar";

            } else if (estado == 0) {

                var texto = "Activar";

            }

            alertify.confirm(texto + ' el usuario seleccionado ', function () {
                    //estadoSwitch(id, estado);
                }
                , function () {
                    alertify.error('Acción cancelada')
                });

        });

        $('#tableUsuarios tbody').off('click', '#btnDeleteUser').on('click', '#btnDeleteUser', function () {
            var data = tableUsuarios.row(this.closest('tr')).data();
            var id = data.idUser;

            alertify.confirm('Eliminar el usuario seleccionado ', function () {
                    //deleteUsuario(id);
                }
                , function () {
                    alertify.error('Acción cancelada')
                });

        });


    }

});





