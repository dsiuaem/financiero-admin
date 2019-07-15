<!-- ADMINLTE -->
<!DOCTYPE html>
<html lang="es-mx">
<?php require 'views/header.php' ?>
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
                    <div style="float: none; margin: 0 auto;">
                        <br>
                        <p class="text-justify">
                        <h1>Panel de Control</h1></p>
                    </div>
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </section>

        <!--
        <div class="card card-primary card-outline">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fa fa-bar-chart-o"></i>
                    Donut Chart
                </h3>

                <div class="card-tools">
                    <button type="button" class="btn btn-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                    </button>
                    <button type="button" class="btn btn-tool" data-widget="remove"><i class="fa fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div id="donut-chart" style="height: 300px;"></div>
            </div>
        </div>
        -->

        <!-- /.Main content -->
    </div> <!--  end content-wraper -->
    <?php require 'views/footer.php' ?>
</div>
<?php include_once 'views/libreriasJS.php' ?>
</body>
</html>
