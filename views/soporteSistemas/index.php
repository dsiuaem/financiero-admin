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
        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                          <div id="avisos" style="display:none;">
                              <div class="form-group contenedor" id="listadoAviso">
                                  <?php include_once 'views/soporteSistemas/avisos/listado.php'?>
                              </div>
                              <div class="form-group contenedor" id="avisoForm">
                                  <?php include_once 'views/soporteSistemas/avisos/avisoForm.php'?>
                              </div>
                          </div>
                          <div id="preguntasFrecuentes" style="display:none;">
                              <div class="form-group contenedor" id="listadoPreguntas">
                                  <?php include_once 'views/soporteSistemas/preguntasFrecuentes/listado.php'?>
                              </div>
                              <div class="form-group contenedor" id="preguntasFrecuentesForm">
                                  <?php include_once 'views/soporteSistemas/preguntasFrecuentes/preguntasFrecuentesForm.php'?>
                              </div>
                          </div>
                          <div id="listadoSistemas" style="display:none;">
                            <div class="form-group contenedor" id="listado">
                                <?php include_once 'views/soporteSistemas/listado.php'?>
                            </div>
                          </div>
                    </div>
                </div>
            </div>
        </section>
    </div> <!--  end content-wraper -->
    <?php require 'views/footer.php' ?>
    <?php require 'views/modalCambiarOrden.php'?>
</div>
<?php include_once 'views/libreriasJS.php' ?>
</body>
</html>
