<!-- ADMINLTE -->
<!DOCTYPE html>
<html lang="es-mx">
<?php require 'views/header.php' ?>
<script type="text/javascript" src="<?php echo constant('URL'); ?>public/js/soporteSistemas.js"></script>
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
                          <div id="avisos">
                              <div class="form-group contenedorAviso" id="listado">
                                  <?php include_once 'views/soporteSistemas/avisos/listado.php'?>
                              </div>
                              <div class="form-group contenedorAviso" id="avisoForm">
                                  <?php include_once 'views/soporteSistemas/avisos/avisoForm.php'?>
                              </div>
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
