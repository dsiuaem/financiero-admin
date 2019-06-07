<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/AsignarPerfilesDTO.php';

class AsignarPerfilesController extends Controller
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
        $this->setTipoController("AsignarPerfiles");
        $this->setModuleMenu("Gestion de Sistemas");

        $this->view->render('asignarperfiles/index');
    }

    function perfilesListSelect()
    {
        $asignarPerfilesDTO = new AsignarPerfilesDTO;
        $asignarPerfilesDTO->idSystem = $_POST["data"];
        //echo $_POST['data'];
        //exit;
        $this->model->getPerfilesSelectDTO = $asignarPerfilesDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerPerfilesSelect();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function usuariosListTable()
    {
        $asignarPerfilesDTO = new AsignarPerfilesDTO;
        $asignarPerfilesDTO->idSystem = $_POST["id"];
        //echo $_POST['data'];
        //exit;
        $this->model->getUsuariosTableDTO = $asignarPerfilesDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerUsuariosPerfilesTable();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para tablas según -_-
        echo $this->model->perfilesDTO;
    }


}

?>