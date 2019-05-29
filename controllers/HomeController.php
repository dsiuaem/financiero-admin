<?php

class HomeController extends Controller
{
    function __construct()
    {
        //echo "Contructor Home";
        parent::__construct();
    }

    function render()
    {
        $this->view->render('home/index');
    }
}

?>