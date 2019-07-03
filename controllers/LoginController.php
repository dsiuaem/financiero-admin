<?php
require_once 'models/DTO/UsuarioDTO.php';
require_once 'controllers/helpers/JWT.php';

class LoginController extends Controller
{


    function __construct()
    {
        //echo "Controlador login";
        parent::__construct();
    }

    function render()
    {
        //Prueba: tener una session activa, y luego colocar solo el login: http://localhost/uaem_blank/login
        if (SessionUsuario::sessionActiva()) {//Validar session iniciada
            $this->view->render('home/index');
            return false;
        }
        $this->view->render('login/index');
    }

    public function validar()
    {
        if (isset($_POST["nombre"])) {//Indica que viene de un formulario
            $usuarioDTO = new UsuarioDTO;
            $usuarioDTO->nombre = $_POST["nombre"];
            $usuarioDTO->password = $_POST["password"];
            $this->model->usuarioDTO = $usuarioDTO;
            $this->model->consultaService();//termina el envio de datos y comienza la recepcion
            $usuarioDatos = json_decode($this->model->usuarioDTO);
            if ($usuarioDatos != false) {
                $jwt = new JWT;
                $contraBase = $jwt->Desencriptar($usuarioDatos->password);
                $usuario = $usuarioDatos->user;
                $pass = $contraBase;
                $id = $usuarioDatos->idUser;

                $nombre = $_POST["nombre"];
                $contra = $_POST["password"];
                if ($usuario == $nombre) {
                    if ($pass == $contra) {
                        $_SESSION['usuarioADMIN'] = $usuario;
                        $_SESSION['idUsuarioADMIN'] = $id;
                        //Se recuperan los permisos del usuario
                        $menuUser = new MenuUsuario();
                        $permisosMenu = $menuUser->permisosMenuSistema($usuarioDatos->idUser);
                        //var_dump($permisosMenu);
                        $this->setPermisos($permisosMenu);
                        //---------------------------------------------
                        $this->view->render('home/index');
                    } else {
                        $this->view->errorLogin = "Contraseña incorrecta";
                        $this->view->render('login/index');
                    }
                } else {
                    $this->view->errorLogin = "Usuario incorrecto";
                    $this->view->render('login/index');
                }
                return false;
            } else {
                $this->view->errorLogin = "Usuario incorrecto";
            }

        }
        //Prueba: En la URL se coloca http://localhost/uaem_blank/login/validar y la sesion activa
        if (SessionUsuario::sessionActiva()) {
            $this->view->render('home/index');
        } else {
            $this->view->render('login/index');
        }
    }

    public function logOut()
    {

        if (isset($_POST['closeSession'])) {

            unset ($_SESSION["usuarioADMIN"]);
            unset ($_SESSION["idUsuarioADMIN"]);

            $this->setPermisos(NULL);
            $this->view->render('login/index');
            return false;
        }
        //Prueba: En la URL se coloca http://localhost/uaem_blank/login/logOut y la sesion activa
        if (SessionUsuario::sessionActiva()) {
            $this->view->render('home/index');
        } else {
            $this->view->render('login/index');
        }
    }

}

?>