<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Language" content="es"/>
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <link rel="shortcut icon" type="image/x-icon" href="" />
  <title>Iniciar sesión</title>
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<?php require 'views/header.php' ?>
<body>
  <div id="principal">
    <div>
      <div class="login-box">
        <div class="login-logo">
            <b style="color: white;">Administrador de Sistemas <strong>UAEM</strong></b>
        </div>
            <div class="card-body login-card-body">
                <p class="login-box-msg"><?php echo $this->errorLogin; ?></p>

                <form action="<?php echo constant('URL'); ?>login/validar" method="POST">
                    <div class="form-group has-feedback">
                      <div align="center">
                        <label class="titulo">CORREO INSTITUCIONAL</label>
                        <input class="form-control inputlogin" type="text" name="nombre" id="nombre" placeholder="Usuario" required>
                      </div>
                    </div>
                    <div class="form-group has-feedback">
                      <div align="center">
                        <label class="titulo">CONTRASEÑA</label>
                        <input class="form-control inputlogin" type="password" name="password" id="password" placeholder="Contraseña"
                               required>
                      </div>
                    </div>
                    <div class="row">
                        <div class="col-12" align="center">
                            <button type="submit" class="btn btn-block botonlogin">Iniciar sesión</button>
                        </div>
                    </div>
                </form>
            </div>
    </div>
  </div>              
  </div>
<footer class="text-center footerTrans" id="footer">
<div class="container" style="height: 100%;">
    <div class="row" style="height: 100%;">
      <div class="col-md-12" style="height: 100%;z-index: 2">
        <table id="footerTable">
          
          <tr>
            <td style="padding-top: 7px;">Coordinación General de Planeación y Adminsitración</td>
          </tr>
          <tr>
            <td>Dirección General de Tecnologías de Información y Comunicación</td>
          </tr>
          <tr>
            <td>Dirección de Sistemas de Información</td>
          </tr>
          <tr>
            <td><p style="margin-bottom: 0.5rem;"></p></td>
          </tr>
          <tr>
            <td style="padding-bottom: 8px;">wwww.uaem.mx</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
        </table>

      </div>
    </div>
</div>
</footer>
<?php include_once 'views/libreriasJS.php' ?>
</body>
</html>
