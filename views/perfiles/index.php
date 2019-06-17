<!-- ADMINLTE -->
<!DOCTYPE html>
<html lang="es-mx">
<?php require 'views/header.php' ?>
<script type="text/javascript" src="<?php echo constant('URL'); ?>public/js/perfiles.js"></script>
<!--
<script type="text/javascript" src="<?php echo constant('URL'); ?>public/js/registrarperfil.js"></script>
<script type="text/javascript" src="<?php echo constant('URL'); ?>public/js/listarPerfiles.js"></script>
-->
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
                            <div id="nuevoPerfil" style="display:none">
                                <?php include_once 'views/perfiles/nuevoPerfil.php' ?>
                            </div>
                            <div id="listarPerfiles" style="display:none">
                                <?php include_once 'views/perfiles/listarPerfiles.php' ?>
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
<?php //include_once 'modals.php'?>
</body>
</html>



