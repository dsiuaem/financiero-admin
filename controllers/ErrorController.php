<?php
class ErrorController extends Controller{
    function __construct(){
        parent::__construct();
        //Pasarle a la vista la propiedad de mensaje, antes de renderizar, de esta forma se le pueden pasar cualquier propiedad a la vista creada por el controller
        $this->view->mensaje = "Error al cargar el recurso";
    }

    function render(){
        /*echo "<script type='text/javascript'>alert('Hello World 3')</script>";
        exit;*/
        $this->view->render('error/index');
    }
}
?>
