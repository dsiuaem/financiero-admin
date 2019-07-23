<?php
require_once 'controllers/helpers/JWT.php';

class TipoOpcionesModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    //variables utilizadas para la deteccion de datos enviados hacia la api correspondiente
    public $insertTypeOptionDTO;
    public $getTipoOpcionesTableDTO;
    public $updateTypeOptionDTO;
    public $deleteTypeOptionDTO;
    public $estadoTypeOptionDTO;

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function registrarTipoOpcion()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->insertTypeOptionDTO);
        //var_dump($data);die();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'tipo_opciones',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($responseCode == 200) {
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt = $jwt->Desencriptar($result);
            $this->tipoOpcionesModelDTO = $dataDescrypt->tipoOpcionesModelDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    function obtenerTipoOpcionesTable()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->getTipoOpcionesTableDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'tipo_opciones',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($responseCode == 200) {
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt = $jwt->Desencriptar($result);
            $this->tipoOpcionesModelDTO = $dataDescrypt->tipoOpcionesModelDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->tipoOpcionesModelDTO = $this->tipoOpcionesModelDTO;
            $this->respuesta = 500;
        }
    }

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function actualizarTipoOpcion()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->updateTypeOptionDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'tipo_opciones',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'PUT',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($responseCode == 200) {
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt = $jwt->Desencriptar($result);
            $this->tipoOpcionesModelDTO = $dataDescrypt->tipoOpcionesModelDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function eliminarTipoOpcion()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->deleteTypeOptionDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'tipo_opciones',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'DELETE',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($responseCode == 200) {
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt = $jwt->Desencriptar($result);
            $this->tipoOpcionesModelDTO = $dataDescrypt->tipoOpcionesModelDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    public function estadoTipoOpcion()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->estadoTypeOptionDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'tipo_opciones/estado',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'PUT',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($responseCode == 200) {
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt = $jwt->Desencriptar($result);
            $this->tipoOpcionesModelDTO = $dataDescrypt->tipoOpcionesModelDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    function tipoOpcionesListSelect(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->estadoTypeOptionDTO);

        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'tipoOpcionesListSelect',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($responseCode == 200) {
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt = $jwt->Desencriptar($result);
            $this->tipoOpcionesModelDTO = $dataDescrypt->tipoOpcionesModelDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

}

?>