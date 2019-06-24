<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/SistemasDTO.php';

class SistemasController extends Controller
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
        $this->setTipoController("Sistemas");
        $this->setModuleMenu("Gestion de Sistemas");

        $this->view->render('sistemas/index');
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function registerSystem()
    {
        //Pasar los datos del formulario al DTO
        $sistemasDTO = new SistemasDTO;
        //$SistemasDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $sistemasDTO->name = $_POST['datos']['nombreSistema'];
        //$sistemasDTO->icon = $_POST['datos']['iconoSistema']['name'];
        $this->model->insertSystemtDTO = $sistemasDTO;
        //Recupera los datos del servicio web

        $this->model->registrarSistema();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function systemListSelect()
    {
        //Recupera los datos del servicio web
        $this->model->consultaSistemasSelect();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function sistemasListTable()
    {
        $this->model->obtenerSistemasTable();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para datatables
        echo $this->model->sistemasDTO;
    }

    function updateSystem()
    {
        //Pasar los datos del formulario al DTO
        $sistemasDTO = new SistemasDTO;
        //$SistemasDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $sistemasDTO->idSystem = $_POST['datos']['idSystemUpdate'];
        $sistemasDTO->name = $_POST['datos']['updateNombreSistema'];
        //$sistemasDTO->icon = $_POST['datos']['updateIconoSistema']['name'];
        $this->model->updateSystemDTO = $sistemasDTO;
        //Recupera los datos del servicio web

        $this->model->actualizarSistema();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function deleteSystem()
    {
        //Pasar los datos del formulario al DTO
        $sistemasDTO = new SistemasDTO;
        //$SistemasDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $sistemasDTO->idSystem = $_POST['datos'];
        $this->model->deleteSystemDTO = $sistemasDTO;
        //Recupera los datos del servicio web

        $this->model->eliminarSistema();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function enableSystem()
    {
        //Pasar los datos del formulario al DTO
        $sistemasDTO = new SistemasDTO;
        //$SistemasDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $sistemasDTO->idSystem = $_POST['datos'];
        $sistemasDTO->enable = $_POST['estado'];
        $this->model->estadoSystemDTO = $sistemasDTO;
        //Recupera los datos del servicio web

        $this->model->estadoSistema();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }


}

?>
