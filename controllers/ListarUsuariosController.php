<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/ListarUsuariosDTO.php';

class ListarUsuariosController extends Controller
{

    function __construct()
    {
        //echo "Contructor Pago";
        parent::__construct();
    }

    // se renderiza la vista de solictud de pago
    function render()
    {
        //Parametros para mostrar el menu en active
        /*
         * Estos datos son extraidos de la base de datos
         * esto para poder mantener el menu abierto y no se pierda la dirección
         *
         */
        $this->setTipoController("ListarUsuarios");
        $this->setModuleMenu("Usuarios");

        $this->view->render('listarusuarios/index');
    }


}

?>