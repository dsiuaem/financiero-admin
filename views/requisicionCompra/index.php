<!-- ADMINLTE -->
<!DOCTYPE html>
<html lang="es-mx">
<?php require 'views/header.php'?>
<script type = "text/javascript" src = "<?php echo constant('URL');?>public/js/requisicion.js"></script>
<body class="hold-transition sidebar-mini">
<div class="wrapper" >
  <!-- Menu Header -->
  <?php require 'views/menu/menuHeader.php'?>
    <!-- Main Sidebar Container -->
    <?php require 'views/menu/menu.php'?>
    <div class="content-wrapper" >
    <div class="content-header">
    </div>
    
        <!-- Main content -->
        <section class="content">
          <div class="container-fluid">
              <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="form-group " id="captura_datos_solicitante">
                            <?php include_once 'views/requisicioncompra/captura_datos_solicitante.php'?>
                        </div>

                        <div class="form-group " id="captura_datos_articulo">
                            <?php include_once 'views/requisicioncompra/captura_datos_articulo.php'?>
                        </div>
                
                    </div>
                </div>
              </div><!-- /.row -->
          </div><!-- /.container-fluid -->
        </section>
        <!-- /.Main content -->
    </div> <!--  end content-wraper -->
    <?php require 'views/footer.php'?>
</div>
<?php include_once 'views/libreriasJS.php'?>
</body>
</html>