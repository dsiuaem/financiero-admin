<?php

class SessionUsuario{
	//funcion donde se determina si existe una sesion activa del usuario
    function sessionActiva(){
        if(isset($_SESSION['usuarioSIA'])){
            return true;
        }else{
            return false;
        }
    }
    
}

?>