<?php
include_once 'models/DTO/SoporteSistemasDTO.php';


class SoporteSistemasController extends Controller{

    function __construct(){
        //echo "Contructor SoporteSistemas";
        parent::__construct();
    }

    function render(){
            //Parametros para mostrar el menu en active
            $this->setTipoController("SoporteSistemas");
            $this->setModuleMenu("Gestion de Sistemas");
            $this->view->render('soporteSistemas/index');
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function registrarAviso(){
      $soporteSistemasDTO = new SoporteSistemasDTO;
      $soporteSistemasDTO->idSystem = $_POST['datos']['systemName'];
      $soporteSistemasDTO->tituloAviso = $_POST['datos']['tituloAviso'];
      $soporteSistemasDTO->aviso = $_POST['datos']['aviso'];
      $this->model->soporteSistemasDTO = $soporteSistemasDTO;
      //Recupera los datos del servicio web
      $this->model->registrarAviso();
      //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
      echo json_encode($this->model);
    }

    function obtenerAvisos(){
       $soporteSistemasDTO = new SoporteSistemasDTO;
       $this->model->avisoList = $soporteSistemasDTO;
       //Recupera los datos del servicio web
       $this->model->obtenerAvisos();
       //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
       echo $this->model->avisoList;
   }


   function systemListSelect(){
       //Recupera los datos del servicio web
       $this->model->consultaSistemasSelect();
       //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
       echo json_encode($this->model);
   }
}
