<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/RegistrarPerfilDTO.php';

class RegistrarPerfilController extends Controller
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
        $this->setTipoController("RegistrarPerfil");
        $this->setModuleMenu("Perfiles");

        $this->view->render('registrarperfil/index');
    }

    function contentListSystem()
    {
        $registrarPerfilDTO = new RegistrarPerfilDTO;
        $registrarPerfilDTO->idSystem = $_POST["data"];
        //echo $_POST['data'];
        //exit;
        $this->model->getContentListSystemDTO = $registrarPerfilDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerContentListSystem();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }


}

?>