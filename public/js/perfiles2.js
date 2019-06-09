$(document).ready(function () {
    alertify.set('notifier', 'position', 'top-right');

    //Mostrar información en el select
    showSystems();
    //Para el listado en tables
    showSystemsTable();

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
            /*
            $(function () {
                $("#btnSaveModule").click(saveRegistroPerfiles());
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
            /*
            $("#registroSistemas")[0].reset();
            document.getElementById("textoBeneficiario").style.display = "none";
            document.getElementById("listBeneficiarios").style.display = "none";
            document.getElementById("textoSubfondo").style.display = "none";
            document.getElementById("listSubRecurso").style.display = "none";
            document.getElementById("listBeneficiarios").innerHTML = "";
            document.getElementById("listSubRecurso").innerHTML = "";
            unidadUsuarioEmpleado();
            contBeneficiario = 0;
            contSubfondo = 0;
            */
            $('#nuevoPerfil').show();
            $('#listarPerfiles').hide();
            break;
        case 2:
            $('#nuevoPerfil').hide();
            $('#listarPerfiles').show();
            //redireccionarEstatus(1);
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

            //console.log(response);

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

$(document).on('change', '#systemName', function () {

    var id_sistema = $('select[name=systemName]').val();

    if (id_sistema != "0") {

        $.ajax({
            url: 'Perfiles/contentListSystem',
            type: 'POST',
            data: ({data: id_sistema}),
            success: function (response) {

                //Vaciar los contenedores
                //$('#checkModulos').empty();
                //$('#checkSubModulos').empty();
                $('#modulos').empty();
                $('#submodulos').empty();
                $('#opciones').empty();
                $('#tipoOpciones').empty();

                //Convertir a objetos el response
                var respuesta = jQuery.parseJSON(response);

                //Convertir cada DTO a JSON
                var modulesM = jQuery.parseJSON(respuesta.perfilesModulosDTO);
                var submodulesM = jQuery.parseJSON(respuesta.perfilesSubModulosDTO);
                var opcionesM = jQuery.parseJSON(respuesta.perfilesOpcionesDTO);
                var tipoOcionesM = jQuery.parseJSON(respuesta.perfilesTipoOpcionesDTO);

                //console.log(respuesta);

                //#############  MODULOS #####################
                var $dropdownModulos = $("div[name$='modulos']");
                for (var i = modulesM.length - 1; i >= 0; i--) {

                    //$dropdown.append($("<ul><li name='checkModulos' id='checkModulos'><input type='checkbox' name='modulos[]' id='modulos[]' value='"+ modulesM[i].idModule +"'><label>"+modulesM[i].name+"</label></li></ul><br />"));
                    $dropdownModulos.append($("<label />").text("Modulos - id - " + modulesM[i].idModule + " - "));
                    $dropdownModulos.append($("<label />").text(modulesM[i].name));
                    $dropdownModulos.append($("<br />"));

                }
                //#############  MODULOS #####################

                //#############  SUBMODULOS #####################
                var $dropdownSubModulos = $("div[name$='submodulos']");
                for (var i = submodulesM.length - 1; i >= 0; i--) {

                    for (var j = submodulesM[i].length - 1; j >= 0; j--) {

                        $dropdownSubModulos.append($("<label />").text("Submodulos - id - " + submodulesM[i][j].idSubModule + " - "));
                        $dropdownSubModulos.append($("<label />").text(submodulesM[i][j].name));
                        $dropdownSubModulos.append($("<label />").text(" - Pertenece al modulo - " + submodulesM[i][j].idModule));
                        $dropdownSubModulos.append($("<br />"));

                        /*

                        if (modulesM[i].idModule == submodulesM[i][j].idModule) {

                            //$dropdownSub.append($("<ul><li><input type='checkbox' name='submodulos[]' id='submodulos[]' value='"+ submodulesM[i][j].idSubModule +"'><label>"+submodulesM[i][j].name+"</label></li></ul><br />"));
                            $dropdownSub.append($("<label />").text(submodulesM[i][j].name));
                            $dropdownSub.append($("<br />"));
                        }

                         */


                        /*
                        //console.log(submodulesM[i][j].name);
                        $dropdown.append($("<input type=\"checkbox\" name=\"submodulos[]\" id=\"submodulos[]\" />").val(submodulesM[i][j].idSubModule).text(submodulesM[i][j].name));
                        $dropdown.append($("<label />").text(submodulesM[i][j].name));
                        $dropdown.append($("<br />"));

                         */

                    }

                }
                //#############  SUBMODULOS #####################

                //#############  OPCIONES #####################

                var $dropdownOpciones = $("div[name$='opciones']");

                for (var i = opcionesM.length - 1; i >= 0; i--) {

                    for (var j = opcionesM[i].length - 1; j >= 0; j--) {

                        $dropdownOpciones.append($("<label />").text("Opciones - id - " + opcionesM[i][j].idModuleOption + " - "));
                        $dropdownOpciones.append($("<input type='checkbox' name='idModuleOption' id='idModuleOption' value='" + opcionesM[i][j].idModuleOption + "'><label>" + opcionesM[i][j].name + "</label>"));
                        //$dropdownOpciones.append($("<label />").text(opcionesM[i][j].name));
                        $dropdownOpciones.append($("<label />").text(" - Pertenece al submodulo - " + opcionesM[i][j].idSubModule));
                        $dropdownOpciones.append($("<br />"));

                    }
                }

                //#############  OPCIONES #####################

                //#############  TIPO OPCIONES #####################

                var $dropdownTipoOpciones = $("div[name$='tipoOpciones']");

                for (var i = tipoOcionesM.length - 1; i >= 0; i--) {

                    for (var j = tipoOcionesM[i].length - 1; j >= 0; j--) {

                        $dropdownTipoOpciones.append($("<label />").text("Tipo Opciones - id - " + tipoOcionesM[i][j].idTipoOption + " - "));
                        //$dropdownTipoOpciones.append($("<input type='checkbox' name='idTipoOption[]' id='idTipoOption[]' value='"+ tipoOcionesM[i][j].idTipoOption +"'><label>"+tipoOcionesM[i][j].name+"</label>"));
                        $dropdownTipoOpciones.append($("<label />").text(tipoOcionesM[i][j].name));
                        $dropdownTipoOpciones.append($("<label />").text(" - Pertenece a la opción - " + tipoOcionesM[i][j].idModuleOption));
                        $dropdownTipoOpciones.append($("<br />"));

                    }
                }

                //#############  TIPO OPCIONES #####################

            },
            error: function () {
                alert("Error al obtener el servicio para cargar el contenido de los sistemas");
            }
        });

    }

});

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

    //console.log(modulos);
    //console.log(data);
    //console.log(texto);

    $.ajax({
        url: 'Perfiles/registrarPerfil',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {

            //console.log(response);

            var obj = jQuery.parseJSON(response);
            if (obj.respuesta == 200) {
                resetForm();
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
//####################################################################################################
//####################################################################################################

//Listado de perfiles

//####################################################################################################
//####################################################################################################


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

$(document).on('change', '#systemNameTable', function () {

    var id_sistema = $('select[name=systemNameTable]').val();

    if (id_sistema != "0") {

        tableListadoPerfiles = $('#tableListadoPerfiles').DataTable({
            destroy: true,
            responsive: {
                details: false
            },
            ajax: {
                url: 'Perfiles/perfilesListTable',
                type: 'POST',
                data: ({id: id_sistema}),
                dataSrc: "",
            },
            columns: [
                {
                    data: null,
                    render: function (data, type, row) {

                        return '<button id="btnUpdatePerfil" data-toggle="modal" data-target="#modalEditarPerfil" class="btn btn-primary btn-sm buttonDt btn-ver"><i class="fa fa-search"></i></button> <button id="btnDeletePerfil" class="btn btn-danger btn-sm buttonDt btn-elimina"><i class="fa fa-trash"></i></button>';

                    }
                },
                {
                    data: "idPerfil",
                    visible: false,
                    searchable: false
                },
                {data: "perfil"}

            ],
            fixedColumns: true,
            language: {
                "url": "public/plugins/DataTables/Spanish.json",
            }
        });

        $('#tableListadoPerfiles tbody').off('click', '#btnUpdatePerfil').on('click', '#btnUpdatePerfil', function () {
            var data = tableListadoPerfiles.row(this.closest('tr')).data();
            //console.log(data);

        });

        $('#tableListadoPerfiles tbody').off('click', '#btnDeletePerfil').on('click', '#btnDeletePerfil', function () {
            var data = tableListadoPerfiles.row(this.closest('tr')).data();
            var id = data.idPerfil;

            alertify.confirm('Eliminar el perfil seleccionado ', function () {
                    deletePerfil(id);
                }
                , function () {
                    alertify.error('Acción cancelada')
                });

        });

    }

});
