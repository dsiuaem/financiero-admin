<?php
require_once 'controllers/helpers/JWT.php';

class SolicitudPagoModel extends Model{

    public function __construct(){
        parent::__construct();
    }

    //variables utilizadas para la deteccion de datos enviados hacia la api correspondiente
    public $solicitudPagoDTO;

    public $solicitudPagoArchivoDTO;

    public $solicitudPagoSeguimientoDTO;

    public $solicitudList;

    public $solicitudArchivoList;

    public $respuesta;

    public $idTipoRecurso;

    //funcion donde se elimina logicamente el archivo de la solicitud de pago en la que se cambio el activo del archivo para indicar que ya no esta disponible
    function updateFileActivo(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudPagoArchivoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'solicitudPagoFile',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'PUT',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudPagoArchivoDTO=$dataDescrypt->solicitudPagoArchivoDTO;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudPagoArchivoDTO=$this->solicitudPagoArchivoDTO;
            $this->respuesta=500;
        }
    }

    //funcion en la cual se envia la peticion a la api para la consulta de la unidad a la que pertenece el usuario logueado
    public function obtenerUnidadUsuarioEmpleado(){
        $ch = curl_init();

        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudPagoDTO);

        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'resource/unidadUsuarioEmpleado',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array('Content-type: text/plain'),
        );

        curl_setopt_array($ch, $optArray);

        $result = curl_exec($ch);
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudPagoDTO=$dataDescrypt->solicitudPagoDTO;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudPagoDTO=$this->solicitudPagoDTO;
            $this->respuesta=500;
        }
    }

    //funcion donde se realiza la peticion a la api para el registro de la solicitud
    public function registrarService(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudPagoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'solicitudPago',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'POST',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudPagoDTO=$dataDescrypt->solicitudPagoDTO;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->respuesta=500;
        }
    }

    //funcion donde se realiza la peticion a la api para mostrar el listado de los tipos de gasto dentro del formulario
    public function consultaGasto(){
        $ch = curl_init();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'resource/tipoGasto',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain')
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $consulta = new JWT();

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$consulta->Desencriptar($result);
            $this->solicitudList=$dataDescrypt->solicitudList;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudList=$this->solicitudList;
            $this->respuesta=400;
        }
    }

    //funcion para el envio de datos a la api para la consulta de los tipos de beneficiario de la base de datos
    public function consultaTipoBeneficiario(){
        $ch = curl_init();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'resource/tipoBeneficiario',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain')
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $consulta = new JWT();

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$consulta->Desencriptar($result);
            $this->solicitudList=$dataDescrypt->solicitudList;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudList=$this->solicitudList;
            $this->respuesta=400;
        }
    }

    //funcion para la consulta de los subfondos que dependen del tipo de recurso que escoje el usuario
    public function consultaSubfondo(){
        $ch = curl_init();
        $consulta = new JWT();
        $data = $consulta->TokenJWT($this->idTipoRecurso);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'resource/subfondo',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'POST',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain')
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$consulta->Desencriptar($result);
            $this->idTipoRecurso=$dataDescrypt->solicitudList;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->idTipoRecurso=$this->idTipoRecurso;
            $this->respuesta=400;
        }
    }

    //funcion para la consulta de recurso que desea utilizar el usuario
    public function consultaRecurso(){
        $ch = curl_init();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'resource/tipoRecurso',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain')
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $consulta = new JWT();

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$consulta->Desencriptar($result);
            $this->solicitudList=$dataDescrypt->solicitudList;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudList=$this->solicitudList;
            $this->respuesta=400;
        }
    }

    //funcion para seleccionar el tipo de archivo que el usuario desea subir al sistema
    public function consultaTipoFile(){
        $ch = curl_init();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'resource/tipoFile',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain')
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $consulta = new JWT();

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$consulta->Desencriptar($result);
            $this->solicitudList=$dataDescrypt->solicitudList;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudList=$this->solicitudList;
            $this->respuesta=400;
        }
    }

    //funcion para el registro de los archivos dentro del sistema, esto para que el sistema sepa ue tipo de archivos y que archivo le pertenece a cada una de las solicitudes
    public function registrarArchivoService(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();

        $data = $jwt->TokenJWT($this->solicitudPagoArchivoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'solicitudPagoFile',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'POST',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudPagoArchivoDTO=$dataDescrypt->solicitudPagoArchivoDTO;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudPagoArchivoDTO=$this->solicitudPagoArchivoDTO;
            $this->respuesta=500;
        }
    }

    //funcion para el registro de lseguimiento de las solicitudes donde se muestran todos los datos de la persona que realizo la ultima modificacion
    public function registrarSeguimientoService(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();

        $data = $jwt->TokenJWT($this->solicitudPagoSeguimientoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'solicitudPagoSeguimiento',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'POST',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudPagoSeguimientoDTO=$dataDescrypt->solicitudPagoSeguimientoDTO;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudPagoSeguimientoDTO=$this->solicitudPagoSeguimientoDTO;
            $this->respuesta=500;
        }
    }

    //funcion para la modificacion de las solicitudes segun los datos que el usuario inserte en los campos
    public function updateRegistroService(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudPagoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'solicitudPago',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'PUT',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudPagoDTO=$dataDescrypt->solicitudPagoDTO;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudPagoDTO=$this->solicitudPagoDTO;
            $this->respuesta=500;
        }
    }

    //funcion para la modificacion del seguimiento de las solicitudes de pago en la que se realiza el cambio de status a  para indicar que ya no esta disponible ese seguimiento
    public function updateSeguimientoService(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudPagoSeguimientoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'solicitudPagoSeguimiento',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'PUT',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudPagoSeguimientoDTO=$dataDescrypt->solicitudPagoSeguimientoDTO;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudPagoSeguimientoDTO=$this->solicitudPagoSeguimientoDTO;
            $this->respuesta=500;
        }
    }

    //funcion en la cual se consultan los archivos que estan adjuntos a una solicitud de pago, esto para realizar el listado que se le mostrara al usuario cuando realize alguna consulta de solicitud
    public function consultarArchivoService(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudArchivoList);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'solicitudPagoFile',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudArchivoList=$dataDescrypt->solicitudListFiles;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudArchivoList=$this->solicitudArchivoList;
            $this->respuesta=500;
        }
    }

    //funcion donde se realiza la consulta a la base de datos, esto para el listado que se le mostrara al usuario cuand o realice la consulta de las solicitudes
    public function obtenerSolicitudes(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudList);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'solicitudPago',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudList=$dataDescrypt->tableJsonResponse;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudList=$this->solicitudList;
            $this->respuesta=500;
        }
    }

    //funcion que se encarga de consultar a la base de datos una solicitud en especifico, esto para mostrarle al usuario los datos que se an insertado previamente
    public function obtenerSolicitud(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudList);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'solicitudPago/id',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudList=$dataDescrypt->solicitudList;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudList=$this->solicitudList;
            $this->respuesta=500;
        }
    }

    //funcion en la cual se realiza la consulta a la base de datos para obtener las difeentes dependencias disponibles para el registro de la solicitud
    public function consultaDependencias(){
        $ch = curl_init();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'resource/dependencias',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain')
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $consulta = new JWT();

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$consulta->Desencriptar($result);
            $this->solicitudList=$dataDescrypt->solicitudList;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudList=$this->solicitudList;
            $this->respuesta=400;
        }
    }

    //funcion en la cual se realiza el listado de los empleados totales del sistema, esto para mostrarlos dentro del catalogo correspondiente
    public function consultaEmpleados(){
        $ch = curl_init();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'resource/empleados',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain')
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $consulta = new JWT();

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$consulta->Desencriptar($result);
            $this->solicitudList=$dataDescrypt->solicitudList;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudList=$this->solicitudList;
            $this->respuesta=400;
        }
    }

    //funcion para la consulta de los acreedores que estan disponibles para las solicitudes de pago
    public function consultaAcreedores(){
        $ch = curl_init();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'resource/acreedores',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain')
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $consulta = new JWT();

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$consulta->Desencriptar($result);
            $this->solicitudList=$dataDescrypt->solicitudList;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudList=$this->solicitudList;
            $this->respuesta=400;
        }
    }

    //funcion para la consulta de los proveedores del catalogo correspondiente
    public function consultaProveedores(){
        $ch = curl_init();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'resource/proveedores',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain')
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $consulta = new JWT();

        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$consulta->Desencriptar($result);
            $this->solicitudList=$dataDescrypt->solicitudList;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudList=$this->solicitudList;
            $this->respuesta=400;
        }
    }

    //funcion que se ejecuta exclusivamente cuando el usuario desea realizar el registro de un beneficiario dentro de alguna solicitud de pago
    public function registraBeneficiarioEmpleado(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudPagoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'beneficiarioEmpleado',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'POST',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudPagoDTO=$dataDescrypt->solicitudPagoDTO;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudPagoDTO=$this->solicitudPagoDTO;
            $this->respuesta=500;
        }
    }

    //funcion que se ejecuta exclusivamente cuando el usuario desea realizar el registro de un acreedor dentro de alguna solicitud de pago
    public function registraBeneficiarioAcreedor(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudPagoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'beneficiarioAcreedor',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'POST',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudPagoDTO=$dataDescrypt->solicitudPagoDTO;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudPagoDTO=$this->solicitudPagoDTO;
            $this->respuesta=500;
        }
    }

    //funcion que se ejecuta exclusivamente cuando el usuario desea realizar el registro de un proveedor dentro de alguna solicitud de pago
    public function registraBeneficiarioProveedor(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudPagoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'beneficiarioProveedor',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'POST',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudPagoDTO=$dataDescrypt->solicitudPagoDTO;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudPagoDTO=$this->solicitudPagoDTO;
            $this->respuesta=500;
        }
    }

    //funcion que se ejecuta exclusivamente cuando el usuario desea realizar el registro de un dependencia dentro de alguna solicitud de pago
    public function registraBeneficiarioDependencia(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->solicitudPagoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA').'beneficiarioDependencia',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'POST',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if($responseCode==200){
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt=$jwt->Desencriptar($result);
            $this->solicitudPagoDTO=$dataDescrypt->solicitudPagoDTO;
            $this->respuesta=$dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->solicitudPagoDTO=$this->solicitudPagoDTO;
            $this->respuesta=500;
        }
    }
}
?>