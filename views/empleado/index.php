<?php require 'views/header.php'?>
<!DOCTYPE html>
<html lang="es-mx">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script type = "text/javascript" src = "<?php echo constant('URL');?>public/js/empleado.js" ></script>
    <title></title>
</head>
<body oncontextmenu="return false">
    <div id="submenu">
        <ul>
            <li><a onclick="menuPrincipal(1)" class="pointer">Capturar</a></li>
            <li><a id="consultarDatos" onclick="menuPrincipal(2)" class="pointer">Consultar</a></li>
        </ul>
    </div>
    <div id="capturaEmpleado">
        <?php include_once 'views/empleado/captura.php'?>
    </div>
    <div id="consultaEmpleado" >
        <?php include_once 'views/empleado/consulta.php'?>
    </div>
    <div id="modificaEmpleado" >
        <?php include_once 'views/empleado/modifica.php'?>
    </div>
</body>

</html>
<?php require 'views/footer.php'; ?>