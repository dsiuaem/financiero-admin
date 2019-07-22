<?php
require_once 'controllers/helpers/JWT.php';

class EmpleadoModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public $empleadoDTO;

    public $empleadoList;

    public $mensajeRespuesta;

    public $respuesta;


    public function registrarService()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->empleadoDTO);
        // define options
        $optArray = array(

            CURLOPT_URL => constant('URL_API_SIA') . 'empleado',
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
            $this->empleadoDTO = $dataDescrypt->empleadoDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->empleadoDTO = $this->empleadoDTO;
            $this->respuesta = 400;
        }
    }

    public function consultaService()
    {
        $ch = curl_init();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA') . 'empleado',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array('Content-type: text/plain')
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
            $this->empleadoList = $dataDescrypt->empleadoList;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->empleadoList = $this->empleadoList;
            $this->respuesta = 400;
        }
    }

    public function eliminaService()
    {
        $ch = curl_init();
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->empleadoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA') . 'empleado/id',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'DELETE',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array('Content-type: text/plain')
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
            $this->empleadoDTO = $dataDescrypt->empleadoDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->empleadoDTO = $this->empleadoDTO;
            $this->respuesta = 400;
        }
    }


    public function modificaService()
    {
        $ch = curl_init();
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->empleadoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA') . 'empleado/id',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array('Content-type: text/plain')
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
            $this->empleadoDTO = $dataDescrypt->empleadoDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->empleadoDTO = $this->empleadoDTO;
            $this->respuesta = 400;
        }
    }

    public function actualizaService()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->empleadoDTO);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_SIA') . 'empleado/id',
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
            $this->empleadoDTO = $dataDescrypt->empleadoDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->empleadoDTO = $this->empleadoDTO;
            $this->respuesta = 400;
        }
    }


}

?>