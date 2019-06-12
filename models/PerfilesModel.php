<?php
require_once 'controllers/helpers/JWT.php';

class PerfilesModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    //variables utilizadas para la deteccion de datos enviados hacia la api correspondiente
    public $getPerfilesSelectDTO;

    function obtenerPerfilesSelect()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->getPerfilesSelectDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'perfiles',
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
            $this->perfilesDTO = $dataDescrypt->perfilesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->perfilesDTO = $this->perfilesDTO;
            $this->respuesta = 500;
        }
    }

    function obtenerUsuariosPerfilesTable()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->getUsuariosTableDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'users-perfiles/table',
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
            $this->perfilesDTO = $dataDescrypt->perfilesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->perfilesDTO = $this->perfilesDTO;
            $this->respuesta = 500;
        }
    }

    //variables utilizadas para la deteccion de datos enviados hacia la api correspondiente
    public $getPerfilesTableDTO;

    function obtenerPerfilesTable()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->getPerfilesTableDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'perfiles/table',
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
            $this->perfilesDTO = $dataDescrypt->perfilesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->perfilesDTO = $this->perfilesDTO;
            $this->respuesta = 500;
        }
    }

    //variables utilizadas para la deteccion de datos enviados hacia la api correspondiente
    public $getContentListSystemDTO;

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function obtenerContentListSystem()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->getContentListSystemDTO);
        //var_dump($data);//die();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'perfilesListado',
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
            //#############*************#####################
            //Aqui se van a recibir todos los objetos
            $this->perfilesModulosDTO = $dataDescrypt->perfilesModulosDTO;
            $this->perfilesSubModulosDTO = $dataDescrypt->perfilesSubModulosDTO;
            $this->perfilesOpcionesDTO = $dataDescrypt->perfilesOpcionesDTO;
            $this->perfilesTipoOpcionesDTO = $dataDescrypt->perfilesTipoOpcionesDTO;

            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    public $insertPerfilDTO;

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function registrarPerfil()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->insertPerfilDTO);
        //$data = json_encode($this->insertSystemtDTO);
        //var_dump($data);die();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'perfiles',
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
            $this->perfilesDTO = $dataDescrypt->perfilesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    public function getOpciones(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->perfilesDTO);

        //$data = json_encode($this->insertSystemtDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'getOpciones',
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
            $this->perfilesDTO = $dataDescrypt->perfilesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }   
    }

    public function editarOpciones(){
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->perfilesDTO);
        //var_dump($data);die();
        //$data = json_encode($this->insertSystemtDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'editarOpciones',
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
            //$this->perfilesDTO = $dataDescrypt->perfilesDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }    
    }
}

?>