<!-- ADMINLTE -->
<!DOCTYPE html>
<html lang="es-mx">
<?php require 'views/header.php' ?>
<script type="text/javascript" src="<?php echo constant('URL'); ?>public/js/solicitudPago.js"></script>
<body class="hold-transition sidebar-mini">
<div class="wrapper">
    <!-- Menu Header -->
    <?php require 'views/menu/menuHeader.php' ?>
    <!-- Main Sidebar Container -->
    <?php require 'views/menu/menu.php' ?>
    <div class="content-wrapper">
        <div class="content-header">
        </div>
        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div id="capturaPago">
                                <?php include_once 'views/solicitudPago/captura.php' ?>
                            </div>
                            <div id="modificaPago" style="display:none">
                                <?php include_once 'views/solicitudPago/procesoCaptura.php' ?>
                            </div>
                            <div id="lecturaPago" style="display:none">
                                <?php include_once 'views/solicitudPago/capturado.php' ?>
                            </div>
                            <div id="listaConsulta" style="display:none">
                                <?php include_once 'views/solicitudPago/listadoSolicitudes.php' ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div> <!--  end content-wraper -->
    <?php require 'views/footer.php' ?>
</div>
<?php include_once 'views/libreriasJS.php' ?>
</body>
</html>