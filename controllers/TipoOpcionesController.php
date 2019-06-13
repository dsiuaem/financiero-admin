<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/TipoOpcionesDTO.php';

class TipoOpcionesController extends Controller
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
        $this->setTipoController("TipoOpciones");
        $this->setModuleMenu("Gestion de Sistemas");

        $this->view->render('tipoOpciones/index');
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function registrarTipoOpcion()
    {
        //Pasar los datos del formulario al DTO
        $tipoOpcionesDTO = new TipoOpcionesDTO;
        //$SistemasDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $tipoOpcionesDTO->idModuleOption = $_POST['datos']['optionName'];
        $tipoOpcionesDTO->name = $_POST['datos']['nameTypeOption'];

        if (isset($_POST['datos']['typeOne']) && $_POST['datos']['typeOne'] <> "") {

            $tipoOpcionesDTO->tipo = $_POST['datos']['typeOne'];

        } else if (isset($_POST['datos']['typeTwo']) && $_POST['datos']['typeTwo'] <> "") {

            $tipoOpcionesDTO->tipo = $_POST['datos']['typeTwo'];

        }

        $this->model->insertTypeOptionDTO = $tipoOpcionesDTO;
        //Recupera los datos del servicio web

        $this->model->registrarTipoOpcion();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function tipoOpcionesListTable()
    {
        $tipoOpcionesDTO = new TipoOpcionesDTO;
        $tipoOpcionesDTO->idModuleOption = $_POST["id"];
        //echo $_POST['data'];
        //exit;
        $this->model->getTipoOpcionesTableDTO = $tipoOpcionesDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerTipoOpcionesTable();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para tablas según -_-
        echo $this->model->tipoOpcionesModelDTO;
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function updateTipoOpcion()
    {
        //Pasar los datos del formulario al DTO
        $tipoOpcionesDTO = new TipoOpcionesDTO;
        $tipoOpcionesDTO->name = $_POST['datos']['updateNameTypeOption'];

        if (isset($_POST['datos']['updateTypeOne']) && $_POST['datos']['updateTypeOne'] <> "") {

            $tipoOpcionesDTO->tipo = $_POST['datos']['updateTypeOne'];

        } else if (isset($_POST['datos']['updateTypeTwo']) && $_POST['datos']['updateTypeTwo'] <> "") {

            $tipoOpcionesDTO->tipo = $_POST['datos']['updateTypeTwo'];

        }

        $tipoOpcionesDTO->idTipoOption = $_POST['datos']['idTipoOpcionesUpdate'];

        $this->model->updateTypeOptionDTO = $tipoOpcionesDTO;
        //Recupera los datos del servicio web

        $this->model->actualizarTipoOpcion();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function deleteTipoOpcion()
    {
        //Pasar los datos del formulario al DTO
        $tipoOpcionesDTO = new TipoOpcionesDTO;
        $tipoOpcionesDTO->idTipoOption = $_POST['datos'];
        $this->model->deleteTypeOptionDTO = $tipoOpcionesDTO;
        //Recupera los datos del servicio web

        $this->model->eliminarTipoOpcion();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function enableTipoOpcion()
    {
        //Pasar los datos del formulario al DTO
        $tipoOpcionesDTO = new TipoOpcionesDTO;
        $tipoOpcionesDTO->idTipoOption = $_POST['datos'];
        $tipoOpcionesDTO->enable = $_POST['estado'];
        $this->model->estadoTypeOptionDTO = $tipoOpcionesDTO;
        //Recupera los datos del servicio web

        $this->model->estadoTipoOpcion();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function tipoOpcionesListSelect(){
        $tipoOpcionesDTO = new TipoOpcionesDTO;
        $tipoOpcionesDTO->idModuleOption = $_POST['data'];
        $this->model->estadoTypeOptionDTO = $tipoOpcionesDTO;
        //Recupera los datos del servicio web

        $this->model->tipoOpcionesListSelect();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);   
    }


}

?>