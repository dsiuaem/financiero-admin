<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/PerfilesDTO.php';

class PerfilesController extends Controller
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
        $this->setTipoController("Perfiles");
        $this->setModuleMenu("Gestion de Sistemas");

        $this->view->render('perfiles/index');
    }

    function perfilesListSelect()
    {
        $asignarPerfilesDTO = new PerfilesDTO;
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
        $asignarPerfilesDTO = new PerfilesDTO;
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

    function perfilesListTable()
    {
        $ListadoPerfilesDTO = new PerfilesDTO;
        $ListadoPerfilesDTO->idSystem = $_POST["id"];
        $this->model->getPerfilesTableDTO = $ListadoPerfilesDTO;
        $this->model->obtenerPerfilesTable();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para tablas según -_-
        echo $this->model->perfilesDTO;
    }

    function contentListSystem()
    {
        $registrarPerfilDTO = new PerfilesDTO;
        $registrarPerfilDTO->idSystem = $_POST["data"];
        //echo $_POST['data'];
        //exit;
        $this->model->getContentListSystemDTO = $registrarPerfilDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerContentListSystem();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function registrarPerfil()
    {

        //Pasar los datos del formulario al DTO
        $perfilesDTO = new PerfilesDTO;
        $perfilesDTO->idModuleOption = $_POST['datos'];
        $this->model->insertPerfilDTO = $perfilesDTO;
        //Recupera los datos del servicio web
        //die();

        $this->model->registrarPerfil();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);

    }


}

?>