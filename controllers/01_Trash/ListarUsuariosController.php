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
        $this->setModuleMenu("Gestion de Sistemas");

        $this->view->render('listarusuarios/index');
    }

    function usersListTable()
    {
        $listarUsuariosDTO = new ListarUsuariosDTO;
        $listarUsuariosDTO->idSystem = $_POST["id"];
        //echo $_POST['data'];
        //exit;
        $this->model->getUsuariosTableDTO = $listarUsuariosDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerUsuariosTable();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para tablas según -_-
        echo $this->model->usuariosDTO;
    }


}

?>