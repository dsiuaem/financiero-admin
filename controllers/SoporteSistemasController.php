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

    function systemListSelect(){
      //Recupera los datos del servicio web
      $this->model->consultaSistemasSelect();
      //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
      echo json_encode($this->model);
    }

    function getAllTodosEmpleadosSelect(){
        $soporteSistemasDTO = new SoporteSistemasDTO;
        $soporteSistemasDTO->busqueda = (isset($_GET['search']))?$_GET['search']:"";
        $soporteSistemasDTO->pagina = (isset($_GET['page']))?$_GET['page']:"1";
        $this->model->soporteSistemasDTO = $soporteSistemasDTO;
        $this->model->getAllTodosEmpleadosSelect();
        $listadoempleados=json_decode($this->model->soporteSistemasDTO, true);
        $arreglo[]=array();
        $opciones[]=array();
        for ($i=0; $i < count($listadoempleados); $i++) {
            $nombre = $listadoempleados[$i]["nombre"]." ".$listadoempleados[$i]["apPaterno"]." ".$listadoempleados[$i]["apMaterno"];
            $valores = ["id"=> $listadoempleados[$i]["idEmpleado"], "text"=> $nombre];
            array_push($opciones, $valores);
        }
        if (count($opciones)>100) {
            $paginado = ["more"=> true];
        }else{
            $paginado = ["more"=> false];
        }
        $arreglo["results"]=$opciones;
        $arreglo["pagination"]=$paginado;
        echo json_encode($arreglo);
    }

    function getEmpleadoNiveles(){
      $soporteSistemasDTO = new SoporteSistemasDTO;
      $soporteSistemasDTO->idEmpleado = $_POST["idEmpleado"];
      $this->model->soporteSistemasDTO=$soporteSistemasDTO;
      $this->model->getEmpleadoNiveles();
      echo json_encode($this->model);
    }

    function getIP(){
        if (isset($_SERVER["HTTP_CLIENT_IP"])){
            $var= $_SERVER["HTTP_CLIENT_IP"];
        }elseif (isset($_SERVER["HTTP_X_FORWARDED_FOR"])){
            $var= $_SERVER["HTTP_X_FORWARDED_FOR"];
        }elseif (isset($_SERVER["HTTP_X_FORWARDED"])){
            $var= $_SERVER["HTTP_X_FORWARDED"];
        }elseif (isset($_SERVER["HTTP_FORWARDED_FOR"])){
            $var= $_SERVER["HTTP_FORWARDED_FOR"];
        }elseif (isset($_SERVER["HTTP_FORWARDED"])){
            $var= $_SERVER["HTTP_FORWARDED"];
        }else {
            $var= $_SERVER["REMOTE_ADDR"];
        }
        return $var;
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function registrarAviso(){
      $soporteSistemasDTO = new SoporteSistemasDTO;
      $soporteSistemasDTO->idUser = $_SESSION['idUsuarioADMIN'];
      $soporteSistemasDTO->idSystem = $_POST['datos']['systemName'];
      $soporteSistemasDTO->tituloAviso = $_POST['datos']['tituloAviso'];
      $soporteSistemasDTO->aviso = $_POST['datos']['aviso'];
      $soporteSistemasDTO->fechaTermino = $_POST['datos']['fecha'];
      $soporteSistemasDTO->idEmpleado = $_POST['datos']["selectEmpleado"];
      $soporteSistemasDTO->ip = $this->getIP();
      if(isset($_POST['datos']['mostrarEmpleado'])){
        $soporteSistemasDTO->identificaSolicitante = 1;
      }else{
        $soporteSistemasDTO->identificaSolicitante = 0;
      }
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

   function actualizarAviso(){
     $soporteSistemasDTO = new SoporteSistemasDTO;
     $soporteSistemasDTO->idAviso = $_POST['datos']['idAviso'];
     $soporteSistemasDTO->idUser = $_SESSION['idUsuarioADMIN'];
     $soporteSistemasDTO->idSystem = $_POST['datos']['systemName'];
     $soporteSistemasDTO->lastSystem = $_POST['datos']['lastSystem'];
     $soporteSistemasDTO->tituloAviso = $_POST['datos']['tituloAviso'];
     $soporteSistemasDTO->aviso = $_POST['datos']['aviso'];
     $soporteSistemasDTO->fechaTermino = $_POST['datos']['fecha'];
     $soporteSistemasDTO->idEmpleado = $_POST['datos']["selectEmpleado"];
     $soporteSistemasDTO->ip = $this->getIP();
     if(isset($_POST['datos']['mostrarEmpleado'])){
       $soporteSistemasDTO->identificaSolicitante = 1;
     }else{
       $soporteSistemasDTO->identificaSolicitante = 0;
     }
     $this->model->soporteSistemasDTO = $soporteSistemasDTO;
     //Recupera los datos del servicio web
     $this->model->actualizarAviso();
     //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
     echo json_encode($this->model);
   }

   function eliminarAviso(){
     $soporteSistemasDTO = new SoporteSistemasDTO;
     $soporteSistemasDTO->idUser = $_SESSION['idUsuarioADMIN'];
     $soporteSistemasDTO->idAviso = $_POST['idAviso'];
     $soporteSistemasDTO->ip = $this->getIP();
     $this->model->soporteSistemasDTO = $soporteSistemasDTO;
     //Recupera los datos del servicio web
     $this->model->eliminarAviso();
     //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
     echo json_encode($this->model);
   }

   function activarAviso(){
     $soporteSistemasDTO = new SoporteSistemasDTO;
     $soporteSistemasDTO->idUser = $_SESSION['idUsuarioADMIN'];
     $soporteSistemasDTO->idAviso = $_POST['idAviso'];
     $this->model->soporteSistemasDTO = $soporteSistemasDTO;
     //Recupera los datos del servicio web
     $this->model->activarAviso();
     //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
     echo json_encode($this->model);
   }

   // ---------------------------- PREGUNTAS FRECUENTES ------------------------
   function obtenerPreguntasFrecuentes(){
      $soporteSistemasDTO = new SoporteSistemasDTO;
      $this->model->preguntasFrecuentesList = $soporteSistemasDTO;
      $soporteSistemasDTO->idSystem = $_POST['idSystem'];
      //Recupera los datos del servicio web
      //var_dump($soporteSistemasDTO);
      $this->model->obtenerPreguntasFrecuentes();
      //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
      echo $this->model->preguntasFrecuentesList;
  }

  function registrarPreguntaFrecuente(){
    $soporteSistemasDTO = new SoporteSistemasDTO;
    $soporteSistemasDTO->idUser = $_SESSION['idUsuarioADMIN'];
    $soporteSistemasDTO->idSystem = $_POST['datos']['systemName'];
    $soporteSistemasDTO->pregunta = $_POST['datos']['pregunta'];
    $soporteSistemasDTO->respuesta = $_POST['datos']['respuesta'];
    $this->model->soporteSistemasDTO = $soporteSistemasDTO;
    //Recupera los datos del servicio web
    $this->model->registrarPreguntaFrecuente();
    //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
    echo json_encode($this->model);
  }

  function actualizarPreguntaFrecuente(){
    $soporteSistemasDTO = new SoporteSistemasDTO;
    $soporteSistemasDTO->idUser = $_SESSION['idUsuarioADMIN'];
    $soporteSistemasDTO->idPregunta = $_POST['datos']['idPregunta'];
    $soporteSistemasDTO->idSystem = $_POST['datos']['systemName'];
    $soporteSistemasDTO->pregunta = $_POST['datos']['pregunta'];
    $soporteSistemasDTO->respuesta = $_POST['datos']['respuesta'];
    if(isset($_POST['datos']['mostrarPregunta'])){
      $soporteSistemasDTO->activo = 1;
    }else{
      $soporteSistemasDTO->activo = 0;
    }
    $this->model->soporteSistemasDTO = $soporteSistemasDTO;
    //Recupera los datos del servicio web
    $this->model->actualizarPreguntaFrecuente();
    //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
    echo json_encode($this->model);
  }

  function eliminarPreguntaFrecuente(){
    $soporteSistemasDTO = new SoporteSistemasDTO;
    $soporteSistemasDTO->idUser = $_SESSION['idUsuarioADMIN'];
    $soporteSistemasDTO->idPregunta = $_POST['idPregunta'];
    $this->model->soporteSistemasDTO = $soporteSistemasDTO;
    //Recupera los datos del servicio web
    $this->model->eliminarPreguntaFrecuente();
    //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
    echo json_encode($this->model);
  }

  function actualizarOrdenPreguntaFrecuente(){
    $soporteSistemasDTO = new SoporteSistemasDTO;
    $soporteSistemasDTO->idUser = $_SESSION['idUsuarioADMIN'];
    $soporteSistemasDTO->idPregunta = $_POST['datos']['idPregunta'];
    $soporteSistemasDTO->orden = $_POST['datos']['orden'];

    $this->model->soporteSistemasDTO = $soporteSistemasDTO;
    //Recupera los datos del servicio web
    $this->model->actualizarOrdenPreguntaFrecuente();
    //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
    echo json_encode($this->model);
  }

}
