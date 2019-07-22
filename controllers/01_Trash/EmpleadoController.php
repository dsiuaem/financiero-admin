<?php
include_once 'models/DTO/EmpleadoDTO.php';
include_once 'controllers/helpers/EmpleadoForm.php';

class EmpleadoController extends Controller
{

    function __construct()
    {
        parent::__construct();
    }

    function render()
    {
        $this->view->render('empleado/index');
    }

    function registrar()
    {
        //////////////////////////////////////////////////Validar el contenido de los campos del formulario por si deshabilita javascript
        $data = json_encode($_POST['datos']);
        $empleadoForm = new EmpleadoForm();
        if (!$empleadoForm->validaForm($data, $this->model)) {
            echo json_encode($this->model);
            return false;
        }
        //////////////////////////////////////////////////////
        //Pasar los datos del formulario al DTO
        $empleadoDTO = new EmpleadoDTO;
        $empleadoDTO->nombre = $_POST['datos'][0]["value"];
        $empleadoDTO->edad = $_POST['datos'][1]["value"];
        $empleadoDTO->salario = $_POST['datos'][2]["value"];
        $this->model->empleadoDTO = $empleadoDTO;

        //Recupera los datos del servicio web
        $this->model->registrarService();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function consultar()
    {
        //Recupera los datos del servicio web
        $this->model->consultaService();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    function eliminar()
    {
        $empleadoDTO = new EmpleadoDTO;
        $empleadoDTO->id = $_POST["id"];
        $this->model->empleadoDTO = $empleadoDTO;
        $this->model->eliminaService();
        echo json_encode($this->model);
    }

    function modificar()
    {
        $empleadoDTO = new EmpleadoDTO;
        $empleadoDTO->id = $_POST["id"];
        $this->model->empleadoDTO = $empleadoDTO;
        $this->model->modificaService();
        echo json_encode($this->model);
    }

    function modificarEmp()
    {
        //////////////////////////////////////////////////Validar el contenido de los campos del formulario por si deshabilita javascript
        $data = json_encode($_POST['datos']);
        $empleadoForm = new EmpleadoForm();
        if (!$empleadoForm->validaModificaForm($data, $this->model)) {
            echo json_encode($this->model);
            return false;
        }
        //////////////////////////////////////////////////////

        $empleadoDTO = new EmpleadoDTO;
        $empleadoDTO->id = $_POST['datos'][0]["value"];
        $empleadoDTO->nombre = $_POST['datos'][1]["value"];
        $empleadoDTO->edad = $_POST['datos'][2]["value"];
        $empleadoDTO->salario = $_POST['datos'][3]["value"];


        $this->model->empleadoDTO = $empleadoDTO;
        $this->model->actualizaService();
        echo json_encode($this->model);
    }

    function modificarEmpPop()
    {
        //////////////////////////////////////////////////Validar el contenido de los campos del formulario por si deshabilita javascript
        $data = json_encode($_POST['nombre']);
        $empleadoForm = new EmpleadoForm();
        if (!$empleadoForm->validaModificaPop($data, $this->model)) {
            echo json_encode($this->model);
            return false;
        }
        //////////////////////////////////////////////////////

        $empleadoDTO = new EmpleadoDTO;
        $empleadoDTO->id = $_POST['id'];
        $empleadoDTO->nombre = $_POST['nombre'];
        $empleadoDTO->edad = $_POST['edad'];
        $empleadoDTO->salario = $_POST['salario'];


        $this->model->empleadoDTO = $empleadoDTO;
        $this->model->actualizaService();
        echo json_encode($this->model);
    }

}

?>
