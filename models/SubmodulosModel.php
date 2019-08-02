<?php
require_once 'controllers/helpers/JWT.php';

class SubmodulosModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    //variables utilizadas para la deteccion de datos enviados hacia la api correspondiente
    public $insertSubmoduleDTO;
    public $getSubmodulosSelectDTO;
    public $getSubmodulosTableDTO;
    public $updateSubmoduleDTO;
    public $deleteSubmoduleDTO;
    public $estadoSubmoduleDTO;

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function registrarSubmodule()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->insertSubmoduleDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'submodulos',
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
            $this->submodulosDTO = $dataDescrypt->submodulosDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    function obtenerSubModulosSelect()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->getSubmodulosSelectDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'submodulos/id',
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
            $this->submodulosDTO = $dataDescrypt->submodulosDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->submodulosDTO = $this->submodulosDTO;
            $this->respuesta = 500;
        }
    }

    function obtenerSubModulosTable()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->getSubmodulosTableDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'submodulos',
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
            $this->submodulosDTO = $dataDescrypt->submodulosDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->submodulosDTO = $this->submodulosDTO;
            $this->respuesta = 500;
        }
    }

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function actualizarSubmodule()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->updateSubmoduleDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'submodulos',
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
            $this->submodulosDTO = $dataDescrypt->submodulosDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function eliminarSubmodule()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->deleteSubmoduleDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'submodulos',
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
            $this->submodulosDTO = $dataDescrypt->submodulosDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    public function estadoSubmodule()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->estadoSubmoduleDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'submodulos/estado',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'PUT',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response codes
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($responseCode == 200) {
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt = $jwt->Desencriptar($result);
            $this->submodulosDTO = $dataDescrypt->submodulosDTO;
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
        $data = $jwt->TokenJWT($this->updateSubmoduleDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN').'actualizarOrdenSubmodulos',
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
            $this->updateSubmoduleDTO = $dataDescrypt->submodulosDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }


}

?>
