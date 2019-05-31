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
        url: 'RegistrarUsuarios/userTypeList',
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
        url: 'RegistrarUsuarios/registrarUsuarios',
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



