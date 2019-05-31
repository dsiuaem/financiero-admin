<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/RegistrarUsuariosDTO.php';

class RegistrarUsuariosController extends Controller
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
        $this->setTipoController("RegistrarUsuarios");
        $this->setModuleMenu("Usuarios");

        $this->view->render('registrarusuarios/index');
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
        $registrarUsuariosDTO = new RegistrarUsuariosDTO;
        //$SistemasDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $registrarUsuariosDTO->idSystem = $_POST['datos']['systemName'];
        $registrarUsuariosDTO->idUserType = $_POST['datos']['userType'];
        $registrarUsuariosDTO->user = $_POST['datos']['userName'];
        $registrarUsuariosDTO->email = $_POST['datos']['userEmail'];
        $registrarUsuariosDTO->password = $_POST['datos']['userPass'];
        $this->model->insertUserDTO = $registrarUsuariosDTO;
        //Recupera los datos del servicio web

        $this->model->registrarUsuario();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }


}

?>