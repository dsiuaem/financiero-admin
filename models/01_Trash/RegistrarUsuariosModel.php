<?php
require_once 'controllers/helpers/JWT.php';

class RegistrarUsuariosModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    //variables utilizadas para la deteccion de datos enviados hacia la api correspondiente
    public $insertUserDTO;

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function consultaTipoUsuarios()
    {
        $ch = curl_init();

        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'usuarios/tipoUsuarios',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array('Content-type: text/plain'),
        );
        // apply those options
        curl_setopt_array($ch, $optArray);
        // execute request and get response
        $result = curl_exec($ch);
        //Response code
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $consulta = new JWT();

        if ($responseCode == 200) {
            //El resultado se deserializa en la clase DTO devuelta
            $dataDescrypt = $consulta->Desencriptar($result);
            $this->usuariosDTO = $dataDescrypt->usuariosDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->usuariosDTO = $this->usuariosDTO;
            $this->respuesta = 400;
        }
    }

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function registrarUsuario()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->insertUserDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN') . 'usuarios',
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
            $this->usuariosDTO = $dataDescrypt->usuariosDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }


}

?>