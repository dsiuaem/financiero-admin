<?php
// include_once 'models/DTO/EmpleadoDTO.php';
// include_once 'controllers/helpers/EmpleadoForm.php';
class RequisicionCompraController extends Controller{

    function __construct(){
        parent::__construct();  
    }

    function render(){
            $this->setTipoController("RequisicionCompra");
            $this->setModuleMenu("Ventanilla");
            $this->view->render('requisicionCompra/index');
    }

 

}
?>