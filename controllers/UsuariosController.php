<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/UsuariosDTO.php';

class UsuariosController extends Controller
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
        $this->setTipoController("Usuarios");
        $this->setModuleMenu("Gestion de Sistemas");

        $this->view->render('usuarios/index');
    }

    function userTypeList()
    {
        //Recupera los datos del servicio web
        $this->model->consultaTipoUsuarios();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function registrarUsuarios()
    {
        //Pasar los datos del formulario al DTO
        $registrarUsuariosDTO = new UsuariosDTO;
        //$SistemasDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $registrarUsuariosDTO->idSystem = $_POST['datos']['systemNameNewUser'];
        $registrarUsuariosDTO->idUserType = $_POST['datos']['userTypeNewUser'];
        $registrarUsuariosDTO->user = $_POST['datos']['userName'];
        //$registrarUsuariosDTO->email = $_POST['datos']['userEmail'];
        $registrarUsuariosDTO->password = $_POST['datos']['userPass'];
        $this->model->insertUserDTO = $registrarUsuariosDTO;
        //Recupera los datos del servicio web

        $this->model->registrarUsuario();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function perfilesListSelect()
    {
        $asignarPerfilesDTO = new UsuariosDTO;
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
        $asignarPerfilesDTO = new UsuariosDTO;
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

    function usersListTable()
    {
        $listarUsuariosDTO = new UsuariosDTO;
        $listarUsuariosDTO->idSystem = $_POST["id"];
        //echo $_POST['data'];
        //exit;
        $this->model->getUsuariosTableDTO = $listarUsuariosDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerUsuariosTable();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para tablas según -_-
        echo $this->model->usuariosDTO;
    }


}

?>