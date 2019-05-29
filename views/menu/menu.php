<?php //var_dump (json_decode($this->permisosMenu))?>
<?php $Systems = json_decode($this->permisosMenu, 1); ?>
<script type="text/javascript" src="<?php echo constant('URL'); ?>public/js/menu.js"></script>
<aside class="main-sidebar sidebar-dark-primary elevation-4" style="overflow-x: hidden;">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
        <img src="<?php echo constant('URL'); ?>public/template/adminlte3.2/dist/img/combine.png" alt="Logo"
             class="brand-image img-circle elevation-3"
             style="opacity: .8">
        <span class="brand-text font-weight-light">Admin</span>
    </a>

    <!-- Sidebar -->
    <!-- <div class="parent"> -->
    <div class="sidebar" style="width: calc(100% + 20px);">

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <?php if (isset($Systems)) { ?>
                    <!--SISTEMAS -->
                    <?php foreach ($Systems as $system) : ?>
                        <?php if (!is_null($system['Modules'])) { ?>
                            <!--MODULOS -->
                            <?php foreach ($system['Modules'] as $modulo) : ?>
                                <?php if (!is_null($modulo['subModule'])) { ?>
                                    <!-- moduleMenu- Variable para mantener el primer nivel open cuando se ha cargado un controlador -->
                                    <li class="  <?php if ($this->moduleMenu == $modulo['moduleMenu']) {
                                        echo "nav-item has-treeview menu-open";
                                    } else {
                                        echo "nav-item has-treeview";
                                    } ?>  "> <!-- lis del primer nivel -->

                                        <a href="#" class="nav-link">
                                            <i class="nav-icon fa fa-book"></i>
                                            <p>  <?php echo($modulo['nombre']) ?>
                                                <i class="right fa fa-angle-left"></i>
                                            </p>
                                        </a>

                                        <!--SUBMODULOS -->
                                        <ul class="nav nav-treeview">
                                            <?php foreach ($modulo['subModule'] as $subModulo) : ?>
                                                <?php if (!is_null($subModulo['option'])) { ?>
                                                    <!-- ACTIVAR Y DESACTIVAR LA OPCION DEL CONTROLADOR PARA NO CERRAR EL MENU -->
                                                    <li class="<?php if ($this->tipoController == $subModulo['controller']) {
                                                        echo "nav-item menu-open";
                                                    } else {
                                                        echo "nav-item";
                                                    } ?>  ">
                                                        <!-- Carga del controlador al dar clic por primera vez -->
                                                        <a href="#"
                                                           onclick="location.href = '<?php if ($this->tipoController == $subModulo['controller']) {
                                                               echo '#';
                                                           } else {
                                                               echo URL . $subModulo['controller'];
                                                           } ?>'" class="nav-link level1">
                                                            <i class="fa fa-caret-right nav-icon hijo"></i>
                                                            <p> <?php echo $subModulo['nombre'] ?>
                                                                <i class="right fa fa-angle-left"></i>
                                                            </p>
                                                        </a>
                                                        <!--MODULE OPTION -->
                                                        <ul class="nav nav-treeview">
                                                            <?php foreach ($subModulo['option'] as $Option) : ?>
                                                                <?php if (!is_null($Option['tipoOption'])) { ?>

                                                                    <!-- lis tercer nivel -->
                                                                    <!-- Habilita el redireccionamiento a la vista solo cuando no tiene tipo options, en caso de tener tipo options entonces es otro nivel -->
                                                                    <?php if (count($Option['tipoOption']) == 0) { ?>
                                                                        <li class="nav-item"
                                                                            onclick="redireccionarVista(<?php echo $Option['action'] ?>)">
                                                                            <a href="#" class="nav-link level2">
                                                                                <p><?php echo $Option['nombre'] ?>
                                                                                </p>
                                                                            </a>
                                                                        </li>
                                                                    <?php } else { ?>
                                                                        <li class="nav-item">
                                                                            <a href="#" class="nav-link level2">
                                                                                <i class="fa fa-angle-right nav-icon hijo"></i>
                                                                                <p class="textoLargo"><?php echo $Option['nombre'] ?>
                                                                                    <i class="right fa fa-angle-left"></i>
                                                                                </p>
                                                                            </a>
                                                                            <!--TIPO OPTION -->
                                                                            <ul class="nav nav-treeview">
                                                                                <?php foreach ($Option['tipoOption'] as $tipoOption) : ?>
                                                                                    <li <?php if (intval($tipoOption['tipo'] == 1)) {
                                                                                        echo "onclick=redireccionarEstatus(" . $tipoOption['id'] . ")";
                                                                                    }
                                                                                    ?> class="nav-item">
                                                                                        <a href="#"
                                                                                           class="nav-link level3">
                                                                                            <p><?php echo $tipoOption['nombre'] ?>
                                                                                            </p>
                                                                                        </a>
                                                                                    </li>
                                                                                <?php endforeach; ?>
                                                                            </ul>
                                                                            <!--END TIPO OPTION -->
                                                                        </li>
                                                                    <?php } ?>
                                                                <?php } ?>
                                                            <?php endforeach; ?>
                                                        </ul>
                                                        <!--END MODULE OPTION -->
                                                    </li>
                                                <?php } ?>
                                            <?php endforeach; ?>
                                        </ul>
                                        <!--END SUBMODULOS -->
                                    </li>
                                <?php } ?>
                            <?php endforeach; ?>
                            <!--END MODULOS -->
                        <?php } ?>
                    <?php endforeach; ?>
                    <!--END SISTEMAS -->
                <?php } ?>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- </div> -->
    <!-- /.sidebar -->
</aside>