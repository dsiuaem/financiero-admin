<!DOCTYPE html>
<!-- LOGIN ADMINLTE -->
<?php require 'views/header.php' ?>
<body class="hold-transition login-page">
<div class="login-box">
    <div class="login-logo">
        <b>Administrador de Sistemas UAEM</b>
    </div>
    <!-- /.login-logo -->
    <div class="card">
        <div class="card-body login-card-body">
            <p class="login-box-msg"><?php echo $this->errorLogin; ?></p>

            <form action="<?php echo constant('URL'); ?>login/validar" method="POST">
                <div class="form-group has-feedback">
                    <input class="form-control" type="text" name="nombre" id="nombre" placeholder="Usuario" required>
                    <!-- <span class="fa fa-envelope form-control-feedback"></span> -->
                </div>
                <div class="form-group has-feedback">
                    <input class="form-control" type="password" name="password" id="password" placeholder="Contraseña"
                           required>
                    <!-- <span class="fa fa-lock form-control-feedback"></span> -->
                </div>
                <div class="row">
                    <!-- <div class="col-8">
                      <div class="checkbox icheck">
                        <label>
                          <input type="checkbox"> Remember Me
                        </label>
                      </div>
                    </div> -->
                    <!-- /.col -->
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block btn-flat">Iniciar sesión</button>
                    </div>
                    <!-- /.col -->
                </div>
            </form>

            <!-- <div class="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a href="#" class="btn btn-block btn-primary">
                <i class="fa fa-facebook mr-2"></i> Sign in using Facebook
              </a>
              <a href="#" class="btn btn-block btn-danger">
                <i class="fa fa-google-plus mr-2"></i> Sign in using Google+
              </a>
            </div> -->
            <!-- /.social-auth-links -->

            <!-- <p class="mb-1">
              <a href="#">I forgot my password</a>
            </p>
            <p class="mb-0">
              <a href="register.html" class="text-center">Register a new membership</a>
            </p> -->
        </div>
        <!-- /.login-card-body -->
    </div>
</div>
<?php include_once 'views/libreriasJS.php' ?>
</body>
</html>
