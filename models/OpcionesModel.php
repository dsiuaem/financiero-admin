<?php
require_once 'controllers/helpers/JWT.php';

class OpcionesModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    //variables utilizadas para la deteccion de datos enviados hacia la api correspondiente
    public $getoptionsDTO;
    public $insertOptionDTO;
    public $getOpcionesSelectDTO;
    public $getOpcionesTableDTO;
    public $updateOptionDTO;
    public $deleteOptionDTO;
    public $estadoOptionDTO;

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function registrarOpcion()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->insertOptionDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'opciones',
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
            $this->opcionesDTO = $dataDescrypt->opcionesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    function obtenerOpcionesSelect()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->getOpcionesSelectDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'opciones/id',
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
            $this->opcionesDTO = $dataDescrypt->opcionesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->opcionesDTO = $this->opcionesDTO;
            $this->respuesta = 500;
        }
    }

    function obtenerOpcionesTable()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->getOpcionesTableDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'opciones',
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
            $this->opcionesDTO = $dataDescrypt->opcionesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->opcionesDTO = $this->opcionesDTO;
            $this->respuesta = 500;
        }
    }

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function actualizarOpcion()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->updateOptionDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'opciones',
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
            $this->opcionesDTO = $dataDescrypt->opcionesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function eliminarOpcion()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->deleteOptionDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'opciones',
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
            $this->opcionesDTO = $dataDescrypt->opcionesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    public function estadoOpcion()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->estadoOptionDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'opciones/estado',
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
            $this->opcionesDTO = $dataDescrypt->opcionesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }


    public function actualizarOrden()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->updateOptionDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN').'actualizarOrdenOpciones',
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
            $this->updateOptionDTO = $dataDescrypt->opcionesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }


}

?>
