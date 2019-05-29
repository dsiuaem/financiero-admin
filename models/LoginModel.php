<?php
require_once 'controllers/helpers/JWT.php';

class LoginModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public $usuarioDTO;
    public $respuesta;
    public $idSystem;

    public function consultaService()
    {
        $this->idSystem = constant("idSystem");
        $ch = curl_init();
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this);
        // define options
        $optArray = array(

            CURLOPT_URL => constant('URL_API_ADMIN') . 'usuario',
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
            $this->usuarioDTO = $dataDescrypt->usuarioDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->usuarioDTO = $this->usuarioDTO;
            $this->respuesta = 400;
        }
    }
}

?>