
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
                    <?php if(isset($Systems)){ ?>

                         <?php foreach ($Systems as $system) : ?>
                              <?php if(!is_null($system['Modules'])){ ?>
                                   <?php foreach ($system['Modules'] as $modulo) : ?>
                                        <?php if(!is_null($modulo['subModule'])){ ?>

                                             <?php foreach ($modulo['subModule'] as $subModulo) : ?>
                                                  <?php if(!is_null($subModulo['option'])){ ?>
                                                       <li class="submenu <?php if($this->tipoController==$subModulo['controller']){
                                                            echo "nav-item menu-open";}else{ echo "nav-item"; } ?>">
                                                            <a onclick="location.href = '<?php if($this->tipoController==$subModulo['controller']) { echo '#'; } else { echo constant("URL").$subModulo['controller']; } ?>'"
                                                                 <?php if($this->tipoController==$subModulo['controller']){ echo "class='nav-link level1 activo'";}else{ echo "class='nav-link level1'"; } ?> >
                                                                 <i class="nav-icon <?php echo $subModulo['icon']; ?> "></i>
                                                                 <p> <?php echo $subModulo['nombre']?>
                                                                 <i class="right fa fa-angle-left"></i>
                                                                 </p>
                                                            </a>
                                                            <ul class="nav nav-treeview">
                                                                 <?php foreach ($subModulo['option'] as $Option) : ?>
                                                                      <?php if(!is_null($Option['tipoOption'])){ ?>
                                                                           <?php if(count($Option['tipoOption'])==0){?>
                                                                                <li class="nav-item" onclick="redireccionarVista(<?php echo $Option['action']?>)">
                                                                                     <a href="#" class="nav-link level2">
                                                                                          <i class="nav-icon <?php if( $Option['nombre']  == 'Nuevo oficio' || $Option['nombre']  == 'Nueva circular' ) echo "fa fa-plus"; elseif( $Option['nombre']  == 'Recibidos' ) echo "fa fa-inbox"; elseif( $Option['nombre']  == 'Listado de etiquetas' ) echo "fa fa-list"; else echo "fas fa-chevron-circle-right"; ?>"></i>
                                                                                          <p><?php echo $Option['nombre']?></p>
                                                                                     </a>
                                                                                </li>
                                                                           <?php }else{ ?>
                                                                                <li class="nav-item">
                                                                                     <a href="#" class="nav-link level2">
                                                                                          <i class="nav-icon <?php if( $Option['nombre']  == 'Enviados' || $Option['nombre']  == 'Enviadas' ) echo "fa fa-paper-plane"; elseif( $Option['nombre']  == 'Recibidos' ) echo "fa fa-inbox"; else echo "fa fa-list-ul"; ?>"></i>
                                                                                          <p><?php echo $Option['nombre']?>
                                                                                               <i class="right fa fa-angle-left"></i>
                                                                                          </p>
                                                                                     </a>
                                                                                     <ul class="nav nav-treeview">
                                                                                          <?php foreach ($Option['tipoOption'] as $tipoOption) : ?>
                                                                                               <li <?php if(intval($tipoOption['tipo']==1)){
                                                                                                    echo "onclick=redireccionarEstatus(".$tipoOption['id'].")";} ?> class="nav-item">
                                                                                                    <a href="#" class="nav-link level3">
                                                                                                         <i class="nav-icon fa fa-angle-right"></i>
                                                                                                         <p><?php echo $tipoOption['nombre']?></p>
                                                                                                    </a>
                                                                                               </li>
                                                                                          <?php endforeach;?>
                                                                                     </ul>
                                                                                </li>
                                                                           <?php } ?>
                                                                      <?php } ?>
                                                                 <?php endforeach;?>
                                                            </ul>
                                                       </li>
                                                  <?php } ?>
                                             <?php endforeach;?>
                                        <?php } ?>
                                   <?php endforeach;?>

                              <?php } ?>
                         <?php endforeach;?>

                    <?php } ?>


        </ul>
      </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- </div> -->
    <!-- /.sidebar -->
</aside>
