<?php

class EmpleadoForm
{

    function validaForm($jsonForm, $model)
    {

        $valid = true;
        //$jsonData=json_decode($jsonForm);
        //echo $jsonForm;
        $formData = json_decode($jsonForm);
        foreach ($formData as $row) {
            //Validar el nombre
            if ($row->name == "nombre") {
                if (strlen($row->value) < 6) {
                    $model->mensajeRespuesta = "El nombre debe ser mayor a 6, validación PHP";
                    $model->respuesta = 500;
                    $valid = false;
                }
            }
        }

        return $valid;
    }

    function validaModificaForm($jsonForm, $model)
    {

        $valid = true;
        //$jsonData=json_decode($jsonForm);
        //echo $jsonForm;
        $formData = json_decode($jsonForm);
        foreach ($formData as $row) {
            //Validar el nombre
            if ($row->name == "nombre") {
                if (strlen($row->value) < 6) {
                    $model->mensajeRespuesta = "El nombre debe ser mayor a 6, validación PHP";
                    $model->respuesta = 500;
                    $valid = false;
                }
            }
        }

        return $valid;
    }

    function validaModificaPop($jsonForm, $model)
    {

        $valid = true;
        //$jsonData=json_decode($jsonForm);
        //echo $jsonForm;
        $formData = json_decode($jsonForm);
        //Validar el nombre
        if ($formData) {
            if (strlen($formData) < 6) {
                $model->mensajeRespuesta = "El nombre debe ser mayor a 6, validación PHP";
                $model->respuesta = 500;
                $valid = false;
            }
        }
        return $valid;
    }
}

?>