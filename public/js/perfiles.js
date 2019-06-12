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

function construirNivelesSistema(response,$dropdownModulos,$dropdownSubModulos,$dropdownOpciones,$dropdownTipoOpciones,opciones){

                //Convertir a objetos el response
                var respuesta = jQuery.parseJSON(response);

                console.log(respuesta);

                //Convertir cada DTO a JSON
                var modulesM = jQuery.parseJSON(respuesta.perfilesModulosDTO);
                var submodulesM = jQuery.parseJSON(respuesta.perfilesSubModulosDTO);
                var opcionesM = jQuery.parseJSON(respuesta.perfilesOpcionesDTO);
                var tipoOcionesM = jQuery.parseJSON(respuesta.perfilesTipoOpcionesDTO);


                for (var i = 0; i < modulesM.length; i++) {
                    console.log("ssss", modulesM.length);

                    console.log(modulesM[i].name);

                    $dropdownModulos.append($("<h1>").text(modulesM[i].name));
                    //$dropdownModulos.append("ddddddddd");
                    $dropdownModulos.append($("<br />"));


                    for (var j = 0; j < submodulesM[0].length; j++) { // ciclo de submodulos


                        // console.log(typeof(submodulesM[j]));
                        // console.log(submodulesM[i][j].idSubModule);


                        if (submodulesM[0][j].idModule == modulesM[i].idModule) {


                            //$dropdownModulos.append($("<h2 />").text("Submodulos - id - " + submodulesM[0][j].idSubModule + " - "));
                            $dropdownModulos.append($("<h2 />").text(submodulesM[0][j].name));
                            //$dropdownModulos.append($("<h2 />").text(" - Pertenece al modulo - " + submodulesM[0][j].idModule));
                            $dropdownModulos.append($("<br />"));


                            for (var k = 0; k < opcionesM.length; k++) {


                                for (var l = 0; l < opcionesM[k].length; l++) {


                                    if (opcionesM[k][l].idSubModule == submodulesM[0][j].idSubModule) {

                                        if(opciones!=null){
                                             var opc=$("<input type='checkbox' name='idModuleOption' id='idModuleOption'>");
                                             opc.val(opcionesM[k][l].idModuleOption);   
                                             if(jQuery.inArray(opcionesM[k][l].idModuleOption, opciones)!=-1){
                                                opc.attr('checked', true);
                                             }
                                             $dropdownModulos.append(opc);
                                             $dropdownModulos.append($("<label>" + opcionesM[k][l].name + "</label>"));
                                        }else{
                                             $dropdownModulos.append($("<input type='checkbox' name='idModuleOption' id='idModuleOption' value='" + opcionesM[k][l].idModuleOption + "'><label>" + opcionesM[k][l].name + "</label>"));
                                        }

                                        //$dropdownModulos.append($("<h3 />").text("Opciones - id - " + opcionesM[k][l].idModuleOption + " - "));
                                        //$dropdownModulos.append($("<h3 />").text(opcionesM[k][l].name));
                                        //$dropdownModulos.append($("<h3 />").text(" - Pertenece al submodulo - " + opcionesM[k][l].idSubModule));
                                        $dropdownModulos.append($("<br />"));


                                        for (var m = 0; m < tipoOcionesM.length; m++) {


                                            for (var n = 0; n < tipoOcionesM[m].length; n++) {


                                                if (tipoOcionesM[m][n].idModuleOption == opcionesM[k][l].idModuleOption) {

                                                    //$dropdownModulos.append($("<label />").text("Tipo Opciones - id - " + tipoOcionesM[i][j].idTipoOption + " - "));
                                                    $dropdownModulos.append("----------------");
                                                    $dropdownModulos.append($("<input type='checkbox' name='idTipoOption[]' id='idTipoOption[]' value='" + tipoOcionesM[m][n].idTipoOption + "'><label>" + tipoOcionesM[m][n].name + "</label>"));
                                                    //$dropdownModulos.append($("<label />").text(tipoOcionesM[i][j].name));
                                                    //$dropdownModulos.append($("<label />").text(" - Pertenece a la opción - " + tipoOcionesM[i][j].idModuleOption));
                                                    $dropdownModulos.append("----------------");
                                                    $dropdownModulos.append($("<br />"));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
}

$(document).on('change', '#systemName', function () {

    var id_sistema = $('select[name=systemName]').val();

    if (id_sistema != "0") {

        $.ajax({
            url: 'Perfiles/contentListSystem',
            type: 'POST',
            data: ({data: id_sistema}),
            success: function (response) {

                $('#modulos').empty();
                $('#submodulos').empty();
                $('#opciones').empty();
                $('#tipoOpciones').empty();
                $('#modulospo').empty();

                var $dropdownModulos = $("#modulospo");
                var $dropdownSubModulos = $("div[name$='submodulos']");
                var $dropdownOpciones = $("div[name$='opciones']");
                var $dropdownTipoOpciones = $("div[name$='tipoOpciones']");
                construirNivelesSistema(response,$dropdownModulos,$dropdownSubModulos,$dropdownOpciones,$dropdownTipoOpciones,null);


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
    console.log(data);
    console.log(texto);
    return false;
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

function editarPerfil(idPerfil,perfil){
    $('.perfil').val(perfil);
    var id_sistema = $('select[name=systemNameTable]').val();
     if (id_sistema != "0") {
        var opciones=getOpciones(idPerfil);
        opciones=obtenerArrayOpciones(opciones);
        $.ajax({
            url: 'Perfiles/contentListSystem',
            type: 'POST',
            data: ({data: id_sistema}),
            success: function (response) {
                  
                $('#modulos').empty();
                $('#submodulosEditar').empty();
                $('#opcionesEditar').empty();
                $('#tipoOpcionesEditar').empty();
                $('#modulospoEditar').empty();
                $('.idPerfilEdit').val(idPerfil);
                var $dropdownModulos = $("#modulospoEditar");
                var $dropdownSubModulos = $("div[name$='submodulosEditar']");
                var $dropdownOpciones = $("div[name$='opcionesEditar']");
                var $dropdownTipoOpciones = $("div[name$='tipoOpcionesEditar']");
                construirNivelesSistema(response,$dropdownModulos,$dropdownSubModulos,$dropdownOpciones,$dropdownTipoOpciones,opciones);
            },
            error: function () {
                alert("Error al obtener el servicio para cargar el contenido de los sistemas");
            }
        });

    }
}

function editarPerfilOpciones(){
    alertify.confirm("¿Desea cancelar el documento?",
        function(){
          editarPerfilRealizar();
        },
        function(){
         alertify.error('Cancel');
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
              console.log(response);
        },
        error: function () {
            alert("Error al obtener el servicio para cargar el contenido de los sistemas");
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


                        return '<button id="btnUpdatePerfil" data-toggle="modal" onclick="editarPerfil('+data.idPerfil+',\''+data.perfil+'\')" data-target="#modalEditarPerfil" class="btn btn-primary btn-sm buttonDt btn-ver"><i class="fa fa-search"></i></button> <button id="btnDeletePerfil" class="btn btn-danger btn-sm buttonDt btn-elimina"><i class="fa fa-trash"></i></button>';

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
