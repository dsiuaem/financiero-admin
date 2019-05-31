<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/ModulosDTO.php';

class ModulosController extends Controller
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
        $this->setTipoController("Modulos");
        $this->setModuleMenu("Gestion de Sistemas");

        $this->view->render('modulos/index');
    }

    function registrarModulo()
    {
        //Pasar los datos del formulario al DTO
        $modulosDTO = new ModulosDTO;
        //$SistemasDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $modulosDTO->idSystem = $_POST['datos']['systemName'];
        $modulosDTO->name = $_POST['datos']['nameModule'];
        $modulosDTO->description = $_POST['datos']['description'];
        //$modulosDTO->sort_order = $_POST['datos']['order'];
        $modulosDTO->moduleMenu = $_POST['datos']['nameModuleMenu'];
        $this->model->insertmodulosDTO = $modulosDTO;
        //Recupera los datos del servicio web

        $this->model->registrarModulo();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function moduleListSelect()
    {
        $modulosDTO = new ModulosDTO;
        $modulosDTO->idSystem = $_POST["data"];
        //echo $_POST['data'];
        //exit;
        $this->model->getmodulosSelectDTO = $modulosDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerModulosSelect();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function moduleListTable()
    {
        $modulosDTO = new ModulosDTO;
        $modulosDTO->idSystem = $_POST["id"];
        //echo $_POST['data'];
        //exit;
        $this->model->getmodulosDTO = $modulosDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerModulosTable();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para tablas según -_-
        echo $this->model->modulosDTO;
    }

    function updateModulo()
    {
        //Pasar los datos del formulario al DTO
        $modulosDTO = new ModulosDTO;
        $modulosDTO->name = $_POST['datos']['updateNameModule'];
        $modulosDTO->description = $_POST['datos']['updateDescription'];
        $modulosDTO->moduleMenu = $_POST['datos']['updateNameModuleMenu'];
        $modulosDTO->idModule = $_POST['datos']['idModuleUpdate'];
        $this->model->updteModulosDTO = $modulosDTO;
        //Recupera los datos del servicio web

        $this->model->actualizarModulo();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function deleteModulo()
    {
        //Pasar los datos del formulario al DTO
        $modulosDTO = new ModulosDTO;
        $modulosDTO->idModule = $_POST['datos'];
        $this->model->deleteModulosDTO = $modulosDTO;
        //Recupera los datos del servicio web

        $this->model->eliminarModulo();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function enableModulo()
    {
        //Pasar los datos del formulario al DTO
        $modulosDTO = new ModulosDTO;
        $modulosDTO->idModule = $_POST['datos'];
        $modulosDTO->enable = $_POST['estado'];
        $this->model->estadoModulosDTO = $modulosDTO;
        //Recupera los datos del servicio web

        $this->model->estadoModulo();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }


}

?>