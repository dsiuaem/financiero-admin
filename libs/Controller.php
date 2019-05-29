<?php

class Controller
{

    function __construct()
    {
        //echo "<p>Controlador base</p>";
        $this->view = new View();//Se crea la variable view para este controlador
    }

    function loadModel($model)
    {
        $url = 'models/' . $model . 'Model.php';
        if (file_exists($url)) {
            require $url;
            $modelName = $model . 'Model';
            $this->model = new $modelName;

        }
    }

    function setPermisos($permisosMenu)
    {
        $this->view->permisosMenu = $permisosMenu;
    }

    function setTipoController($controller)
    {
        $this->view->tipoController = $controller;;
    }

    function setModuleMenu($moduloMenu)
    {
        $this->view->moduleMenu = $moduloMenu;;
    }

}

?>