<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/ListadoPerfilesDTO.php';

class ListadoPerfilesController extends Controller
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
        $this->setTipoController("ListadoPerfiles");
        $this->setModuleMenu("Perfiles");

        $this->view->render('listadoperfiles/index');
    }

    function perfilesListTable()
    {
        $ListadoPerfilesDTO = new ListadoPerfilesDTO;
        $ListadoPerfilesDTO->idSystem = $_POST["id"];
        $this->model->getPerfilesTableDTO = $ListadoPerfilesDTO;
        $this->model->obtenerPerfilesTable();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        //echo json_encode($this->model);
        //Para tablas según -_-
        echo $this->model->perfilesDTO;
    }


}

?>