<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/SubmodulosDTO.php';

class SubmodulosController extends Controller
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
        $this->setTipoController("Submodulos");
        $this->setModuleMenu("Gestion de Sistemas");
        $this->view->render('submodulos/index');
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function registrarSubmodulo()
    {
        //Pasar los datos del formulario al DTO
        $submodulosDTO = new SubmodulosDTO;
        //$SistemasDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $submodulosDTO->idModule = $_POST['datos']['moduleName'];
        $submodulosDTO->name = $_POST['datos']['nameSubmodule'];
        $submodulosDTO->controller = $_POST['datos']['nameController'];
        $this->model->insertSubmoduleDTO = $submodulosDTO;
        //Recupera los datos del servicio web

        $this->model->registrarSubmodule();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function submoduleListSelect()
    {
        $submodulosDTO = new SubmodulosDTO;
        $submodulosDTO->idModule = $_POST["data"];
        //echo $_POST['data'];
        //exit;
        $this->model->getSubmodulosSelectDTO = $submodulosDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerSubModulosSelect();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function submoduleListTable()
    {
        $submodulosDTO = new SubmodulosDTO;
        $submodulosDTO->idModule = $_POST["id"];
        //echo $_POST['data'];
        //exit;
        $this->model->getSubmodulosTableDTO = $submodulosDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerSubModulosTable();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para tablas según -_-
        echo $this->model->submodulosDTO;
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function updateSubmodulo()
    {
        //Pasar los datos del formulario al DTO
        $submodulosDTO = new SubmodulosDTO;
        $submodulosDTO->name = $_POST['datos']['updateNameSubmodule'];
        $submodulosDTO->controller = $_POST['datos']['updateNameController'];
        $submodulosDTO->idSubModule = $_POST['datos']['idSubModuleUpdate'];
        $this->model->updateSubmoduleDTO = $submodulosDTO;
        //Recupera los datos del servicio web

        $this->model->actualizarSubmodule();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function deleteSubmodulo()
    {
        //Pasar los datos del formulario al DTO
        $submodulosDTO = new SubmodulosDTO;
        $submodulosDTO->idSubModule = $_POST['datos'];
        $this->model->deleteSubmoduleDTO = $submodulosDTO;
        //Recupera los datos del servicio web

        $this->model->eliminarSubmodule();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function enableSubmodulo()
    {
        //Pasar los datos del formulario al DTO
        $submodulosDTO = new SubmodulosDTO;
        $submodulosDTO->idSubModule = $_POST['datos'];
        $submodulosDTO->enable = $_POST['estado'];
        $this->model->estadoSubmoduleDTO = $submodulosDTO;
        //Recupera los datos del servicio web

        $this->model->estadoSubmodule();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }


}

?>
