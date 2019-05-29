<?php

class View
{

    public $model;
    public $errorLogin;
    public $permisosMenu;
    public $tipoController;
    public $moduleMenu;


    function __construct()
    {
        // echo "Vista base ";
    }

    //Se renderisa a la vista
    function render($nombreVista)
    {
        require 'views/' . $nombreVista . '.php';
    }


}

?>