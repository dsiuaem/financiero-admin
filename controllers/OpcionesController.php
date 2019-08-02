<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/OpcionesDTO.php';

class OpcionesController extends Controller
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
        $this->setTipoController("Opciones");
        $this->setModuleMenu("Gestion de Sistemas");

        $this->view->render('opciones/index');
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function registrarOpcion()
    {
        //Pasar los datos del formulario al DTO
        $opcionesDTO = new OpcionesDTO;
        //$SistemasDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $opcionesDTO->idSubModule = $_POST['datos']['submoduleName'];
        $opcionesDTO->name = $_POST['datos']['nameOption'];
        $opcionesDTO->description = $_POST['datos']['description'];
        $this->model->insertOptionDTO = $opcionesDTO;
        //Recupera los datos del servicio web

        $this->model->registrarOpcion();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function opcionesListSelect()
    {
        $opcionesDTO = new OpcionesDTO;
        $opcionesDTO->idSubModule = $_POST["data"];
        //echo $_POST['data'];
        //exit;
        $this->model->getOpcionesSelectDTO = $opcionesDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerOpcionesSelect();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function opcionesListTable()
    {
        $opcionesDTO = new OpcionesDTO;
        $opcionesDTO->idSubModule = $_POST["id"];
        //echo $_POST['data'];
        //exit;
        $this->model->getOpcionesTableDTO = $opcionesDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerOpcionesTable();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para tablas según -_-
        echo $this->model->opcionesDTO;
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function updateOpcion()
    {
        //Pasar los datos del formulario al DTO
        $opcionesDTO = new OpcionesDTO;
        $opcionesDTO->name = $_POST['datos']['updateNameOption'];
        $opcionesDTO->description = $_POST['datos']['updateDescription'];
        $opcionesDTO->idModuleOption = $_POST['datos']['idOpcionesUpdate'];
        $this->model->updateOptionDTO = $opcionesDTO;
        //Recupera los datos del servicio web

        $this->model->actualizarOpcion();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function deleteOpcion()
    {
        //Pasar los datos del formulario al DTO
        $opcionesDTO = new OpcionesDTO;
        $opcionesDTO->idModuleOption = $_POST['datos'];
        $this->model->deleteOptionDTO = $opcionesDTO;
        //Recupera los datos del servicio web

        $this->model->eliminarOpcion();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function enableOpcion()
    {
        //Pasar los datos del formulario al DTO
        $opcionesDTO = new OpcionesDTO;
        $opcionesDTO->idModuleOption = $_POST['datos'];
        $opcionesDTO->enable = $_POST['estado'];
        $this->model->estadoOptionDTO = $opcionesDTO;
        //Recupera los datos del servicio web

        $this->model->estadoOpcion();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function actualizarOrden(){
      $orden = new OpcionesDTO;
      $orden->idUser = $_SESSION['idUsuarioADMIN'];
      $orden->idModuleOption = $_POST['datos']['idTemp'];
      $orden->orden = $_POST['datos']['orden'];

      $this->model->updateOptionDTO = $orden;
      //Recupera los datos del servicio web
      $this->model->actualizarOrden();
      //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
      echo json_encode($this->model);
    }


}

?>
