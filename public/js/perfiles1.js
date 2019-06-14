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

//#############################################################################################################

function construirNivelesSistema(response,$dropdownModulos,$dropdownSubModulos,$dropdownOpciones,$dropdownTipoOpciones,opciones){

                //Convertir a objetos el response
                var respuesta = jQuery.parseJSON(response);

                //console.log(respuesta);

                //Convertir cada DTO a JSON
                var modulesM = jQuery.parseJSON(respuesta.perfilesModulosDTO);
                var submodulesM = jQuery.parseJSON(respuesta.perfilesSubModulosDTO);
                var opcionesM = jQuery.parseJSON(respuesta.perfilesOpcionesDTO);
                var tipoOcionesM = jQuery.parseJSON(respuesta.perfilesTipoOpcionesDTO);


                for (var i = 0; i < modulesM.length; i++) {
                    //console.log("ssss", modulesM.length);

                    //console.log(modulesM[i].name);

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

//#############################################################################################################

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

    //var total = data.idModuleOption;

    //console.log(total.length);

    console.log("hola:  " + data.idModuleOption);

    if (data.idModuleOption != undefined) {

        $.ajax({
            url: 'Perfiles/registrarPerfil',
            type: 'POST',
            data: ({datos: data}),
            success: function (response) {

                //console.log(response);

                var obj = jQuery.parseJSON(response);
                if (obj.respuesta == 200) {
                    $('#modulospo').empty();
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

    } else {

        alertify.warning("No has marcado ninguna opción");

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


//##################################################################
//##################################################################
//##################################################################
//##################################################################

/*
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

                $('#modulospo').empty();

                //Convertir a objetos el response
                var respuesta = jQuery.parseJSON(response);

                //console.log(respuesta);

                //Convertir cada DTO a JSON
                var modulesM = jQuery.parseJSON(respuesta.perfilesModulosDTO);
                var submodulesM = jQuery.parseJSON(respuesta.perfilesSubModulosDTO);
                var opcionesM = jQuery.parseJSON(respuesta.perfilesOpcionesDTO);
                var tipoOcionesM = jQuery.parseJSON(respuesta.perfilesTipoOpcionesDTO);


                //console.log(respuesta);

                //#############  MODULOS #####################
                var $dropdownModulos = $("#modulospo");
                var $dropdownSubModulos = $("div[name$='submodulos']");
                var $dropdownOpciones = $("div[name$='opciones']");
                var $dropdownTipoOpciones = $("div[name$='tipoOpciones']");

                for (var i = 0; i < modulesM.length; i++) {
                    //console.log("ssss", modulesM.length);

                    //console.log(modulesM[i].name);

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

                                        //$dropdownModulos.append($("<h3 />").text("Opciones - id - " + opcionesM[k][l].idModuleOption + " - "));
                                        $dropdownModulos.append($("<input type='checkbox' name='idModuleOption' id='idModuleOption' value='" + opcionesM[k][l].idModuleOption + "'><label>" + opcionesM[k][l].name + "</label>"));
                                        //$dropdownModulos.append($("<h3 />").text(opcionesM[k][l].name));
                                        //$dropdownModulos.append($("<h3 />").text(" - Pertenece al submodulo - " + opcionesM[k][l].idSubModule));
                                        $dropdownModulos.append($("<br />"));


                                        for (var m = 0; m < tipoOcionesM.length; m++) {


                                            for (var n = 0; n < tipoOcionesM[m].length; n++) {


                                                if (tipoOcionesM[m][n].idModuleOption == opcionesM[k][l].idModuleOption) {

                                                    //$dropdownModulos.append($("<label />").text("Tipo Opciones - id - " + tipoOcionesM[i][j].idTipoOption + " - "));
                                                    //$dropdownModulos.append("----------------");
                                                    //$dropdownModulos.append($("<input name='idTipoOption' id='idTipoOption' value='" + tipoOcionesM[m][n].idTipoOption + "'><label>" + tipoOcionesM[m][n].name + "</label>"));
                                                    $dropdownModulos.append($("<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + tipoOcionesM[m][n].name + "</label>"));
                                                    //$dropdownModulos.append($("<label />").text(tipoOcionesM[i][j].name));
                                                    //$dropdownModulos.append($("<label />").text(" - Pertenece a la opción - " + tipoOcionesM[i][j].idModuleOption));
                                                    //$dropdownModulos.append("----------------");
                                                    $dropdownModulos.append($("<br />"));
                                                }


                                            }


                                        }

                                    }


                                }

                                //console.log("opciones",opcionesM[0][k]);

                                // if( opcionesM[0][k].idSubModule == submodulesM[0][j].idSubModule ){


                                //    $dropdownOpciones.append($("<label />").text("Opciones - id - " + opcionesM[0][k].idModuleOption + " - "));
                                //    $dropdownOpciones.append($("<input type='checkbox' name='idModuleOption' id='idModuleOption' value='" + opcionesM[0][k].idModuleOption + "'><label>" + opcionesM[i][j].name + "</label>"));
                                //    //$dropdownOpciones.append($("<label />").text(opcionesM[i][j].name));
                                //    $dropdownOpciones.append($("<label />").text(" - Pertenece al submodulo - " + opcionesM[0][k].idSubModule));
                                //    $dropdownOpciones.append($("<br />"));

                                // }

                            }


                        }


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


                    //}


                //}
                //#############  MODULOS #####################

                //#############  SUBMODULOS #####################

                // for (var i = submodulesM.length - 1; i >= 0; i--) {

                //     for (var j = submodulesM[i].length - 1; j >= 0; j--) {

                //         $dropdownSubModulos.append($("<label />").text("Submodulos - id - " + submodulesM[i][j].idSubModule + " - "));
                //         $dropdownSubModulos.append($("<label />").text(submodulesM[i][j].name));
                //         $dropdownSubModulos.append($("<label />").text(" - Pertenece al modulo - " + submodulesM[i][j].idModule));
                //         $dropdownSubModulos.append($("<br />"));


                //         if (modulesM[i].idModule == submodulesM[i][j].idModule) {

                //             //$dropdownSub.append($("<ul><li><input type='checkbox' name='submodulos[]' id='submodulos[]' value='"+ submodulesM[i][j].idSubModule +"'><label>"+submodulesM[i][j].name+"</label></li></ul><br />"));
                //             $dropdownSub.append($("<label />").text(submodulesM[i][j].name));
                //             $dropdownSub.append($("<br />"));
                //         }


                //         /*
                //         //console.log(submodulesM[i][j].name);
                //         $dropdown.append($("<input type=\"checkbox\" name=\"submodulos[]\" id=\"submodulos[]\" />").val(submodulesM[i][j].idSubModule).text(submodulesM[i][j].name));
                //         $dropdown.append($("<label />").text(submodulesM[i][j].name));
                //         $dropdown.append($("<br />"));

                //          */

                //     }

                // }
                //#############  SUBMODULOS #####################

                //#############  OPCIONES #####################

                // var $dropdownOpciones = $("div[name$='opciones']");

                // for (var i = opcionesM.length - 1; i >= 0; i--) {

                //     console.log(opcionesM[i]);

                //     for (var j = opcionesM[i].length - 1; j >= 0; j--) {

                //         $dropdownOpciones.append($("<label />").text("Opciones - id - " + opcionesM[i][j].idModuleOption + " - "));
                //         $dropdownOpciones.append($("<input type='checkbox' name='idModuleOption' id='idModuleOption' value='" + opcionesM[i][j].idModuleOption + "'><label>" + opcionesM[i][j].name + "</label>"));
                //         //$dropdownOpciones.append($("<label />").text(opcionesM[i][j].name));
                //         $dropdownOpciones.append($("<label />").text(" - Pertenece al submodulo - " + opcionesM[i][j].idSubModule));
                //         $dropdownOpciones.append($("<br />"));

                //     }
                // }

                //#############  OPCIONES #####################

                //#############  TIPO OPCIONES #####################

                // var $dropdownTipoOpciones = $("div[name$='tipoOpciones']");

                // for (var i = tipoOcionesM.length - 1; i >= 0; i--) {

                //     for (var j = tipoOcionesM[i].length - 1; j >= 0; j--) {

                //         $dropdownTipoOpciones.append($("<label />").text("Tipo Opciones - id - " + tipoOcionesM[i][j].idTipoOption + " - "));
                //         //$dropdownTipoOpciones.append($("<input type='checkbox' name='idTipoOption[]' id='idTipoOption[]' value='"+ tipoOcionesM[i][j].idTipoOption +"'><label>"+tipoOcionesM[i][j].name+"</label>"));
                //         $dropdownTipoOpciones.append($("<label />").text(tipoOcionesM[i][j].name));
                //         $dropdownTipoOpciones.append($("<label />").text(" - Pertenece a la opción - " + tipoOcionesM[i][j].idModuleOption));
                //         $dropdownTipoOpciones.append($("<br />"));

                //     }
                // }

                //#############  TIPO OPCIONES #####################

            //},
            //error: function () {
                //alert("Error al obtener el servicio para cargar el contenido de los sistemas");
            //}
        //});

    //}

//});

//##################################################################
//##################################################################
//##################################################################
//##################################################################