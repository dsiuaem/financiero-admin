<?php
require_once 'controllers/helpers/JWT.php';

class SoporteSistemasModel extends Model{

    public function __construct(){
        parent::__construct();
    }

    public $soporteSistemasDTO;
    public $respuesta;
    public $mensajeRespuesta;
    public $avisoList;
    public $preguntasFrecuentesList;
    public $solicitudList;

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function registrarAviso()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->soporteSistemasDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN').'registrarAviso',
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
            $this->soporteSistemasDTO = $dataDescrypt->soporteSistemasDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    //funcion donde se realiza la peticion a la api para el registro del sistema
    public function actualizarAviso()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->soporteSistemasDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN').'actualizarAviso',
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
            $this->soporteSistemasDTO = $dataDescrypt->soporteSistemasDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    public function eliminarAviso()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->soporteSistemasDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN').'eliminarAviso',
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
            $this->soporteSistemasDTO = $dataDescrypt->soporteSistemasDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    public function activarAviso()
    {
        $ch = curl_init();
        //Encritar datos que llegan del formulario
        $jwt = new JWT();
        $data = $jwt->TokenJWT($this->soporteSistemasDTO);
        //var_dump($data);
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN').'activarAviso',
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
            $this->soporteSistemasDTO = $dataDescrypt->soporteSistemasDTO;
            $this->respuesta = $dataDescrypt->respuesta;
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        } else {
            $this->respuesta = 500;
        }
    }

    public function obtenerAvisos(){
      $ch = curl_init();
      //Encriptar datos que llegan del formulario
      $jwt = new JWT();
      $data = $jwt->TokenJWT($this->avisoList);
      // var_dump($data);
      // define options
      $optArray = array(
          CURLOPT_URL => constant('URL_API_ADMIN').'consultarAvisos',
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
          $this->respuesta=$dataDescrypt->respuesta;
          $this->avisoList=$dataDescrypt->avisoList;
          //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
      }else{
          $this->avisoList=$this->avisoList;
          $this->respuesta=500;
      }
  }

  //funcion donde se realiza la peticion a la api para el registro del sistema
  public function consultaSistemasSelect(){
      $ch = curl_init();
      $optArray = array(
          CURLOPT_URL => constant('URL_API_ADMIN').'sistemas',
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
          $this->soporteSistemasDTO = $dataDescrypt->sistemasDTO;
          $this->respuesta = $dataDescrypt->respuesta;
          //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
      } else {
          $this->soporteSistemasDTO = $this->sistemasDTO;
          $this->respuesta = 400;
      }
  }

  // -------------------------------- PREGUNTAS FRECUENTES ---------------------
  public function obtenerPreguntasFrecuentes(){
    $ch = curl_init();
    //Encriptar datos que llegan del formulario
    $jwt = new JWT();
    $data = $jwt->TokenJWT($this->preguntasFrecuentesList);
    //var_dump($data);
    // define options
    $optArray = array(
        CURLOPT_URL => constant('URL_API_ADMIN').'consultarPreguntasFrecuentes',
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
        $this->respuesta=$dataDescrypt->respuesta;
        $this->preguntasFrecuentesList=$dataDescrypt->preguntasFrecuentesList;
        //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
    }else{
        $this->preguntasFrecuentesList=$this->preguntasFrecuentesList;
        $this->respuesta=500;
    }
  }

  //funcion donde se realiza la peticion a la api para el registro del sistema
  public function registrarPreguntaFrecuente()
  {
      $ch = curl_init();
      //Encritar datos que llegan del formulario
      $jwt = new JWT();
      $data = $jwt->TokenJWT($this->soporteSistemasDTO);
      //var_dump($data);
      // define options
      $optArray = array(
          CURLOPT_URL => constant('URL_API_ADMIN').'registrarPreguntaFrecuente',
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
          $this->soporteSistemasDTO = $dataDescrypt->soporteSistemasDTO;
          $this->respuesta = $dataDescrypt->respuesta;
          //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
      } else {
          $this->respuesta = 500;
      }
  }

  //funcion donde se realiza la peticion a la api para el registro del sistema
  public function actualizarPreguntaFrecuente()
  {
      $ch = curl_init();
      //Encritar datos que llegan del formulario
      $jwt = new JWT();
      $data = $jwt->TokenJWT($this->soporteSistemasDTO);
      //var_dump($data);
      // define options
      $optArray = array(
          CURLOPT_URL => constant('URL_API_ADMIN').'actualizarPreguntaFrecuente',
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
          $this->soporteSistemasDTO = $dataDescrypt->soporteSistemasDTO;
          $this->respuesta = $dataDescrypt->respuesta;
          //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
      } else {
          $this->respuesta = 500;
      }
  }

  public function eliminarPreguntaFrecuente()
  {
      $ch = curl_init();
      //Encritar datos que llegan del formulario
      $jwt = new JWT();
      $data = $jwt->TokenJWT($this->soporteSistemasDTO);
      //var_dump($data);
      // define options
      $optArray = array(
          CURLOPT_URL => constant('URL_API_ADMIN').'eliminarPreguntaFrecuente',
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
          $this->soporteSistemasDTO = $dataDescrypt->soporteSistemasDTO;
          $this->respuesta = $dataDescrypt->respuesta;
          //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
      } else {
          $this->respuesta = 500;
      }
  }

  public function getAllTodosEmpleadosSelect(){
      $ch = curl_init();
      $jwt = new JWT();
      $data=$jwt->TokenJWT($this->soporteSistemasDTO);
      //var_dump($data);
      // define options
      $optArray = array(
          CURLOPT_URL => constant('API_URL_SIA').'resource/todosEmpleadosNivelesSelect',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_CUSTOMREQUEST=>'GET',
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
          $dataDescrypt=$jwt->Desencriptar($result);
          $this->soporteSistemasDTO=$dataDescrypt->solicitudList;
          $this->respuesta=$dataDescrypt->respuesta;
          //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
      }else{
          $this->soporteSistemasDTO=$this->soporteSistemasDTO;
          $this->respuesta=400;
      }
  }

  public function getEmpleadoNiveles(){
      $ch = curl_init();
      $jwt = new JWT();
      $data = $jwt->TokenJWT($this->soporteSistemasDTO);
      // define options
      $optArray = array(
          CURLOPT_URL => constant('API_URL_SIA').'resource/empleadoNiveles',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_CUSTOMREQUEST=>'GET',
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
          $dataDescrypt=$jwt->Desencriptar($result);
          $this->soporteSistemasDTO=$dataDescrypt->solicitudList;
          $this->respuesta=$dataDescrypt->respuesta;
          //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
      }else{
          $this->soporteSistemasDTO=$this->soporteSistemasDTO;
          $this->respuesta=400;
      }
  }

  public function actualizarOrdenPreguntaFrecuente()
  {
      $ch = curl_init();
      //Encritar datos que llegan del formulario
      $jwt = new JWT();
      $data = $jwt->TokenJWT($this->soporteSistemasDTO);
      //var_dump($data);
      // define options
      $optArray = array(
          CURLOPT_URL => constant('URL_API_ADMIN').'actualizarOrdenPreguntaFrecuente',
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
          $this->soporteSistemasDTO = $dataDescrypt->soporteSistemasDTO;
          $this->respuesta = $dataDescrypt->respuesta;
          //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
      } else {
          $this->respuesta = 500;
      }
  }

  public function activarPregunta()
  {
      $ch = curl_init();
      //Encritar datos que llegan del formulario
      $jwt = new JWT();
      $data = $jwt->TokenJWT($this->soporteSistemasDTO);
      //var_dump($data);
      // define options
      $optArray = array(
          CURLOPT_URL => constant('URL_API_ADMIN').'activarPregunta',
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
          $this->soporteSistemasDTO = $dataDescrypt->soporteSistemasDTO;
          $this->respuesta = $dataDescrypt->respuesta;
          //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
      } else {
          $this->respuesta = 500;
      }
  }

}
