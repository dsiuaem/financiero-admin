$(document).ready(function() {
    alertify.set('notifier','position','top-right');
    // oculta las vistas del usuario hasta que el cambie la vista
    $('#modificaPago').hide();
    $('#lecturaPago').hide();
    $('#listaConsulta').hide();
    //carga el listado de recursos
    recurso();
    //carga el listadp de tipos de gastos
    gasto();
    //carga el listado de tipo de archivos
    tipoFile();
    //carga la unidad del usuario que se encuentra logueado dentro del sistema
    unidadUsuarioEmpleado();
    //carga el listado de los tipos de beneficiarios
    tipoBeneficiario();

    //jquery validator donde se corroboran que los datos esten introducidos y ningun campo se vaya en vacio
    $('form[id="registroSolicitudPagoForm"]').validate({
        rules: {
            importe: 'required',
            tipoTramite: 'required',
            unidadAcademica: 'required',
            tipoRecurso: 'required',
            subfondoList: 'required',
            nombreBeneficiario: 'required',
            concepto: 'required',
            tipoBeneficiario: 'required',
            tipoGasto: 'required'
        },
            messages: {
            importe: 'Falta introducir importe total',
            tipoTramite: 'Selecciona el tipo de tramite',
            unidadAcademica: 'No se indico la Unidad Academica',
            tipoRecurso: 'Selecciona el tipo de recurso',
            subfondoList: 'Selecciona el subfondo y/o cuenta bancaria',
            nombreBeneficiario: 'Selecciona el beneficiario',
            concepto: 'No se introdujo el concepto',
            tipoBeneficiario: 'Selecciona el tipo de beneficiario',
            tipoGasto: 'Selecciona el tipo de gasto'    
        },
        submitHandler: function(form) {
            //se ejecuta el guardado de la solicitud de pago un vez que ya corrobora que todos los campos esten llenos
            saveSolicitudPago();
        }
    });
});

//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarEstatus(optionMenu){
    switch (optionMenu){
        case 1:
        consultaSolicitudes(optionMenu);
        $('#capturaPago').hide();
        $('#modificaPago').hide();
        $('#lecturaPago').hide();
        $('#listaConsulta').show();
        break;
        case 2:
        consultaSolicitudes(optionMenu);
        $('#capturaPago').hide();
        $('#modificaPago').hide();
        $('#lecturaPago').hide();
        $('#listaConsulta').show();
        break;
        case 3:
        consultaSolicitudes(optionMenu);
        $('#capturaPago').hide();
        $('#modificaPago').hide();
        $('#lecturaPago').hide();
        $('#listaConsulta').show();
        break;
    }
 }
//CONSERVAR EL NOMBRE DE ESTA FUNCIÓN Y EL PARAMETRO
function redireccionarVista(optionMenu){
    // alert(optionMenu);       
     switch (optionMenu) {
         case 1://Captura
            $("#registroSolicitudPagoForm")[0].reset();
            document.getElementById("textoBeneficiario").style.display="none";
            document.getElementById("listBeneficiarios").style.display="none";
            document.getElementById("textoSubfondo").style.display="none";
            document.getElementById("listSubRecurso").style.display="none";
            document.getElementById("listBeneficiarios").innerHTML="";
            document.getElementById("listSubRecurso").innerHTML="";
            unidadUsuarioEmpleado();
            contBeneficiario=0;
            contSubfondo=0;
            $('#capturaPago').show();
            $('#modificaPago').hide();
            $('#lecturaPago').hide();
            $('#listaConsulta').hide();
         break;
         case 2:
            redireccionarEstatus(1);
         break;
         default:
            //alert("default");       
         break;
         }
         return false;
}

//variables que se utilizan para almacenar el listado de los diferentes tipos de catalogos
var tipoFile;
var filesSolicitud;
var valoresRegistroSolicitud;
var valoresRecursos;
var valoresGastos;
var unidadAcademica;

