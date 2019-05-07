<?php
class SolicitudPagoForm{
    function validaCapturaForm($datos,$model){
        $valid=true;
        
        if(!ctype_digit($datos['tipoRecurso']) ) {
            $model->respuesta=550;
            $model->mensajeRespuesta="El tipo de dato para el tipo de recurso debe ser entero";
            $valid=false;
        }
  
        return $valid;
    }

}
?>