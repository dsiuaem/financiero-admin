$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');

    //Mostrar información en el select
    showSystems();
    showUsersType();

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="registroUsuarios"]').validate({
        rules: {
            systemName: 'required',
            userType: 'required',
            userName: 'required',
            userEmail: 'required',
            userPass: 'required'
        },
        messages: {
            systemName: 'Falta seleccionar un sistema',
            userType: 'Falta seleccionar un tipo de usuario',
            userName: 'Falta ingresar nombre al usuario',
            userEmail: 'Falta ingresar email al usuario',
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

function showUsersType() {

    $.ajax({
        url: 'Usuarios/userTypeList',
        type: 'POST',
        dataType: 'JSON',
        success: function (response) {

            var userType = jQuery.parseJSON(response.usuariosDTO);
            var $dropdown = $("select[name$='userType']");
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

    console.log(data);

    $.ajax({
        url: 'Usuarios/registrarUsuarios',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {

            console.log(response);

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                resetForm();
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

}

//Función para vaciar formularios depués de cada acción
function resetForm() {
    $('#registroUsuarios')[0].reset();
}

//######################################################################################################
//######################################################################################################

//Asignar perfiles

//######################################################################################################
//######################################################################################################

//Funciones para obtener información de los select
$(document).on('change', '#systemName', function () {

    var id_sistema = $('select[name=systemName]').val();

    if (id_sistema != "0") {

        $.ajax({
            url: 'AsignarPerfiles/perfilesListSelect',
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

var tableSubmodulos;
//Para DataTable
//Funciones para obtener información de los select
$(document).on('change', '#systemName', function () {

    /*
    var id_modulo = $('select[name=moduleNameTable]').val();

    console.log("entra id: " + " " + id_modulo);

    $.ajax({
        url: 'Submodulos/submoduleListTable',
        type: 'POST',
        data: ({id: id_modulo}),
        success: function (response) {
            console.log("datos");
            console.log(response);

        },
        error: function () {
            alertify.error("Error al obtener el servicio");
        }
    });

     */


    var id_system = $('select[name=systemName]').val();

    if (id_system != "0") {

        console.log("entra" + " " + id_system);

        tableListadoAsignacionPerfiles = $('#tableListadoAsignacionPerfiles').DataTable({
            destroy: true,
            responsive: {
                details: false
            },
            ajax: {
                url: 'Perfiles/usuariosListTable',
                type: 'POST',
                data: ({id: id_system}),
                dataSrc: "",
            },
            columns: [
                {
                    data: "idUser",
                    visible: false,
                    searchable: false
                },

                {data: "user"},
                {data: "email"},
                {
                    data: null,
                    render: function (data, type, row) {

                        return '<input type="checkbox">';

                    }
                }

            ],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });

    }

});

//Funcion para llevar a cabo el registro de un sistema
function saveRegistroUsuarios() {
    var texto = $('#asignarPerfiles').serializeArray();
    var data = {};
    $(texto).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    console.log(data);

    $.ajax({
        url: 'Modulos/registrarModulo',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {

            console.log(response);

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                //resetForm();
                alertify.success("Módulo registrado exitosamente");
                return false;
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

}

//######################################################################################################
//######################################################################################################

//Listar usuarios

//######################################################################################################
//######################################################################################################

//Para DataTable
//Funciones para obtener información de los select
$(document).on('change', '#systemName', function () {

    var id_system = $('select[name=systemName]').val();

    if (id_system != "0") {

        console.log("entra" + " " + id_system);

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

                        /*
                        if (data.enable == 1) {

                            var estado = "checkbox";

                        } else if (data.enable == 0) {

                            var estado = "";

                        }
                        */

                        return '<button id="btnUpdateSubModule" data-toggle="modal" data-target="#modalEditarSubModulo" class="btn btn-primary btn-sm buttonDt btn-ver"><i class="fa fa-search"></i></button>';

                    }
                },
                {
                    data: "idUser",
                    visible: false,
                    searchable: false
                },

                {data: "user"},
                {data: "perfil"}

            ],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });


    }

});