//funcion que se utiliza para la carga de los diferentes tipos de subfondo disponibles para el registro de la solicitud
function subfondo(value, seleccion){
    if(value==0){
        document.getElementById("textoSubfondo").style.display="none";
        document.getElementById("textoSubfondoModifica").style.display="none";
        document.getElementById("listSubRecurso").style.display="none";
        document.getElementById("textoCuentaBancaria").style.display="none";
        document.getElementById("textoCuentaBancariaModifica").style.display="none";
        document.getElementById("listSubRecurso").innerHTML="";
        document.getElementById("listSubRecursoModifica").innerHTML="";
    }else{
        if(value==1){
            document.getElementById("textoSubfondo").style.display="block";
            document.getElementById("textoSubfondoModifica").style.display="block";
            document.getElementById("textoCuentaBancaria").style.display="none";
            document.getElementById("textoCuentaBancariaModifica").style.display="none";
            document.getElementById("listSubRecurso").style.display="block";
            document.getElementById("listSubRecurso").innerHTML="";
            document.getElementById("listSubRecursoModifica").innerHTML="";
            $.ajax({
                url: 'SolicitudPago/subfondo',
                type: 'POST',
                data: ({data: value}),
                success: function (response) {
                    var opt;
                    var datos = jQuery.parseJSON(response);
                    var listado = jQuery.parseJSON(datos.idTipoRecurso);
                    var selectModifica = "<select name='subfondoListModifica' id='subfondoListModifica' class='form-control-sm form-control'>";
                    var select = "<select name='subfondoList' id='subfondoList' class='form-control-sm form-control' >";
                    if(seleccion==0){
                        var optDefault = "<option value='' selected>SELECCIONA SUBFONDO...</option>";
                    }else{
                        var optDefault = "<option value=''>SELECCIONA SUBFONDO...</option>";
                    }
                    for(var i=0; i<listado.length; i++){
                        if(seleccion!=listado[i]["idTipoRecursoSubfondo"]){
                            opt =opt+"<option value="+listado[i]["idTipoRecursoSubfondo"]+">"+listado[i]["subfondo"]+"</option>";
                        }else{
                            opt =opt+"<option value="+listado[i]["idTipoRecursoSubfondo"]+" selected>"+listado[i]["subfondo"]+"</option>";
                        }
                    }
                    var fselect = "</select>";
                    $("#listSubRecurso").append(select+optDefault+opt+fselect);
                    $("#listSubRecursoModifica").append(selectModifica+optDefault+opt+fselect);
                    return false;
                },
                error: function() {
                    alert("Error al obtener el método");
                }
            });
        }else{
            document.getElementById("textoSubfondo").style.display="none";
            document.getElementById("textoSubfondoModifica").style.display="none";
            document.getElementById("textoCuentaBancaria").style.display="block";
            document.getElementById("textoCuentaBancariaModifica").style.display="block";
            document.getElementById("listSubRecurso").style.display="block";
            document.getElementById("listSubRecurso").innerHTML="";
            document.getElementById("listSubRecursoModifica").innerHTML="";
            $.ajax({
                url: 'SolicitudPago/subfondo',
                type: 'POST',
                data: ({data: value}),
                success: function (response) {
                    var opt;
                    var datos = jQuery.parseJSON(response);
                    var listado = jQuery.parseJSON(datos.idTipoRecurso);
                    var selectModifica = "<select name='subfondoListModifica' id='subfondoListModifica' class='form-control-sm form-control'>";
                    var select = "<select name='subfondoList' id='subfondoList' class='form-control-sm form-control' >";
                    if(seleccion==0){
                        var optDefault = "<option value='' selected>SELECCIONA SUBFONDO...</option>";
                    }else{
                        var optDefault = "<option value=''>SELECCIONA SUBFONDO...</option>";
                    }
                    for(var i=0; i<listado.length; i++){
                        if(seleccion==listado[i]["idTipoRecursoSubfondo"]){
                            opt =opt+"<option value="+listado[i]["idTipoRecursoSubfondo"]+" selected>"+listado[i]["subfondo"]+"</option>";
                        }else{
                            opt =opt+"<option value="+listado[i]["idTipoRecursoSubfondo"]+">"+listado[i]["subfondo"]+"</option>";
                        }
                    }
                    var fselect = "</select>";
                    $("#listSubRecurso").append(select+optDefault+opt+fselect);
                    $("#listSubRecursoModifica").append(selectModifica+optDefault+opt+fselect);
                    return false;
                },
                error: function() {
                    alert("Error al obtener el método");
                }
            });
        }
    }
}

