<?php $Systems = json_decode($this->permisosMenu, 1); ?>
<script type="text/javascript" src="<?php echo constant('URL'); ?>public/js/menu.js"></script>

<!-- HEADER MOBILE-->
<header class="header-mobile d-block d-lg-none">
    <div class="header-mobile__bar">
        <div class="container-fluid">
            <div class="header-mobile-inner">
                <a class="logo" href="index.html">
                    <!-- <img src="images/icon/logo.png" alt="CoolAdmin" /> -->
                </a>
                <button class="hamburger hamburger--slider" type="button">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                </button>
            </div>
        </div>
    </div>
    <nav class="navbar-mobile">
        <div class="container-fluid">


            <ul class="sidebar-menu navbar-mobile__list" data-widget="tree">
                <!-- ESTE UL muestra el estilo de la plantilla de colladmin -->
                <!-- <li class="active treeview menu-open">
                  <a href="#">
                    <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                    <span class="pull-right-container">
                      <i class="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul class="treeview-menu">
                    <li><a href="index.html"><i class="fa fa-circle-o"></i> Dashboard v1</a></li>
                    <li class="active"><a href="index2.html"><i class="fa fa-circle-o"></i> Dashboard v2</a></li>
                  </ul>
                </li> -->

                <?php if (isset($Systems)) { ?>
                    <!--SISTEMAS -->
                    <?php foreach ($Systems as $system) : ?>
                        <?php if (!is_null($system['Modules'])) { ?>
                            <!--MODULOS -->
                            <?php foreach ($system['Modules'] as $modulo) : ?>
                                <?php if (!is_null($modulo['subModule'])) { ?>

                                    <li class="  <?php if ($this->moduleMenu == $modulo['moduleMenu']) {
                                        echo "active treeview menu-open";
                                    } else {
                                        echo "treeview";
                                    } ?>  "> <!-- lis del primer nivel -->
                                        <a href="#">
                                            <i class="fas fa-copy"></i> <span><?php echo($modulo['nombre']) ?></span>
                                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                                </span>
                                        </a>

                                        <!-- <ul class="list-unstyled navbar__sub-list js-sub-list"> -->
                                        <!--SUBMODULOS -->
                                        <ul class="treeview-menu"> <!-- ul del segundo nivel -->
                                            <?php foreach ($modulo['subModule'] as $subModulo) : ?>
                                                <?php if (!is_null($subModulo['option'])) { ?>
                                                    <!-- ACTIVAR Y DESACTIVAR LA OPCION DEL CONTROLADOR PARA NO CERRAR EL MENU -->
                                                    <li class="   <?php if ($this->tipoController == $subModulo['controller']) {
                                                        echo "active treeview menu-open";
                                                    } else {
                                                        echo "treeview";
                                                    } ?>  "> <!-- lis del segundo nivel -->

                                                        <!-- Redireccionar al controlador solo en caso de no haber sido llamado -->
                                                        <a href="<?php if ($this->tipoController == $subModulo['controller']) {
                                                            echo "#";
                                                        } else {
                                                            echo URL . $subModulo['controller'];
                                                        } ?>">
                                                            <i class="fa fa-circle-o"></i> <?php echo $subModulo['nombre'] ?>
                                                            <span class="pull-right-container">
                                                <i class="fa fa-angle-left pull-right"></i>
                                                </span>
                                                        </a>
                                                        <!--MODULE OPTION -->
                                                        <ul class="treeview-menu"> <!-- uls del tercer nivel -->
                                                            <!-- ciclo para recorrer los OPTIONS -->
                                                            <?php foreach ($subModulo['option'] as $Option) : ?>
                                                                <?php if (!is_null($Option['tipoOption'])) { ?>

                                                                    <!-- lis tercer nivel -->
                                                                    <!-- Habilita el redireccionamiento a la vista solo cuando no tiene tipo options -->
                                                                    <?php if (count($Option['tipoOption']) == 0) { ?>
                                                                        <li class="treeview" onclick="redireccionarVista(<?php echo $Option['action'] ?>)" >
                                                                    <?php } else { ?>
                                                                        <li class="treeview">
                                                                    <?php } ?>


                                                                    <a href="#"><?php echo $Option['nombre'] ?>
                                                                        <span class="pull-right-container">
                                                                <!-- Se comprueba si los options tienen tipo options para mostrar la flecha -->
                                                                <?php if (count($Option['tipoOption']) > 0) { ?>
                                                                    <i class="fa fa-angle-left pull-right"></i>
                                                                <?php } ?>

                                                                </span>
                                                                    </a>


                                                                    <!--TIPO OPTION -->
                                                                    <ul class="treeview-menu"> <!-- cuarto nivel  -->
                                                                        <?php foreach ($Option['tipoOption'] as $tipoOption) : ?>
                                                                            <li <?php if (intval($tipoOption['tipo'] == 1)) {
                                                                                echo "onclick=redireccionarEstatus(" . $tipoOption['id'] . ")";
                                                                            }
                                                                            ?>><?php echo $tipoOption['nombre'] ?></li>
                                                                        <?php endforeach; ?>


                                                                    </ul>
                                                                    <!--END TIPO OPTION -->
                                                                    </li>
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


        </div>
    </nav>
</header>
<!-- END HEADER MOBILE-->