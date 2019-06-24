$(document).ready(function() {
  alertify.set('notifier','position','top-center');
var valorcontroller = $("#tipoControlador").attr("value");
//if(valorcontroller!=""){
    subMenu();
    $('.level1').click(function(){
        $('.level1').removeClass('activo');
        $('.level2').removeClass('activo');
        $('.level3').removeClass('activo');
        $(this).addClass('activo');
        var padre1 = $(this).parent();
        if (padre1.hasClass("menu-open")) {
           $('.level1').removeClass('activo'); 
        }

    });

    $('.level2').click(function(){
         $('.level1').removeClass('activo');
        var padre = $(this).parent().parent().parent();
        $('.level2').removeClass('activo');
        $('.level3').removeClass('activo');
        padre.children('a').addClass('activo');
        var padre2 = $(this).parent();
        if (padre2.hasClass("menu-open")) {
           $('.level2').removeClass('activo'); 
        }else{
            $(this).addClass('activo');
        }

        
    });

    $('.level3').click(function(){
        $('.level1').removeClass('activo');
        $('.level2').removeClass('activo');
        $('.level3').removeClass('activo');
        var padre = $(this).parent().parent().parent();
        var padre2 = $(this).parent().parent().parent().parent().parent();
        padre.children('a').addClass('activo');
        padre2.children('a').addClass('activo');
        $(this).addClass('activo');
        //console.log(padre);
    });
    
    $('.level1.activo').siblings('ul').children('li').first().children('a').addClass('activo');

//alert(valorcontroller);
});
/*
$(function()
    {
    $(".dropdown.active").toggleClass("open",true);
    });
    */

 function cargarController(controller){
    window.location.href = controller;
    //subMenu();
    return false;
 }

 function salirSistema(){
    var urlPath=window.location.pathname;
    var arrayPath = urlPath.split('/');
    var proyectPath=arrayPath[1];
    var urlWholeProyect=window.location.origin+'/'+proyectPath;
    $.ajax({
    url: urlWholeProyect+'/Login/logOut',
    type: 'POST',
    data: {'closeSession' : 'close'},
    success: function (response) {
    window.location.href = urlWholeProyect+'/Login';
    localStorage.removeItem('turnados'); // se remueven las variables del localstorage
    localStorage.removeItem('CargaOficio');
    localStorage.removeItem('estatus');
    localStorage.removeItem('idDocumento'); 
    },
    error: function() {
    alert("Error al cerrar sesión");
    }
    });
    return false;
}
 /*
 function redireccionarEstatus(optionMenu){
    alert(optionMenu);

 }*/
  /*function redireccionarVista(optionMenu){
   // alert(optionMenu);
    switch (optionMenu) {
        case 1://Captura
       alert("consulta");
        $('#capturaEmpleado').show();
        $('#consultaEmpleado').hide();
        $('#modificaEmpleado').hide();
        break;
        case 2:
         alert("captura");
           $('#consultaEmpleado').show();
           $('#capturaEmpleado').hide();
           $('#modificaEmpleado').hide();
        break;
        default:
        //alert("default");
        break;
        }
        return false;
  }*/
  /*
  function redireccionarVista(optionMenu){
    // alert(optionMenu);
     switch (optionMenu) {
         case 1://Captura
            $('#capturaPago').show();
            $('#modificaPago').hide();
            $('#lecturaPago').hide();
            $('#listaConsulta').hide();
         break;
         case 2:
            $('#capturaPago').hide();
            $('#modificaPago').hide();
            $('#lecturaPago').hide();
            $('#listaConsulta').show();
         break;
         default:
            //alert("default");
         break;
         }
         return false;
  }*/

 //FUNCION PARA MOSTRAR Y OCULTAR LOS CONTROLADORES.
 function subMenu(){
     //alert("hello");
     //window.location.href = url;  
     
     var dropdown = document.getElementsByClassName("dropdown-btn");
     var ModuledropdownContainter = document.getElementById("modulo");   
     var subModuledropdownContainter = document.getElementById("submodulo");   
    if(ModuledropdownContainter!=null && subModuledropdownContainter!=null && dropdown!=null )
    {
        ModuledropdownContainter.style.display = "block";
    subModuledropdownContainter.style.display = "block";
     var i;
     for (i = 0; i < dropdown.length; i++) {
     dropdown[i].addEventListener("click", function() {
         //this.classList.toggle("active");
         var dropdownContent = this.nextElementSibling;
         if (dropdownContent.style.display === "block") {
         dropdownContent.style.display = "none";
         } else {
                 dropdownContent.style.display = "block";
         }
         });
     }
    }    
     return false;
 }

 
function dump(obj) {
            var out = '';
            for (var i in obj) {
                out += i + ": " + obj[i] + "\n";
            }
        alertify.message(out);
 }


/* function menuPrincipal(optionMenu) {
     alert(optionMenu);
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
     return false;
 }*/