//funcion que carga el listado de los beneficiarios que se reciben de la base de datos
function beneficiario(value, seleccion){
    if(value==0){
        document.getElementById("textoBeneficiario").style.display="none";
        document.getElementById("listBeneficiarios").style.display="none";
        document.getElementById("listBeneficiarios").innerHTML="";
        document.getElementById("listBeneficiariosModifica").innerHTML="";
    }else{
        if(value==1){
                document.getElementById("listBeneficiarios").innerHTML="";
                document.getElementById("listBeneficiariosModifica").innerHTML="";
                document.getElementById("textoBeneficiario").style.display="block";
                document.getElementById("listBeneficiarios").style.display="block";
                $.ajax({
                    url: 'SolicitudPago/dependencias',
                    type: 'POST',
                    success: function (response) {
                        var opt;
                        var datos = jQuery.parseJSON(response);
                        var listado = jQuery.parseJSON(datos.solicitudList);
                        var selectModifica = "<select name='nombreBeneficiarioModifica' id='nombreBeneficiarioModifica' class='form-control-sm form-control'>";
                        var select = "<select name='nombreBeneficiario' id='nombreBeneficiario' class='form-control-sm form-control'>";
                        if(seleccion==0){
                            var optDefault = "<option value='' selected>SELECCIONA BENEFICIARIO...</option>";
                        }else{
                            var optDefault = "<option value=''>SELECCIONA BENEFICIARIO...</option>";
                        }
                        for(var i=0; i<listado.length; i++){
                            if(seleccion==listado[i]["idDependencia"]){
                                opt =opt+"<option value="+listado[i]["idDependencia"]+" selected>"+listado[i]["nombre"]+"</option>";
                            }else{
                                opt =opt+"<option value="+listado[i]["idDependencia"]+">"+listado[i]["nombre"]+"</option>";
                            }
                        }
                        var fselect = "</select>";
                        $("#listBeneficiarios").append(select+optDefault+opt+fselect);
                        $("#listBeneficiariosModifica").append(selectModifica+optDefault+opt+fselect);
                        return false;
                    },
                    error: function() {
                        alert("Error al obtener el método");
                    }
                });
        }else{
            if(value==2){
                    document.getElementById("listBeneficiarios").innerHTML="";
                    document.getElementById("listBeneficiariosModifica").innerHTML="";
                    document.getElementById("textoBeneficiario").style.display="block";
                    document.getElementById("listBeneficiarios").style.display="block";
                    $.ajax({
                        url: 'SolicitudPago/empleados',
                        type: 'POST',
                        success: function (response) {
                            var opt;
                            var datos = jQuery.parseJSON(response);
                            var listado = jQuery.parseJSON(datos.solicitudList);
                            var selectModifica = "<select name='nombreBeneficiarioModifica' id='nombreBeneficiarioModifica' class='form-control-sm form-control'>";
                            var select = "<select name='nombreBeneficiario' id='nombreBeneficiario' class='form-control-sm form-control'>";
                            if(seleccion==0){
                                var optDefault = "<option value='' selected>SELECCIONA BENEFICIARIO...</option>";
                            }else{
                                var optDefault = "<option value=''>SELECCIONA BENEFICIARIO...</option>";
                            }
                            for(var i=0; i<listado.length; i++){
                                if(seleccion==listado[i]["idEmpleado"]){
                                    opt =opt+"<option value="+listado[i]["idEmpleado"]+" selected>"+listado[i]["nombre"]+"</option>";
                                }else{
                                    opt =opt+"<option value="+listado[i]["idEmpleado"]+">"+listado[i]["nombre"]+"</option>";
                                }
                            }
                            var fselect = "</select>";
                            $("#listBeneficiarios").append(select+optDefault+opt+fselect);
                            $("#listBeneficiariosModifica").append(selectModifica+optDefault+opt+fselect);
                            return false;
                        },
                        error: function() {
                            alert("Error al obtener el método");
                        }
                    });
            }else{
                if(value==3){
                        document.getElementById("listBeneficiarios").innerHTML="";
                        document.getElementById("listBeneficiariosModifica").innerHTML="";
                        document.getElementById("textoBeneficiario").style.display="block";
                        document.getElementById("listBeneficiarios").style.display="block";
                        $.ajax({
                            url: 'SolicitudPago/acreedores',
                            type: 'POST',
                            success: function (response) {
                                var opt;
                                var datos = jQuery.parseJSON(response);
                                var listado = jQuery.parseJSON(datos.solicitudList);
                                var selectModifica = "<select name='nombreBeneficiarioModifica' id='nombreBeneficiarioModifica' class='form-control-sm form-control'>";
                                var select = "<select name='nombreBeneficiario' id='nombreBeneficiario' class='form-control-sm form-control'>";
                                if(seleccion==0){
                                    var optDefault = "<option value='' selected>SELECCIONA BENEFICIARIO...</option>";
                                }else{
                                    var optDefault = "<option value=''>SELECCIONA BENEFICIARIO...</option>";
                                }
                                for(var i=0; i<listado.length; i++){
                                    if(seleccion==listado[i]["idAcreedor"]){
                                        opt =opt+"<option value="+listado[i]["idAcreedor"]+" selected>"+listado[i]["nombre"]+"</option>";
                                    }else{
                                        opt =opt+"<option value="+listado[i]["idAcreedor"]+">"+listado[i]["nombre"]+"</option>";
                                    }
                                }
                                var fselect = "</select>";
                                $("#listBeneficiarios").append(select+optDefault+opt+fselect);
                                $("#listBeneficiariosModifica").append(selectModifica+optDefault+opt+fselect);
                                return false;
                            },
                            error: function() {
                                alert("Error al obtener el método");
                            }
                        });
                }else{
                        document.getElementById("listBeneficiarios").innerHTML="";
                        document.getElementById("listBeneficiariosModifica").innerHTML="";
                        document.getElementById("textoBeneficiario").style.display="block";
                        document.getElementById("listBeneficiarios").style.display="block";
                        $.ajax({
                            url: 'SolicitudPago/proveedores',
                            type: 'POST',
                            success: function (response) {
                                var opt;
                                var datos = jQuery.parseJSON(response);
                                var listado = jQuery.parseJSON(datos.solicitudList);
                                var selectModifica = "<select name='nombreBeneficiarioModifica' id='nombreBeneficiarioModifica' class='form-control-sm form-control'>";
                                var select = "<select name='nombreBeneficiario' id='nombreBeneficiario' class='form-control-sm form-control'>";
                                if(seleccion==0){
                                    var optDefault = "<option value='' selected>SELECCIONA BENEFICIARIO...</option>";
                                }else{
                                    var optDefault = "<option value=''>SELECCIONA BENEFICIARIO...</option>";
                                }
                                for(var i=0; i<listado.length; i++){
                                    if(seleccion==listado[i]["idProveedor"]){
                                        opt =opt+"<option value="+listado[i]["idProveedor"]+" selected>"+listado[i]["nombre"]+"</option>";
                                    }else{
                                        opt =opt+"<option value="+listado[i]["idProveedor"]+">"+listado[i]["nombre"]+"</option>";
                                    }
                                }
                                var fselect = "</select>";
                                $("#listBeneficiarios").append(select+optDefault+opt+fselect);
                                $("#listBeneficiariosModifica").append(selectModifica+optDefault+opt+fselect);
                                return false;
                            },
                            error: function() {
                                alert("Error al obtener el método");
                            }
                        });
                }
            }
        }
    }
}

