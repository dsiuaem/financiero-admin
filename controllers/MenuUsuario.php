<?php
include_once 'models/helpers/PermisoMenu.php';
include_once 'models/helpers/MenuUsuarioSistema.php';
require_once 'controllers/helpers/JWT.php';

class MenuUsuario extends Model{
    public function __construct(){
        parent::__construct();
    }
    public $menuList;
    public $respuesta;
    
    function permisosMenuSistema($idUser){    
            $this->consultaService($idUser);
            return $this->menuList;
    }

    public function consultaService($idUser){
        $jwt = new JWT();        
        $usuarioSistema=new UsuarioSistema();
        $usuarioSistema->idUser=$idUser;
        $usuarioSistema->idSystem=constant('idSystem');
        $data = $jwt->TokenJWT(($usuarioSistema));
        $ch = curl_init();
        // define options
        $optArray = array(
            CURLOPT_URL => constant('URL_API_ADMIN').'menu',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST=>'GET',
            CURLOPT_POSTFIELDS=>$data,
            CURLOPT_HTTPHEADER=>array('Content-type: text/plain;charset=utf-8')
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
            $this->menuList=$dataDescrypt->menuDTO;
            $this->respuesta=$dataDescrypt->respuesta;        
            //Retornar los datos correctos más la respuesta de OK, o en caso de que el servicio mande error, aqui se retorna
        }else{
            $this->menuList=$this->menuList;
            $this->respuesta=400;
        }
    }
}
?>