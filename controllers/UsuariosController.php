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
        $registrarUsuariosDTO->idUser = $_SESSION['idUsuarioADMIN'];
        $registrarUsuariosDTO->idEmpleado = $_POST['datos']['empleadoNewUser'];
        $registrarUsuariosDTO->idUserType= $_POST['datos']['userTypeNewUser'];
        $registrarUsuariosDTO->user = $_POST['datos']['userName'];
        //$registrarUsuariosDTO->email = $_POST['datos']['userEmail'];
        $registrarUsuariosDTO->password = $_POST['datos']['userPass'];
        $this->model->insertUserDTO = $registrarUsuariosDTO;

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

    function usersListTable()
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
        echo $this->model->usuariosDTO;
    }

    function usuariosListTableSinPerfil()
    {
        $listarUsuariosDTO = new UsuariosDTO;
        $listarUsuariosDTO->idPerfil = $_POST["id_perfil"];
        $listarUsuariosDTO->idSystem = $_POST["id_system"];
        //echo $_POST['data'];
        //exit;
        $this->model->getUsuariosTableSinPerfilDTO = $listarUsuariosDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerUsuariosTableSinPerfil();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para tablas según -_-
        echo $this->model->usuariosDTO;
    }

    function usuariosListTableConPerfil()
    {
        $listarUsuariosDTO = new UsuariosDTO;
        $listarUsuariosDTO->idPerfil = $_POST["id_perfil"];
        $listarUsuariosDTO->idSystem = $_POST["id_system"];
        //echo $_POST['data'];
        //exit;
        $this->model->getUsuariosTableConPerfilDTO = $listarUsuariosDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerUsuariosTableConPerfil();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para tablas según -_-
        echo $this->model->usuariosDTO;
    }

    function registrarPerfil()
    {
        //Pasar los datos del formulario al DTO
        $registrarPerfilesUsuariosDTO = new UsuariosDTO;
        $registrarPerfilesUsuariosDTO->contenidoPerfiles = $_POST['datos'];
        $registrarPerfilesUsuariosDTO->idSystem = $_POST['id_system'];
        $registrarPerfilesUsuariosDTO->idPerfil = $_POST['id_perfil'];
        $this->model->asignarPerfilDTO = $registrarPerfilesUsuariosDTO;
        //Recupera los datos del servicio web

        $this->model->asignarPerfiles();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function editUser()
    {
        //Pasar los datos del formulario al DTO
        $usuarioDTO = new UsuariosDTO;
        //var_dump($_POST);die();
        $usuarioDTO->idUser = $_POST['data']['idUser'];
        $usuarioDTO->idPerfil = $_POST['data']['perfil'];
        $usuarioDTO->email = $_POST['data']['email'];
        $usuarioDTO->actualIdPerfil=$_POST['data']['actualIdPerfil'];
        isset($_POST['data']['password'])?$usuarioDTO->password=$_POST['data']['password']:$usuarioDTO->password=null;
        $this->model->asignarPerfilDTO = $usuarioDTO;
        //Recupera los datos del servicio web


        $this->model->editUser();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function cambiarEstado(){
        $usuarioDTO = new UsuariosDTO;
        //var_dump($_POST);die();
        $usuarioDTO->idUser = $_POST['data']['idUser'];
        $usuarioDTO->idSystem = $_POST['data']['idSystem'];
        $usuarioDTO->estado = $_POST['data']['estado'];
        $this->model->cambiarEstadoDTO = $usuarioDTO;
        //Recupera los datos del servicio web


        $this->model->cambiarEstado();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function getEmpleados(){
        $usuarioDTO = new UsuariosDTO;
        //var_dump($_POST);die();
        $this->model->empleados = $usuarioDTO;
        //Recupera los datos del servicio web
        $this->model->getEmpleados();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

     function getEmpleado(){
        $usuarioDTO = new UsuariosDTO;
        $usuarioDTO->id=$_POST['idEmpleado'];
        $this->model->empleado = $usuarioDTO;
        //Recupera los datos del servicio web
        $this->model->getEmpleado();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    /*function getSystemPerfil(){

        $usuarioDTO = new UsuariosDTO;
        $usuarioDTO->idUser=$_POST['idUser'];
        $this->model->empleado = $usuarioDTO;
        //Recupera los datos del servicio web
        $this->model->getSystemPerfil();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model->systemsList);

    }

    function getOutSystemPerfil(){

        $usuarioDTO = new UsuariosDTO;
        $usuarioDTO->idUser=$_POST['idUser'];
        $this->model->empleado = $usuarioDTO;
        //var_dump($usuarioDTO);die();
        //Recupera los datos del servicio web
        $this->model->getOutSystemPerfil();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model->systemsList);

    }

    function changePerfil(){
        $usuarioDTO = new UsuariosDTO;
        //var_dump($_POST);die();
        $usuarioDTO->idUser = $_POST['data']['idUser'];
        $usuarioDTO->idPerfil = $_POST['data']['perfil'];
        $usuarioDTO->actualIdPerfil=$_POST['data']['actualIdPerfil'];
        $this->model->empleado = $usuarioDTO;
        //Recupera los datos del servicio web
        $this->model->editPerfilUser();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }*/

     function getSystemPerfil(){

        $usuarioDTO = new UsuariosDTO;
        $usuarioDTO->idUser=$_POST['idUser'];
        $this->model->empleado = $usuarioDTO;
        //Recupera los datos del servicio web
        $this->model->getSystemPerfil();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model->systemsList);

    }

    function getOutSystemPerfil(){

        $usuarioDTO = new UsuariosDTO;
        $usuarioDTO->idUser=$_POST['idUser'];
        $this->model->empleado = $usuarioDTO;
        //var_dump($usuarioDTO);die();
        //Recupera los datos del servicio web
        $this->model->getOutSystemPerfil();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model->systemsList);

    }

    function changePerfil(){
        $usuarioDTO = new UsuariosDTO;
        //var_dump($_POST);die();
        $usuarioDTO->idUser = $_POST['data']['idUser'];
        $usuarioDTO->idPerfil = $_POST['data']['perfil'];
        $usuarioDTO->actualIdPerfil=$_POST['data']['actualIdPerfil'];
        $this->model->empleado = $usuarioDTO;
        //Recupera los datos del servicio web
        $this->model->editPerfilUser();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    /*function agregarSystemPerfil(){
        //Pasar los datos del formulario al DTO
        var_dump($_POST);die();
        $registrarPerfilesUsuariosDTO = new UsuariosDTO;
        $registrarPerfilesUsuariosDTO->contenidoPerfiles = $_POST['datos'];
        $registrarPerfilesUsuariosDTO->idSystem = $_POST['id_system'];
        $registrarPerfilesUsuariosDTO->idPerfil = $_POST['id_perfil'];
        $this->model->asignarPerfilDTO = $registrarPerfilesUsuariosDTO;
        //Recupera los datos del servicio web

        $this->model->asignarPerfiles();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }*/


}

?>
