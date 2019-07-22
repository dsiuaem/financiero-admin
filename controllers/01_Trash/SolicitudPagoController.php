<?php
//---------------- controlador de funciones sobre la solicitud de pago
include_once 'models/DTO/SolicitudPagoDTO.php';
include_once 'models/DTO/SolicitudPagoArchivoDTO.php';
include_once 'models/DTO/SolicitudPagoSeguimientoDTO.php';
include_once 'controllers/helpers/SolicitudPagoForm.php';

class SolicitudPagoController extends Controller
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
        $this->setTipoController("SolicitudPago");
        $this->setModuleMenu("Ventanilla");
        $this->view->render('solicitudPago/index');
    }

    //funciones para todos los movimientos y tratado de los archivos

    //funcion para mover el archivo del equipo del cliente al servidor de datos del sistema
    function moveFile()
    {
        // $directorio = "Z:/SIA/SP/".$_POST['idFolio'];
        $directorio = "C:/Users/U02BH9/Desktop/ArchivosSIA/" . $_POST['idFolio'];

        if (file_exists($directorio)) {
            $archivo = (isset($_FILES['archivo'])) ? $_FILES['archivo'] : null;
            if ($archivo) {
                $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
                $extension = strtolower($extension);
                $ruta_destino_archivo = "{$directorio}/{$archivo['name']}";
                $archivo_ok = move_uploaded_file($archivo['tmp_name'], $ruta_destino_archivo);
            }
            if (isset($archivo)) {
                if (!$archivo_ok) {
                    echo "Error al intentar subir el archivo.";
                } else {
                    echo "El archivo ha sido subido correctamente.";
                }
            }
        } else {
            $dirmake = mkdir($directorio, 0777);
            $archivo = (isset($_FILES['archivo'])) ? $_FILES['archivo'] : null;
            if ($archivo) {
                $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
                $extension = strtolower($extension);
                $ruta_destino_archivo = "{$directorio}/{$archivo['name']}";
                $archivo_ok = move_uploaded_file($archivo['tmp_name'], $ruta_destino_archivo);
            }
            if (isset($archivo)) {
                if (!$archivo_ok) {
                    echo "Error al intentar subir el archivo.";
                } else {
                    echo "El archivo ha sido subido correctamente.";
                }
            }
        }
    }

    //funcion para la eliminacion logica del sistema, solo se elimina logicamente no del servidor de archivos, por lo que solo se modifica la base de datos
    function deleteFile()
    {
        $SolicitudPagoArchivoDTO = new SolicitudPagoArchivoDTO;
        $SolicitudPagoArchivoDTO->idFile = $_POST["data"];
        $this->model->solicitudPagoArchivoDTO = $SolicitudPagoArchivoDTO;
        $this->model->updateFileActivo();
        echo json_encode($this->model);
    }

    //funcion para realizar la consulta de los archivos con status de activo sobre la solicitud donde se consulta actualmente
    function consultaArchivos()
    {
        $SolicitudPagoArchivoDTO = new SolicitudPagoArchivoDTO;
        $SolicitudPagoArchivoDTO->idSolicitud = $_POST['id'];

        $this->model->solicitudArchivoList = $SolicitudPagoArchivoDTO;
        //Recupera los datos del servicio web
        $this->model->consultarArchivoService();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    //funcion para el registro de los archivos que se adjuntan a la solicitud de pago registrada previamente
    function registrarArchivo()
    {
        //Pasar los datos del formulario al DTO
        $SolicitudPagoArchivoDTO = new SolicitudPagoArchivoDTO;
        $SolicitudPagoArchivoDTO->idSolicitud = $_POST['datos']['idSolicitud'];
        $SolicitudPagoArchivoDTO->tipoDocumento = $_POST['datos']['tipoDocumento'];
        $SolicitudPagoArchivoDTO->nombre = $_POST['datos']['nombre'];
        $SolicitudPagoArchivoDTO->extension = $_POST['datos']['extension'];
        $SolicitudPagoArchivoDTO->ruta = $_POST['datos']['ruta'];
        $SolicitudPagoArchivoDTO->activo = $_POST['datos']['activo'];

        $this->model->solicitudPagoArchivoDTO = $SolicitudPagoArchivoDTO;
        //Recupera los datos del servicio web
        $this->model->registrarArchivoService();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    //funcion para el renombrado del archivo, en esta funcion solo se mueve el archivo dentro de su misma ruta pero solo cambiandole el nombre final del archivo
    function renameFile()
    {
        $nombre = explode('.', $_POST['data']['nombre']);
        $tamaño = count($nombre);
        $extension = $nombre[$tamaño - 1];
        // rename("Z:/SIA/SP/".$_POST['data']['idSolicitud']."/".$_POST['data']['nombre'], "Z:/SIA/SP/".$_POST['data']['idSolicitud']."/".$_POST['data']['idRegistro'].".".$extension);
        rename("C:/Users/U02BH9/Desktop/ArchivosSIA/" . $_POST['data']['idSolicitud'] . "/" . $_POST['data']['nombre'], "C:/Users/U02BH9/Desktop/ArchivosSIA/" . $_POST['data']['idSolicitud'] . "/" . $_POST['data']['idRegistro'] . "." . $extension);
    }

    //funciones para el registro de las solicitudes de pago

    //funcion para el registro de la solicitud de pago, este es el primer registro de la solicitud de conceptos generales
    function registrar()
    {

        $solicitudPagoForm = new SolicitudPagoForm();
        if (!$solicitudPagoForm->validaCapturaForm($_POST['datos'], $this->model)) {
            echo json_encode($this->model);
        } else {
            //Pasar los datos del formulario al DTO
            $SolicitudPagoDTO = new SolicitudPagoDTO;
            $SolicitudPagoDTO->idUser = $_SESSION["idUsuarioADMIN"];
            //$SolicitudPagoDTO->tramite=$_POST['datos'][""];
            //$SolicitudPagoDTO->unidadAcademica=$_POST['datos'][""];
            $SolicitudPagoDTO->tipoRecurso = $_POST['datos']['tipoRecurso'];
            $SolicitudPagoDTO->idSubfondo = $_POST['datos']['subfondoList'];
            $SolicitudPagoDTO->idTipoBeneficiario = $_POST['datos']['tipoBeneficiario'];
            $SolicitudPagoDTO->beneficiario = $_POST['datos']['nombreBeneficiario'];
            $SolicitudPagoDTO->importe = $_POST['datos']['importe'];
            $SolicitudPagoDTO->concepto = $_POST['datos']['concepto'];
            $SolicitudPagoDTO->tipoGasto = $_POST['datos']['tipoGasto'];
            $this->model->solicitudPagoDTO = $SolicitudPagoDTO;
            //Recupera los datos del servicio web

            $this->model->registrarService();
            //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
            echo json_encode($this->model);
        }
    }

    //funcion para obtener el listado de los recursos desde la base de datos
    function recurso()
    {
        $this->model->consultaRecurso();
        echo json_encode($this->model);
    }

    //funcion para obtener el listado de tipos de gasto desde la base de datos
    function gasto()
    {
        $this->model->consultaGasto();
        echo json_encode($this->model);
    }

    //funcion para obtener el listado de los tipos de beneficiarios desde la base de datos
    function tipoBeneficiario()
    {
        $this->model->consultaTipoBeneficiario();
        echo json_encode($this->model);
    }

    //funcion para obtener el listado de subfondos desde la base de datos
    function subfondo()
    {
        $solicitudPagoDTO = new SolicitudPagoDTO;
        $solicitudPagoDTO->idTipoRecurso = $_POST['data'];
        $this->model->idTipoRecurso = $solicitudPagoDTO;
        $this->model->consultaSubfondo();
        echo json_encode($this->model);
    }

    //funcion donde se obtiene el listado de dependencias desde la base de datos
    function dependencias()
    {
        $this->model->consultaDependencias();
        echo json_encode($this->model);
    }

    //funcion la cual se emplea para obtener el listado de empleados desde la base de datos
    function empleados()
    {
        $this->model->consultaEmpleados();
        echo json_encode($this->model);
    }

    //funcion para obtener el listado de los acreedores desde la base de datos
    function acreedores()
    {
        $this->model->consultaAcreedores();
        echo json_encode($this->model);
    }

    //funcion para obtener el listado de los proveedores desde la base de datos
    function proveedores()
    {
        $this->model->consultaProveedores();
        echo json_encode($this->model);
    }

    //funcion para obtener el listado de los tipos de documentos desde la base de datos
    function tipoFile()
    {
        $this->model->consultaTipoFile();
        echo json_encode($this->model);
    }

    //funcion para el registro de los seguimientos de las solicitudes de pago, esta es utilizada para registrar el estatus de la solicitud para saber en que estatus se encuentra actualmente
    function registrarSeguimiento()
    {
        $SolicitudPagoSeguimientoDTO = new SolicitudPagoSeguimientoDTO;
        $SolicitudPagoSeguimientoDTO->idSolicitud = $_POST['datos']["idSolicitud"];
        $SolicitudPagoSeguimientoDTO->idStatus = $_POST['datos']['idStatus'];
        $SolicitudPagoSeguimientoDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $SolicitudPagoSeguimientoDTO->ip = $this->getIP();

        $this->model->solicitudPagoSeguimientoDTO = $SolicitudPagoSeguimientoDTO;
        $this->model->registrarSeguimientoService();

        echo json_encode($this->model);
    }

    //funcion para obtener el ip del equipo del cliente, esto para saber desde que ip se realizaron los cambios de estatus de las solicitudes
    function getIP()
    {

        if (isset($_SERVER["HTTP_CLIENT_IP"])) {

            return $_SERVER["HTTP_CLIENT_IP"];

        } elseif (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {

            return $_SERVER["HTTP_X_FORWARDED_FOR"];

        } elseif (isset($_SERVER["HTTP_X_FORWARDED"])) {

            return $_SERVER["HTTP_X_FORWARDED"];

        } elseif (isset($_SERVER["HTTP_FORWARDED_FOR"])) {

            return $_SERVER["HTTP_FORWARDED_FOR"];

        } elseif (isset($_SERVER["HTTP_FORWARDED"])) {

            return $_SERVER["HTTP_FORWARDED"];

        } else {

            return $_SERVER["REMOTE_ADDR"];
        }
    }

    //funcion para actualizar los datos ingresados previamente por el usuario en donde si realiza algun cambio se almacene en la respectiva solicitud y el campo respectivo
    function updateRegistro()
    {
        //Pasar los datos del formulario al DTO
        $SolicitudPagoDTO = new SolicitudPagoDTO;
        $SolicitudPagoDTO->idSolicitud = $_POST['datos'][0]["value"];
        $SolicitudPagoDTO->idUser = $_SESSION["idUsuarioADMIN"];
        $SolicitudPagoDTO->tramite = $_POST['datos'][1]["value"];
        $SolicitudPagoDTO->unidadAcademica = $_POST['datos'][2]["value"];
        $SolicitudPagoDTO->tipoRecurso = $_POST['datos'][3]["value"];
        $SolicitudPagoDTO->idSubfondo = $_POST['datos'][4]["value"];
        $SolicitudPagoDTO->idTipoBeneficiario = $_POST['datos'][5]["value"];
        $SolicitudPagoDTO->idBeneficiario = $_POST['datos'][6]["value"];
        $SolicitudPagoDTO->importe = $_POST['datos'][7]["value"];
        $SolicitudPagoDTO->concepto = $_POST['datos'][8]["value"];
        $SolicitudPagoDTO->tipoGasto = $_POST['datos'][9]["value"];

        $this->model->solicitudPagoDTO = $SolicitudPagoDTO;
        //Recupera los datos del servicio web
        $this->model->updateRegistroService();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    //funcion donde se actualiza el seguimiento de la solicitud donde se cambia a 0 para desactivar el seguimiento en curso y realizar el registro del nuevo seguimiento de la solicitud
    function updateSeguimiento()
    {
        $SolicitudPagoSeguimientoDTO = new SolicitudPagoSeguimientoDTO;
        $SolicitudPagoSeguimientoDTO->idSolicitud = $_POST["id"];

        $this->model->solicitudPagoSeguimientoDTO = $SolicitudPagoSeguimientoDTO;
        $this->model->updateSeguimientoService();

        echo json_encode($this->model);
    }

    //funcion para la consulta de solicitudes para el mostrado en los listados por estatus
    function consultaSolicitudes()
    {
        $SolicitudPagoDTO = new SolicitudPagoDTO;
        //$SolicitudPagoDTO->idTipoOption=$_POST['id'];
        $SolicitudPagoDTO->parametrosGet = $_GET;
        $SolicitudPagoDTO->idTipoOption = $_GET['idTipo'];

        $this->model->solicitudList = $SolicitudPagoDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerSolicitudes();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo($this->model->solicitudList);// ENVIAR SIN JSON_encode PARA EL DATATBLE
    }

    //funcion para la consulta individual de cada solicitud donde se cargan los datos de la solicitud en la vista del cliente para mostrarle los datos que se han ingresado hasta el momento de la solicitud
    function consultaSolicitud()
    {
        $SolicitudPagoDTO = new SolicitudPagoDTO;
        $SolicitudPagoDTO->idSolicitud = $_POST['id'];

        $this->model->solicitudList = $SolicitudPagoDTO;
        //Recupera los datos del servicio web
        $this->model->obtenerSolicitud();
        //Retornar el modelo con los datos recuperados del servicio web y la Respuesta de exito o error
        echo json_encode($this->model);
    }

    //funcion para cargar la unidad donde pertenece el usuario logueado dentro del sistema
    function unidadUsuarioEmpleado()
    {
        $SolicitudPagoDTO = new SolicitudPagoDTO;
        $SolicitudPagoDTO->idUser = $_SESSION['idUsuarioADMIN'];

        $this->model->solicitudPagoDTO = $SolicitudPagoDTO;
        $this->model->obtenerUnidadUsuarioEmpleado();
        echo json_encode($this->model);
    }

    //funcion para realizar el registro del tipo de beneficiario dentro de la tabla correspondiente dependiendo del tipo que seleccione el usuario
    function registrarBeneficiario()
    {
        $SolicitudPagoDTO = new SolicitudPagoDTO;
        $SolicitudPagoDTO->idSolicitud = $_POST["datos"]["idSolicitud"];
        $SolicitudPagoDTO->idTipoBeneficiario = $_POST["datos"]["idTipoBeneficiario"];
        $SolicitudPagoDTO->idBeneficiario = $_POST["datos"]["idBeneficiario"];
        $this->model->solicitudPagoDTO = $SolicitudPagoDTO;

        if ($SolicitudPagoDTO->idTipoBeneficiario == 1) {
            $this->model->registraBeneficiarioDependencia();
        } else {
            if ($SolicitudPagoDTO->idTipoBeneficiario == 2) {
                $this->model->registraBeneficiarioEmpleado();
            } else {
                if ($SolicitudPagoDTO->idTipoBeneficiario == 3) {
                    $this->model->registraBeneficiarioAcreedor();
                } else {
                    if ($SolicitudPagoDTO->idTipoBeneficiario == 4) {
                        $this->model->registraBeneficiarioProveedor();
                    }
                }
            }
        }
        echo json_encode($this->model);
    }
}

?>
