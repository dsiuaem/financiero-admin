<?php
require_once 'controllers/ErrorController.php';
require_once 'controllers/SessionUsuario.php';
require_once 'controllers/MenuUsuario.php';

class App
{

    function __construct()
    {
        session_start();//Se inicia sesion en la aplicacion    
        //Dividir la url en controladores y métodos
        $url = isset($_GET['url']) ? $_GET['url'] : null;
        $url = rtrim($url, "/");
        $url = explode('/', $url);

        if (SessionUsuario::sessionActiva()) {//////////////////////Verificar que exista una sesion activa, en toda la aplicacion, tanto controladores como metodos
            //Permisos para las opciones del menu principal, tambien se colocó en el login validar.
            $menuUser = new MenuUsuario();
            $permisosMenu = $menuUser->permisosMenuSistema($_SESSION['idUsuarioADMIN']);//Se le pasa el usuario para validar sus permisos
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (empty($url[0])) {//Si la url llega vacia, se va al controller del home
                $archivoController = 'controllers/HomeController.php';
                require_once $archivoController;
                $controller = new HomeController();
                $controller->setPermisos($permisosMenu);
                $controller->render();
                $controller->loadModel('Home');
                return false;
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            $archivoController = 'controllers/' . $url[0] . 'Controller.php';
            if (file_exists($archivoController)) {
                require_once $archivoController;
                $controllerClass = $url[0] . 'Controller';
                $controller = new $controllerClass;
                $controller->setPermisos($permisosMenu);
                $controller->loadModel($url[0]);
                //Validar que exista la parte del método en la URL
                if (isset($url[1])) {
                    if (method_exists($controller, $url[1])) {
                        $controller->{$url[1]}();
                    } else {
                        //echo "No existe el metodo";
                        $controllerErrores = new ErrorController();
                        $controllerErrores->setPermisos($permisosMenu);
                        $controllerErrores->render();
                        return false;
                    }
                } else {
                    $controller->render();//Carga la vista del controlador indicado
                }
                return false;
            } else {
                $controllerErrores = new ErrorController();
                $controllerErrores->setPermisos($permisosMenu);
                $controllerErrores->render();
                return false;
            }
        } else {/////////////////////////////////////////////////////////////////////////////////////////////////No existe una session activa

            $archivoController = 'controllers/LoginController.php';
            require_once $archivoController;
            $controller = new LoginController();
            $controller->loadModel("Login");
            //Validar que exista la parte del método en la URL
            if (isset($url[1])) {
                if (method_exists($controller, $url[1])) {
                    $controller->{$url[1]}();
                } else {
                    //echo "No existe el metodo";
                    $controllerErrores = new ErrorController();
                    $controllerErrores->setPermisos(NULL);
                    $controllerErrores->render();
                    return false;
                }
            } else {
                $controller->render();
            }
            return false;
        }
    }
}

?>