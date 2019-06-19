
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
        $('#modulos').empty();
        $('#submodulos').empty();
        $('#opciones').empty();
        $('#tipoOpciones').empty();
        $('#modulospo').empty();

        var $dropdownModulos = $("#modulospo");
        var $dropdownSubModulos = $("div[name$='submodulos']");
        var $dropdownOpciones = $("div[name$='opciones']");
        var $dropdownTipoOpciones = $("div[name$='tipoOpciones']");
        despliege(id_sistema,$dropdownModulos,null);
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

    //var total = data.idModuleOption;

    //console.log(total.length);

    //console.log("hola:  " + data.idModuleOption);

    if(data.systemName != 0){

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
    if (id_sistema != "0"){
        $('.perfil').val(perfil);
        var id_sistema = $('select[name=systemNameTable]').val();
        $('#modulos').empty();
        $('#submodulosEditar').empty();
        $('#opcionesEditar').empty();
        $('#tipoOpcionesEditar').empty();
        $('#modulospoEditar').empty();
        $('.idPerfilEdit').val(idPerfil);
        var opciones=getOpciones(idPerfil);
        if(opciones!=null){
          opciones=obtenerArrayOpciones(opciones);
        }
        var dropdownModulos = $("#modulospoEditar");
        var dropdownSubModulos = $("div[name$='submodulosEditar']");
        var dropdownOpciones = $("div[name$='opcionesEditar']");
        var dropdownTipoOpciones = $("div[name$='tipoOpcionesEditar']");
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
            var res=jQuery.parseJSON(response);
            if(res.respuesta==200){
                mod=jQuery.parseJSON(res.modulosDTO);
                console.log(mod);
                $.each(mod,function(modulos,modulo){
                     $dropdownModulos.append($("<hr>"));
                     $dropdownModulos.append($("<h2 />").text(modulo[0].name));
                     $dropdownModulos.append($("<br />"));
                    $.each(modulo.subModulos,function(subs,sub){
                         $dropdownModulos.append($("<h2 />").text(sub[0].name));
                         $dropdownModulos.append($("<br />"));
                         $.each(sub.opcion,function(opcs,opc){
                            if(opciones!=null){
                                 var opcItem=$("<input type='checkbox' name='idModuleOption' id='idModuleOption'>");
                                 opcItem.val(opc[0].idModuleOption);  
                                 if(jQuery.inArray(opc[0].idModuleOption, opciones)!=-1){
                                    opcItem.attr('checked', true);
                                 }
                                 $dropdownModulos.append(opcItem);
                                 console.log(opc[0].name);
                                 $dropdownModulos.append($("<label>" + opc[0].name + "</label>"));
                             }else{
                                 $dropdownModulos.append($("<input type='checkbox' name='idModuleOption' id='idModuleOption' value='" + opc[0].idModuleOption + "'><label>" + opc[0].name + "</label>"));
                             }
                             $dropdownModulos.append($("<br />"));
                            $.each(opc.topcion,function(topcs,topc){
                                    console.log(topc);
                                    //$dropdownModulos.append("----------------");
                                    $dropdownModulos.append($("<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + topc.name + "</label>"));
                                    //$dropdownModulos.append("----------------");
                                    $dropdownModulos.append($("<br />"));
                            });
                         });
                    });
                });
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
         alertify.error('Acción cancelada');
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
              	  tableListadoPerfiles.ajax.reload();
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

var tableListadoPerfiles;
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
                        return '<button id="btnUpdatePerfil" data-toggle="modal" onclick="editarPerfil('+data.idPerfil+',\''+data.perfil+'\')" data-target="#modalEditarPerfil" class="btn btn-primary btn-sm buttonDt btn-ver"><i class="fa fa-search"></i></button>'+
                         ' <button id="btnDeletePerfil" class="btn btn-danger btn-sm buttonDt btn-elimina"><i class="fa fa-trash"></i></button>';
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
