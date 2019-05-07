$(document).ready(function() {
    $('#consultaEmpleado').hide();
    $('#modificaEmpleado').hide();
});

function menuPrincipal(optionMenu) {
    switch (optionMenu) {
    case 1://Captura
        $('#capturaEmpleado').show();
        $('#consultaEmpleado').hide();
        $('#modificaEmpleado').hide();
    break;
    case 2:
        $('#consultaEmpleado').show();
        $('#capturaEmpleado').hide();
        $('#modificaEmpleado').hide();
    break;
    default:
    break;
    }
}

function validarDatosForm(){
    var valid = true;
    var dataForm=$('#registroEmpleadoForm').serializeArray();
    $.each(dataForm, function(i, field){
        if(field.name=="nombre"){
            //Validar nque nombre sea igual a test
            if(field.value.length<5){
                alert("El nombre debe ser mayor 5 caracteres, Validación Javascript");
                return valid = false;
            }
        }
      });
      return valid;
}

$(function(){
    $("#btnSaveEmpleados").click(saveEmpleado);  
    function saveEmpleado() {
        var data = $('#registroEmpleadoForm').serializeArray();
        ////////////////////Validar el contenido de los campos
        if(!Boolean(validarDatosForm())){
            return false;
        }
        //////////////////////////////////////////////////////
        $.ajax({
            url: 'empleado/registrar',
            type: 'POST',
            data: ({datos:data}),
            success: function (response) {
                var obj = jQuery.parseJSON(response);
                if(obj.respuesta==200){
                    var objEmpleado = jQuery.parseJSON(obj.empleadoDTO);
                    alert("Empleado almacenado correctamente con el ID:"+objEmpleado.id);
                    getEmpleados();
                }else if (obj.respuesta==500){
                    alert(obj.mensajeRespuesta);
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
 });


 $(function(){$("#consultarDatos").click(getEmpleados());});

 function getEmpleados() {
         $.ajax({
             url: 'empleado/consultar',
             type: 'POST',
             success: function (response) {
                 var json=response;
                 var obj = jQuery.parseJSON(json);
                 var tbl=$("<table/>").attr("id","mytable");
                 $("#divTable").empty().append(tbl);
                 var objEmpleado = jQuery.parseJSON(obj.empleadoList);
                 if(obj.respuesta==200){
                     var li="<tr>";
                     var l1="<td style='width:10%;' align='center'>N° EMPLEADO</td>";
                     var l2="<td style='width:10%;' align='center'>ID</td>";
                     var l3="<td style='width:10%;' align='center'>NOMBRE</td>";
                     var l4="<td style='width:10%;' align='center'>EDAD</td>";
                     var l5="<td style='width:10%;' align='center'>SALARIO</td>";
                     var lf="</tr>";
                     $("#mytable").append(li+l1+l2+l3+l4+l5+lf);
                     for(var i=0;i<objEmpleado.length;i++)
                     {
                         var tr="<tr>";
                         var td1="<td align='center'>["+(i+1)+"]</td>";
                         var td2="<td align='center'>"+objEmpleado[i]["id"]+"</td>";
                         var td3="<td align='center'>"+objEmpleado[i]["nombre"]+"</td>";
                         var td4="<td align='center'>"+objEmpleado[i]["edad"]+"</td>";
                         var td5="<td align='center'>"+objEmpleado[i]["salario"]+"</td>";
                         var td6="<td style='width:10%;' align='center'><input type='button' id='Editar' name='Editar' value='Editar Pop-Up' style='width: 130px; height: 50px;' onclick='modificarPopup(\""+objEmpleado[i]["nombre"]+"\","+objEmpleado[i]["id"]+","+objEmpleado[i]["edad"]+","+objEmpleado[i]["salario"]+");'></td>";
                         var td7="<td style='width:10%;' align='center'><button id='EditarEmpleado' name='EditarEmpleado' style='width: 100px; height: 50px;' onclick='Modificar("+objEmpleado[i]["id"]+");'>Editar Empleado</button></td>";
                         var td8="<td style='width:10%;' align='center'><button id='EliminarEmpleado' name='EliminarEmpleado' style='width: 100px; height: 50px;' onclick='Eliminar("+objEmpleado[i]["id"]+");'>Eliminar empleado</button></td>";
                         var trf="</tr>";
                     $("#mytable").append(tr+td1+td2+td3+td4+td5+td6+td7+td8+trf); 
                     }
                 }else{
                     alert("No se pudo cargar la tabla de empleados");
                 }
               },
             error: function() {
                 alert("Error al obtener el método");
             }
           });
         return false;
 }


 function Eliminar(id) {
    $.ajax({
        url: 'empleado/eliminar',
        type: 'POST',
        data: {'id' : id},
        success: function (response) {
            var json=response;
            var obj = jQuery.parseJSON(json);
            if(obj.respuesta==200){
                alert("Empleado Eliminado");
                getEmpleados();
             }else{
                 alert("Error al aliminar el empleado");
             }
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
    return false;
}

function Modificar(id) {
    $.ajax({
        url: 'empleado/modificar',
        type: 'POST',
        data: {'id' : id},
        success: function (response) {
            var json=response;
            var obj = jQuery.parseJSON(json);
            if(obj.respuesta==200){
                $('#capturaEmpleado').hide();
                $('#consultaEmpleado').hide();
                $('#modificaEmpleado').show();
                var tbl=$("<table/>").attr("id","myMod");
                $("#divMod").empty().append(tbl);
                var objEmpleado = jQuery.parseJSON(obj.empleadoDTO);
                var li="<tr>";
                var l1="<td style='width:10%;' align='center'></td>";
                var l2="<td style='width:10%;' align='center'>NOMBRE</td>";
                var l3="<td style='width:10%;' align='center'>EDAD</td>";
                var l4="<td style='width:10%;' align='center'>SALARIO</td>";
                var lf="</tr>";
                $("#myMod").append(li+l1+l2+l3+l4+lf);
                    var tr="<tr>";
                    var td1="<td align='center'><input type='text' name='idEmp' id='idEmp' value='"+objEmpleado["id"]+"' style='text-align: center;' hidden></td>";
                    var td2="<td align='center'><input type='text' name='nombre' id='nombre' value='"+objEmpleado["nombre"]+"' style='text-align: center;'></td>";
                    var td3="<td align='center'><input type='text' name='edad' id='edad' value='"+objEmpleado["edad"]+"' style='text-align: center;'></td>";
                    var td4="<td align='center'><input type='text' name='salario' id='salario' value='"+objEmpleado["salario"]+"' style='text-align: center;'></td>";
                    var td5="<td style='width:10%;' align='center'><input type='button' id='ActualizaEmpleado' name='ActualizaEmpleado' value='Guardar Empleado' style='width: 130px; height: 50px;' onclick='updateEmpleado();'></td>";
                    var trf="</tr>";
                    $("#myMod").append(tr+td1+td2+td3+td4+td5+trf); 
            }else{
                alert("No se pudo cargar la tabla de empleados");
            }
        },
        error: function() {
            alert("Error al obtener el método");
        }
    });
    return false;
}


function validarDatosModificaForm(){
    var valid = true;
    var dataForm=$('#actualizaEmpleadoForm').serializeArray();
    $.each(dataForm, function(i, field){
        if(field.name=="nombre"){
            //Validar nque nombre sea igual a test
            if(field.value.length<5){
                alert("El nombre debe ser mayor 5 caracteres, Validación Javascript");
                return valid = false;
            }
        }
      });
      return valid;
}


function updateEmpleado() {

    ////////////////////Validar el contenido de los campos
    if(!Boolean(validarDatosModificaForm())){
        return false;
    }
    //////////////////////////////////////////////////////

    var data = $('#actualizaEmpleadoForm').serializeArray();
    $.ajax({
        url: 'empleado/modificarEmp',
        type: 'POST',
        data: ({datos:data}),
        success: function (response) {
            var json=response;
            var obj = jQuery.parseJSON(json);
            if(obj.respuesta==200){
                alert("Se Modifico el Empleado");
                getEmpleados();
                $('#consultaEmpleado').show();
                $('#capturaEmpleado').hide();
                $('#modificaEmpleado').hide();
            }else if (obj.respuesta==500){
                alert(obj.mensajeRespuesta);
            }else{
                alert("Error al modificar el empleado");
            }

          },
          error: function() {
            alert("Error al obtener el método");
          }
      });
      return false;
}

function modificarPopup(nombreU,idU,edadU,salarioU) {
    var txt;
    var id = idU;
    var ed = null;
    var sal = null;
    var nom = prompt("Nombre:", nombreU);
    while (!Number.isInteger(ed)){
        ed = parseInt(prompt("Solo se aceptan numeros.\nEdad:", edadU));
    }
    while (!Number.isInteger(sal)){
        sal = parseInt(prompt("Solo se aceptan numeros.\nSalario:", salarioU));
    }
    //var ed = prompt("La edad deben ser numeros.\n\nEdad:", edadU);
    //var sal = prompt("El salario deben ser numeros.\n\nSalario:", salarioU);
    txt = "Se modifico el usuario con el id: " + id +".\n\nLos datos nuevos son:\nNombre: " + nom + " Edad: " + ed + " Salario: " + sal;
    if ((nom == null || nom == "") || (ed == null || ed == "") || (sal == null || sal == "")) {
        txt = "Se cancelo la modificacion";
    } else {
        $.ajax({
        url: 'empleado/modificarEmpPop',
        type: 'POST',
        data: {'id' : id, 'nombre' : nom, 'edad' : ed, 'salario' : sal},
        success: function (response) {
            var json=response;
            var obj = jQuery.parseJSON(json);
            if(obj.respuesta==200){
                alert(txt);
                getEmpleados();
                $('#consultaEmpleado').show();
                $('#capturaEmpleado').hide();
                $('#modificaEmpleado').hide();
            }else if (obj.respuesta==500){
                alert(obj.mensajeRespuesta);
            }else{
                alert("Error al modificar el empleado");
            }

          },
          error: function() {
            alert("Error al obtener el método");
          }
      });
    }
    return false;
}