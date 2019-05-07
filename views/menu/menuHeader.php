<nav class="main-header navbar navbar-expand bg-white navbar-light border-bottom fixed-top">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"></i></a>
      </li>
    </ul>
    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fa fa-user-circle"></i><span class="salir"><?php echo $_SESSION['usuarioSIA']; ?></span>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a onClick="salirSistema();" href="#" class="dropdown-item">
            <i class="fa fa-sign-out"></i>&nbsp;Cerrar sesión</a>
        </div>
      </li>
    </ul>
</nav>