//funcion en la cual se reciben y se muestran los tipo de archivos que se pueden subir al sistema
function tipoFile(){
    $.ajax({
        url: 'SolicitudPago/tipoFile',
        type: 'POST',
        success: function (response) {
            var opt;
            var datos = jQuery.parseJSON(response);
            var listado = jQuery.parseJSON(datos.solicitudList);
            var select = "<select name='documento' id='documento' class='form-control-sm form-control'>";
            var optDefault = "<option value='' selected>TIPO DOCUMENTO...</option>";
            tipoFile = listado;
            for(var i=0; i<listado.length; i++){
                opt =opt+"<option value="+listado[i]["idFileType"]+">"+listado[i]["tipo"]+"</option>";
            }
            var fselect = "</select>";
            $("#listFileType").append(select+optDefault+opt+fselect);
            return false;
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
}

//funcion en la que se muestra el listado de los recursos que perteneces a su categoria correspondiente
function recurso(){
    $.ajax({
        url: 'SolicitudPago/recurso',
        type: 'POST',
        success: function (response) {
            var opt;
            var datos = jQuery.parseJSON(response);
            var listado = jQuery.parseJSON(datos.solicitudList);
            valoresRecursos = listado;
            var select = "<select name='tipoRecurso' id='tipoRecurso' class='form-control-sm form-control' onchange='subfondo(this.value, 0);'>";
            var selectModifica = "<select name='tipoRecursoModifica' id='tipoRecursoModifica' onchange='subfondo(this.value, 0);' class='form-control-sm form-control'>";
            var optDefault = "<option value='' selected>SELECCIONA RECURSO...</option>";
            for(var i=0; i<listado.length; i++){
                opt =opt+"<option value="+listado[i]["idTipoRecurso"]+">"+listado[i]["name"]+"</option>";
            }
            var fselect = "</select>";
            $("#listRecurso").append(select+optDefault+opt+fselect);
            $("#listRecursoModifica").append(selectModifica+optDefault+opt+fselect);
            return false;
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
}

//funcion en la que se reciben e imprime el listado de los tipos de gastos disponibles
function gasto(){
    $.ajax({
        url: 'SolicitudPago/gasto',
        type: 'POST',
        success: function (response) {
            var opt;
            var datos = jQuery.parseJSON(response);
            var listado = jQuery.parseJSON(datos.solicitudList);
            valoresGastos = listado;
            var selectModifica = "<select name='tipoGastoModifica' id='tipoGastoModifica' class='form-control-sm form-control'>";
            var select = "<select name='tipoGasto' id='tipoGasto' class='form-control-sm form-control'>";
            var optDefault = "<option value='' selected>SELECCIONA GASTO...</option>";
            for(var i=0; i<listado.length; i++){
                opt =opt+"<option value="+listado[i]["idTipoGasto"]+">"+listado[i]["tipo_gasto"]+"</option>";
            }
            var fselect = "</select>";
            $("#listGasto").append(select+optDefault+opt+fselect);
            $("#listGastoModifica").append(selectModifica+optDefault+opt+fselect);
            return false;
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
}

//funcion en la cual se reciben y se muestran los tipos de beneficiario disponibles
function tipoBeneficiario(){
    $.ajax({
        url: 'SolicitudPago/tipoBeneficiario',
        type: 'POST',
        success: function (response) {
            var opt;
            var datos = jQuery.parseJSON(response);
            var listado = jQuery.parseJSON(datos.solicitudList);
            var selectModifica = "<select name='tipoBeneficiarioModifica' id='tipoBeneficiarioModifica' onchange='beneficiario(this.value, 0);' class='form-control-sm form-control'>";
            var select = "<select name='tipoBeneficiario' id='tipoBeneficiario' class='form-control-sm form-control' onchange='beneficiario(this.value, 0);'>";
            var optDefault = "<option value='' selected>SELECCIONA TIPO BENEFICIARIO...</option>";
            for(var i=0; i<listado.length; i++){
                opt =opt+"<option value="+listado[i]["idTipoBeneficiario"]+">"+listado[i]["tipo"]+"</option>";
            }
            var fselect = "</select>";
            $("#listTipoBeneficiarios").append(select+optDefault+opt+fselect);
            $("#listTipoBeneficiariosModifica").append(selectModifica+optDefault+opt+fselect);
            return false;
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
}

//funcion donde se muestra la unidad del usuario logueado dentro del sistema
function unidadUsuarioEmpleado(){

        $.ajax({
        url: 'SolicitudPago/unidadUsuarioEmpleado',
        type: 'POST',
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if(obj.respuesta==200){
                var unidad = jQuery.parseJSON(obj.solicitudPagoDTO);
                unidadAcademica = unidad[0]["codigoUnidad"]+" - "+unidad[0]["name"];
                document.getElementById("unidadAcademica").value=unidadAcademica;
                //document.getElementById("unidadAcademicaLabel").innerHTML = unidadAcademica;
                document.getElementById("unidadAcademicaModifica").value=unidadAcademica;
                document.getElementById("unidadAcademicaModificaLabel").innerHTML = unidadAcademica;
                return false;
            }
            return false;
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
}

//funcion que se ejecuta al realizar un clic en el boton que se encuentra dentro del formulario de registro de solicitud en el cual registra los archivos ingresados
$(function(){
    $("#saveFile").click(addListFiles);
    function addListFiles(){
        var myForm = document.getElementById("filesForm");
        var data = new FormData(myForm);
        data.append('idFolio', valoresRegistroSolicitud.id);
        var tipoFile = data.get('documento');
        var dataFile = data.get("archivo");
        var inputFile = document.getElementById("archivo");
        var inputTipo = document.getElementById("documento");
        var cont = 0;
        for (var i = 0; i<filesSolicitud.length;i++) {
            var nombreArchivoBaseDatos = filesSolicitud[i]["name"]+"."+filesSolicitud[i]["extension"]
            if(nombreArchivoBaseDatos==dataFile["name"]){
                cont++;
            }
        }
        if(cont>0){
            alert("Ya se a añadido un archivo con ese nombre");
        }else{
            if(dataFile["name"].length>0 && tipoFile.length>0){
                if(dataFile["name"].length<40){
                    $.ajax({
                        url: 'SolicitudPago/moveFile',
                        type: 'POST',
                        data: data,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            inputFile.value='';
                            inputTipo.value='';
                            registraArchivo(dataFile["name"], tipoFile);
                            listadoFiles();
                            return false;
                        },
                        error: function() {
                            alert("Error al obtener el método");
                        }
                    });
                }else{
                    alert("El nombre del archivo es demaciado largo");
                }
            }else{
                alert("No se selecciono un archivo y/o falta seleccionar el tipo de documento");
            }
            return false;
        }
        return false;
    }
});

//funcion que lista los archivos pertenecientes a la solicitud que se esta ingresando al sistema
function listadoFiles(){
    $.ajax({
        url: 'SolicitudPago/consultaArchivos',
        type: 'POST',
        data: ({id: valoresRegistroSolicitud.id}),
        success: function (response) { 
            var obj = jQuery.parseJSON(response);
            if(obj.respuesta==200){
                filesSolicitud = jQuery.parseJSON(obj.solicitudArchivoList);
                var tbl=$("<table/>").attr("id","myTableFiles");
                var tblLectura = $("<table/>").attr("id", "myTableFilesLectura");
                if(filesSolicitud.length>0){
                    $("#listFiles").empty().append(tbl);
                    $("#listFilesLectura").empty().append(tblLectura);
                    var li="<tr>";
                    var l1="<td style='width:10%;' align='center'>NOMBRE</td>";
                    var l2="<td style='width:10%;' align='center'>TIPO</td>";
                    var lf="</tr>";
                    $("#myTableFiles").append(li+l1+l2+lf);
                    $("#myTableFilesLectura").append(li+l1+l2+lf);
                    for(var i=0;i<filesSolicitud.length;i++){
                        alert (dump(filesSolicitud[i]));
                        var tr="<tr>";
                        var td1="<td align='center'><br>"+filesSolicitud[i]['name']+"."+filesSolicitud[i]["extension"]+"</td>";
                        var td2="<td align='center'><br>"+filesSolicitud[i]["tipo"]+"</td>";
                        var td3="<td style='width:10%;' align='center'><br><input type='button' id='EliminarFile' name='EliminarFile' value='Eliminar Archivo' class='btn btn-danger btn-sm' style='width: 130px; height: 50px;' onclick='deleteFile("+filesSolicitud[i]['idSolicitudPagoFile']+");'></td>";
                        var trf="</tr>";
                        $("#myTableFiles").append(tr+td1+td2+td3+trf);
                        $("#myTableFilesLectura").append(tr+td1+td2+trf); 
                    }
                    return false;
                }else{
                    document.getElementById("listFiles").innerHTML = "";
                    return false;
                }
                return false;
            }else{
                alert("Error al insertar los datos");
            }
            return false;
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
    return false;
}

//funcion que elimina logicamente el archivo del sistema
function deleteFile(idFile){
    $.ajax({
        url: 'SolicitudPago/deleteFile',
        type: 'POST',
        data: ({data: idFile}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if(obj.respuesta==200){
                listadoFiles();
                return false;
            }else{
                alert("No se pudo modificar el activo");
                return false;
            }
            return false;
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
}

//funcion en la que almacena la solicitud de pago enviando asi los datos que el usuario ingresa hacia el controlador
function saveSolicitudPago() {
    var beneficiario = document.getElementById("nombreBeneficiario");
    var texto = $('#registroSolicitudPagoForm').serializeArray();
    var data = {};
    $(texto ).each(function(index, obj){
            data[obj.name] = obj.value;
    });
    console.log(data);

    $.ajax({
        url: 'SolicitudPago/registrar',
        type: 'POST',
        data: ({datos: data}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if(obj.respuesta==200){
                var objSolicitud = jQuery.parseJSON(obj.solicitudPagoDTO);
                valoresRegistroSolicitud = objSolicitud;
                valoresRegistroSolicitud.beneficiario = beneficiario.value;
                //registraSeguimiento(objSolicitud.id, 1);
                registrarBeneficiario(valoresRegistroSolicitud.id, valoresRegistroSolicitud.idTipoBeneficiario, beneficiario.value);
                Modificar(valoresRegistroSolicitud.beneficiario);
                listadoFiles();
                return false;
            }else{
                //alert("Error al insertar los datos");
                alertify.error("Error al insertar la solicitud de pago");
            }
        },
        error: function() {
            alertify.error("Error al obtener el servicio para insertar la solicitud de pago");
        }
    });
    return false;
}

//funcion en la que se realiza el registro de la factura que se ingresa con los archivos XML y PDF (aun sigue en prueba para incluir la lectura de xml)
$(function(){
    $("#registraFactura").click(registraFactura);  
    function registraFactura() {
        var myForm = document.getElementById("modalSolicitudPagoForm");
        var data = new FormData(myForm);
        var modalFilePDF = data.get('modalFilePDF');
        var modalFileXML = data.get("modalFileXML");
        data.append('idFolio', valoresRegistroSolicitud.id);
        if(modalFilePDF["name"].length>0 && modalFileXML["name"].length>0){
            document.getElementById("alertModal").style.display="none";
            $("#listFacturas").append('<br>');
            $("#listFacturas").append(modalFilePDF["name"]+'<br>'+modalFileXML["name"]+'<br>');
            document.getElementById("modalFilePDF").value='';
            document.getElementById("modalFileXML").value='';
            // $.ajax({
            //     url: 'SolicitudPago/moveFileFactura',
            //     type: 'POST',
            //     data: data,
            //     contentType: false,
            //     processData: false,
            //     success: function (response) {
            //         registraArchivoFactura(modalFilePDF["name"], modalFileXML["name"]);
            //         listadoFilesFacturas();
            //         document.getElementById("alertModal").style.display="none";
            //         return false;
            //     },
            //     error: function() {
            //         alert("Error al obtener el método");
            //     }
            // });
        }else{
            document.getElementById("alertModal").style.display="block";
            return false;
        }
    }
 });

//funcion donde se ejecuta el mensaje de error del modal en el caso de que el usuario no llene los campos solicitados
$(function(){
    $("#ocultar").click(ocultar);
    $("#ocultarCerrar").click(ocultarCerrar);  
    function ocultar() {
        document.getElementById("alertModal").style.display="none";
        return false;
    }
    function ocultarCerrar() {
        document.getElementById("alertModal").style.display="none";
    }
 });

//funcion donde se registra el seguimiento de la solicitud de pago
function registraSeguimiento(idSolicitud, idStatus){

    var objSeguimiento = new Object();
    objSeguimiento.idSolicitud=idSolicitud;
    objSeguimiento.idStatus=idStatus;

    $.ajax({
        url: 'SolicitudPago/registrarSeguimiento',
        type: 'POST',
        data: ({datos: objSeguimiento}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if(obj.respuesta==200){
                var objSolicitud = jQuery.parseJSON(obj.solicitudPagoSeguimientoDTO);
                return false;
            }else{
                alert("Error al insertar los datos");
            }
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
return false;
}

//funcion en a cual se registran los beneficiarios seleccionados por el usuario
function registrarBeneficiario(idSolicitud, idTipoBeneficiario, idBeneficiario){
    var objBeneficiario = new Object();
    objBeneficiario.idSolicitud=idSolicitud;
    objBeneficiario.idTipoBeneficiario=idTipoBeneficiario;
    objBeneficiario.idBeneficiario=idBeneficiario;

    $.ajax({
        url: 'SolicitudPago/registrarBeneficiario',
        type: 'POST',
        data: ({datos: objBeneficiario}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if(obj.respuesta==200){
                var objSolicitud = jQuery.parseJSON(obj.solicitudPagoDTO);
                return false;
            }else{
                alert("Error al insertar los datos");
            }
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
return false;
}

//funcion que se ejecuta cuando el usuario finalia la captura de una solicitud de pago, en la que se actualizan los atos ingresados inicialmente
function Modificar(idBeneficiario) {
    $('#modificaPago').show();
    $('#capturaPago').hide();
    var inputId = document.getElementById("id");
    inputId.value=valoresRegistroSolicitud.id;
    var inputFolioLabel = document.getElementById("Folio");
    inputFolioLabel.innerHTML= "FOLIO: "+valoresRegistroSolicitud.id;
    var inputIdSolicitud = document.getElementById("idSolicitud");
    inputIdSolicitud.value=valoresRegistroSolicitud.id;
    var inputTramite = document.getElementById("tipoTramiteModifica");
    inputTramite.value=valoresRegistroSolicitud.tramite;
    var inputUnidad = document.getElementById("unidadAcademicaModifica");
    inputUnidad.value=unidadAcademica;
    var inputRecurso = document.getElementById("tipoRecursoModifica");
    inputRecurso.value=valoresRegistroSolicitud.tipoRecurso;
    var inputImporte = document.getElementById("importeModifica");
    inputImporte.value=valoresRegistroSolicitud.importe;
    var inputConcepto = document.getElementById("conceptoModifica");
    inputConcepto.value=valoresRegistroSolicitud.concepto;
    var inputGasto = document.getElementById("tipoGastoModifica");
    inputGasto.value=valoresRegistroSolicitud.tipoGasto;
    subfondo(valoresRegistroSolicitud.tipoRecurso, valoresRegistroSolicitud.idSubfondo);
    beneficiario(valoresRegistroSolicitud.idTipoBeneficiario, idBeneficiario);
    var inputTipoBeneficiario = document.getElementById("tipoBeneficiarioModifica");
    inputTipoBeneficiario.value = valoresRegistroSolicitud.idTipoBeneficiario;
}

//funcion en la que se registra el archivo en la base de datos indicando a que solicitud pertenece
function registraArchivo(file, tipo){
    var nombreArchivo="";
    nombre = file.split(".");
    for(var i = 0; i<nombre.length-1; i++){
        nombreArchivo = nombreArchivo+nombre[i];
    }
    var extension = nombre[nombre.length-1];
    var ruta = "Z:/SIA/SP/"+valoresRegistroSolicitud.id;
    var activo = 1;

    var objetoArchivo = new Object();
    objetoArchivo.idSolicitud = valoresRegistroSolicitud.id;
    objetoArchivo.tipoDocumento = tipo;
    objetoArchivo.nombre = nombreArchivo;
    objetoArchivo.extension = extension;
    objetoArchivo.ruta = ruta;
    objetoArchivo.activo = activo;

    $.ajax({
        url: 'SolicitudPago/registrarArchivo',
        type: 'POST',
        data: ({datos: objetoArchivo}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if(obj.respuesta==200){
                var objSolicitud = jQuery.parseJSON(obj.solicitudPagoArchivoDTO);
                renombrar(objSolicitud.id, file);
                return false;
            }else{
                alert("Error al insertar los datos");
            }
        },
            error: function() {
            alert("Error al obtener el método");
        }
    });
}

//funcion en la que se renomobra el archivo que se registro dandole el nombre del ID de registro al que se le asigno
function renombrar(idRegistro, file){
    var objetoRenameFile = new Object();
    objetoRenameFile.idSolicitud = valoresRegistroSolicitud.id;
    objetoRenameFile.nombre = file;
    objetoRenameFile.idRegistro = idRegistro;

    $.ajax({
        url: 'SolicitudPago/renameFile',
        type: 'POST',
        data: ({data: objetoRenameFile}),
        success: function (response) {
            return false;
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
}

//funcion que se ejecuta cuando el usuario actualiza la solicitud de pago, esto para actualizar los campos y/o estatus
$(function(){
    $("#btnUpdateSolicitudPago").click(UpdateSolicitudPago);  
    function UpdateSolicitudPago() {
        var selectGasto = document.getElementById("tipoGastoModifica");
        var selectRecurso = document.getElementById("tipoRecursoModifica");
        if(selectRecurso.value!="0"){
            if(selectGasto.value!="0"){
                var texto = $('#modificaSolicitudPagoForm').serializeArray();
                $.ajax({
                    url: 'SolicitudPago/updateRegistro',
                    type: 'POST',
                    data: ({datos: texto}),
                    success: function (response) {
                        var obj = jQuery.parseJSON(response);
                        if(obj.respuesta==200){
                            var objSolicitud = jQuery.parseJSON(obj.solicitudPagoDTO);
                            valoresRegistroSolicitud = objSolicitud;
                            updateSeguimiento(objSolicitud.idSolicitud);
                            lectura();
                            registraSeguimiento(objSolicitud.idSolicitud, 2);
                            return false;
                        }else{
                            alert("Error al insertar los datos");
                        }
                    },
                    error: function() {
                        alert("Error al obtener el método");
                    }
                });
                return false;
            }else{
                alert("SE NECESITA SELECCIONAR EL TIPO DE GASTO");
                return false;
            }
        }else{
            alert("SE NECESITA SELECCIONAR EL TIPO DE RECURSO");
            return false;
        }
        
    }
});

//funcion en la cual el sistema muestra al usuario los datos de la solicitud que contenga el estatus en CAPTURADA NO ENVIADA
function lectura() {
    $('#lecturaPago').show();
    $('#modificaPago').hide();
    $('#capturaPago').hide();
    var labelId = document.getElementById("idLectura");
    labelId.innerHTML="FOLIO: "+valoresRegistroSolicitud.idSolicitud;
    var labelTramite = document.getElementById("tipoTramiteLectura");
    labelTramite.innerHTML=valoresRegistroSolicitud.tramite;
    var labelUnidad = document.getElementById("unidadAcademicaLectura");
    labelUnidad.innerHTML=unidadAcademica;
    for(var i=0; i<valoresRecursos.length; i++){
        if(valoresRecursos[i]["idTipoRecurso"]==valoresRegistroSolicitud.tipoRecurso){
            var labelRecurso = document.getElementById("tipoRecursoLectura");
            labelRecurso.innerHTML=valoresRecursos[i]["name"];
        }
    }
    var labelImporte = document.getElementById("importeLectura");
    labelImporte.innerHTML=valoresRegistroSolicitud.importe;
    var labelConcepto = document.getElementById("conceptoLectura");
    labelConcepto.innerHTML=valoresRegistroSolicitud.concepto;
    for(var i=0; i<valoresGastos.length; i++){
        if(valoresGastos[i]["idTipoGasto"]==valoresRegistroSolicitud.tipoGasto){
            var labelGasto = document.getElementById("tipoGastoLectura");
            labelGasto.innerHTML=valoresGastos[i]["tipo_gasto"];
        }
    }
}

//funcion en la que se actualiza el seguimiento de la solicitud de pago para indicar quien fue el que realizo el cambio y cuando lo realizo
function updateSeguimiento(idSolicitud){
    $.ajax({
        url: 'SolicitudPago/updateSeguimiento',
        type: 'POST',
        data: ({id: idSolicitud}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if(obj.respuesta==200){
                var objSolicitud = jQuery.parseJSON(obj.solicitudPagoSeguimientoDTO);
                valoresRegistroSolicitud = objSolicitud;
                return false;
            }else{
                alert("Error al insertar los datos");
            }
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
    return false;
}

//funcion que imprime al usuario el listado de las solicitudes
/*function consultaSolicitudes(idTipo){
    $.ajax({
        url: 'SolicitudPago/consultaSolicitudes',
        type: 'POST',
        data: ({id: idTipo}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if(obj.respuesta==200){
                document.getElementById("listSolicitudes").innerHTML = "";
                var listaSolicitudes = jQuery.parseJSON(obj.solicitudList);
                var tbl=$("<table/>").attr("id","tablaAllConsultas").addClass("table table-borderless table-striped table-earning");
                if(listaSolicitudes.length>0){
                    $("#listSolicitudes").empty().append(tbl);
                    var li="<thead><tr>";
                    var l1="<th style='width:10%;' align='center'>ID SOLICITUD</th>";
                    var l2="<th style='width:10%;' align='center'>IMPORTE</th>";
                    var l3="<th style='width:10%;' align='center'>CONCEPTO</th>";
                    var lf="</tr></thead>";
                    $("#tablaAllConsultas").append(li+l1+l2+l3+lf);
                    var bodyI = "<tbody>";
                    $("#tablaAllConsultas").append(bodyI);
                    for(var i=0;i<listaSolicitudes.length;i++){
                        var tr="<tr onclick='solicitud("+listaSolicitudes[i]['idSolicitudPago']+","+listaSolicitudes[i]['idSPagoEstatus']+");'>";
                        var td1="<td align='center'>"+listaSolicitudes[i]['idSolicitudPago']+"</td>";
                        var td2="<td align='center'>"+listaSolicitudes[i]['importe']+"</td>";
                        var td3="<td align='center'>"+listaSolicitudes[i]['concepto']+"</td>";
                        var trf="</tr>";
                        $("#tablaAllConsultas").append(tr+td1+td2+td3+trf);
                    }
                    var bodyF = "</tbody>";
                    $("#tablaAllConsultas").append(bodyF);
                    return false;
                }else{
                    document.getElementById("listSolicitudes").innerHTML = "";
                    return false;
                }
                return false;
            }else{
                alert("Error al insertar los datos");
            }
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
    return false;
}*/
/*
function consultaSolicitudes(idTipo){
    $.ajax({
        url: 'SolicitudPago/consultaSolicitudes',
        type: 'POST',
        data: ({id: idTipo}),
        success: function (response) {
            var obj = jQuery.parseJSON(response);
            if(obj.respuesta==200){
                document.getElementById("listSolicitudes").innerHTML = "";
                var listaSolicitudes = jQuery.parseJSON(obj.solicitudList);
                var tbl=$("<table/>").attr("id","tablaAllConsultas").addClass("table table-borderless table-striped table-earning");
                if(listaSolicitudes.length>0){
                    $("#listSolicitudes").empty().append(tbl);
                    var li="<thead><tr>";
                    var l1="<th style='width:10%;' align='center'>ID SOLICITUD</th>";
                    var l2="<th style='width:10%;' align='center'>IMPORTE</th>";
                    var l3="<th style='width:10%;' align='center'>CONCEPTO</th>";
                    var lf="</tr></thead>";
                    $("#tablaAllConsultas").append(li+l1+l2+l3+lf);
                    var bodyI = "<tbody>";
                    $("#tablaAllConsultas").append(bodyI);
                    for(var i=0;i<listaSolicitudes.length;i++){
                        var tr="<tr onclick='solicitud("+listaSolicitudes[i]['idSolicitudPago']+","+listaSolicitudes[i]['idSPagoEstatus']+");'>";
                        var td1="<td align='center'>"+listaSolicitudes[i]['idSolicitudPago']+"</td>";
                        var td2="<td align='center'>"+listaSolicitudes[i]['importe']+"</td>";
                        var td3="<td align='center'>"+listaSolicitudes[i]['concepto']+"</td>";
                        var trf="</tr>";
                        $("#tablaAllConsultas").append(tr+td1+td2+td3+trf);
                    }
                    var bodyF = "</tbody>";
                    $("#tablaAllConsultas").append(bodyF);
                    return false;
                }else{
                    document.getElementById("listSolicitudes").innerHTML = "";
                    return false;
                }
                return false;
            }else{
                alert("Error al insertar los datos");
            }
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
    return false;
}*/


function consultaSolicitudes(idTipo){

    var tablaListadoServerSP=$('#listadoServerSP').DataTable({
        destroy: true,
        processing: true,
        serverSide: true,
        responsive:{
            details: false
        },
        ajax: "SolicitudPago/consultaSolicitudes?idTipo="+idTipo,
        columnDefs: [
                {
                targets: [0],
                width: 50,
                visible: false,
                },
                {
                    targets: [1],
                    width: 50,
                    data:null,
                    defaultContent: "<button class='btn btn-sm btn-primary'><i class='fa fa-search' aria-hidden='true'></i></button>"
                }
        ],
        language: {
            "url":     "public/plugins/DataTables/Spanish.json",
            "recordsFiltered": 57,
        },
    });
    
    $('#listadoServerSP tbody').off('click','button').on('click','button', function () {
        //var data=tablaListadoServerSP.row(this).data();
        var data = tablaListadoServerSP.row($(this).parents('tr') ).data();
        //console.log(data);
        //solicitud(data[2],data[0]); //Id de la solicitud y Id del seguimiento
        //$('#listadoServerSP tbody').off("click"); 
        //if (typeof data !== 'undefined') {
            solicitud(data[2],data[0]); //Id de la solicitud y Id del seguimiento
        //}
        
    });

}



//funcion que muestra al usuario los datos de la base, permitiendole modificar algun dato o en su contrario ver la solicitud que se encuentra en estatus
//1.- EN PROCESO DE CAPTURA
// 2.- Capturadas no enviadas etc
function solicitud(idSolicitudPago, idPagoStatus){
    console.log(idSolicitudPago+'--'+idPagoStatus);
    if(idPagoStatus==1){
        $.ajax({
            url: 'SolicitudPago/consultaSolicitud',
            type: 'POST',
            data: ({id: idSolicitudPago}),
            success: function (response) {
                var obj = jQuery.parseJSON(response);
                if(obj.respuesta==200){
                    var objSolicitud = jQuery.parseJSON(obj.solicitudList);
                    var objConsulta = new Object();
                    objConsulta.id = idSolicitudPago;
                    objConsulta.idSolicitud = idSolicitudPago;
                    objConsulta.tramite = "SOLICITUD DE PAGO";
                    objConsulta.unidadAcademica = unidadAcademica;
                    objConsulta.tipoRecurso = objSolicitud[0].idTipoRecurso;
                    objConsulta.idSubfondo = objSolicitud[0].idTipoRecursoSubfondo;
                    objConsulta.importe = objSolicitud[0].importe;
                    objConsulta.concepto = objSolicitud[0].concepto;
                    objConsulta.tipoGasto = objSolicitud[0].idTipoGasto;
                    objConsulta.idTipoBeneficiario = objSolicitud[0].idTipoBeneficiario;
                    if(objSolicitud[0].idAcreedor!=null){
                        objConsulta.beneficiario=objSolicitud[0].idAcreedor;
                    }else{
                        if(objSolicitud[0].idProveedor!=null){
                            objConsulta.beneficiario=objSolicitud[0].idProveedor;
                        }else{
                            if(objSolicitud[0].idEmpleado!=null){
                                objConsulta.beneficiario=objSolicitud[0].idEmpleado;
                            }else{
                                if(objSolicitud[0].idDependencia!=null){
                                    objConsulta.beneficiario=objSolicitud[0].idDependencia;
                                }
                            }
                        }
                    }
                    valoresRegistroSolicitud = objConsulta;
                    $('#listaConsulta').hide();
                    listadoFiles();
                    //document.getElementById("listSolicitudes").innerHTML = "";
                    Modificar(valoresRegistroSolicitud.beneficiario);
                    return false;
                }else{
                    alert("Error al insertar los datos 1");
                }
                return false;
            },
            error: function() {
                alert("Error al obtener el método");
            }
        });
    }else{
        $.ajax({
            url: 'SolicitudPago/consultaSolicitud',
            type: 'POST',
            data: ({id: idSolicitudPago}),
            success: function (response) {
                var obj = jQuery.parseJSON(response);
                if(obj.respuesta==200){
                    var objSolicitud = jQuery.parseJSON(obj.solicitudList);
                    var objConsulta = new Object();
                    objConsulta.id = idSolicitudPago;
                    objConsulta.idSolicitud = idSolicitudPago;
                    objConsulta.tramite = "SOLICITUD DE PAGO";
                    objConsulta.unidadAcademica = unidadAcademica;
                    objConsulta.tipoRecurso = objSolicitud[0].idTipoRecurso;
                    objConsulta.idSubfondo = objSolicitud[0].idTipoRecursoSubfondo;
                    objConsulta.importe = objSolicitud[0].importe;
                    objConsulta.concepto = objSolicitud[0].concepto;
                    objConsulta.tipoGasto = objSolicitud[0].idTipoGasto;
                    objConsulta.idTipoBeneficiario = objSolicitud[0].idTipoBeneficiario;
                    valoresRegistroSolicitud = objConsulta;
                    $('#listaConsulta').hide();
                    listadoFiles();
                    //document.getElementById("listSolicitudes").innerHTML = "";
                    lectura();
                    return false;
                }else{
                    alert("Error al insertar los datos");
                }
                return false;
            },
            error: function() {
                alert("Error al obtener el método");
            }
        });
    }
}