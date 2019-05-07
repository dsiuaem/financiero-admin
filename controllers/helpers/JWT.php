<?php
class JWT{

    //llave de encriptado para el JWT
    public $llaveJWT="PruebaJWT";
    //primera llave de seguridad para el segundo encriptado de seguridad de los datos enviados y recibidos
    public $llaveCrypt1="PruebaJWTC1";
    //segunda llave de seguridad para el segundo encriptado de seguridad de los datos enviados y recibidos
    public $llaveCrypt2="PruebaJWTC2";

    //funcion de encriptado token JWT de baja seguridad
    public function TokenJWT($object){
        $payload = json_encode($object);
        // codificando el metodo en base64
        $header = base64_encode('{"alg": "HS256","typ": "JWT"}');
        // codificando en base64 el json de los datos
        $payload = base64_encode($payload);
        // concatenando las cadenas codificadas
        $concatenado = $header . '.' . $payload;
        //creando la key de codificado
        $key=$this->llaveJWT;
        // creando signature con el concatenado de los datos y el metodo junto a la llave 
        //de codificado de igual manera de codifica en base64
        $signature = base64_encode(hash_hmac('sha256', $concatenado, $key, true));
        $aleatorio = rand(0, 99999);
        $aleatorio = substr(hash('sha256', $aleatorio),0,16);
        // crea un token concatenando las cadenas codificadas en base64
        $jwt_token = $header . '.' . $aleatorio . '.' . $payload . '.' . $signature;
        $encrypt = $this->Encriptar($jwt_token);
        return $encrypt;
    }
    
    //funcion de encriptado estricto donde se encripta el token JWT hacia otro metodo de encriptacion utilizando distintas metodologias combinadas para generar una encriptacion segura
    public function Encriptar($string){
        //funcion para encriptar datos
        $output = false;
        //llave de prueba que se utilizara para la encriptacion
        $myKey = $this->llaveCrypt1;
        //texto seguridad que se utilizara para la encriptacion
        $myIV = $this->llaveCrypt2;
        //metodo de encriptacion (http://php.net/manual/en/function.openssl-get-cipher-methods.php) para mas metodos de encriptacion
        $encrypt_method = 'AES-256-CBC';
        //hash genera un valor cifrado apartir de nuestra key en metodo sha256
        $secret_key = hash('sha256',$myKey);
        //substr nos genera solo una parte de nuestro valor cifrado pero aora de nuestro texto seguridad
        $secret_iv = substr(hash('sha256',$myIV),0,16);
        //genera una parte del texto resultante sin espacios al inicio ni al final
        $string = trim(strval($string));
        //ejecuta la funcion de encriptado del openssl para encriptar todos los parametros que le enviamos
        $output = openssl_encrypt($string, $encrypt_method, $secret_key, 0, $secret_iv);
        //regresa el resultado
        return $output;
    }

    //funcion que usa la encriptacion segura a la inversa para obtener el token JWT
    public function Desencriptar($string){
        //funcion para desencriptar datos
        $output = false;
        //llave de prueba que se utilizara para la encriptacion
        $myKey = $this->llaveCrypt1;
        //texto seguridad que se utilizara para la encriptacion
        $myIV = $this->llaveCrypt2;
        //metodo de encriptacion (http://php.net/manual/en/function.openssl-get-cipher-methods.php) para mas metodos de encriptacion
        $encrypt_method = 'AES-256-CBC';
        //hash genera un valor cifrado apartir de nuestra key en metodo sha256
        $secret_key = hash('sha256',$myKey);
        //substr nos genera solo una parte de nuestro valor cifrado pero aora de nuestro texto seguridad
        $secret_iv = substr(hash('sha256',$myIV),0,16);
        //genera una parte del texto resultante sin espacios al inicio ni al final
        $string = trim(strval($string));
        //ejecuta la funcion de desencriptado del openssl para regresarnos los datos como los teniamos antes de encriptar
        $output = openssl_decrypt($string, $encrypt_method, $secret_key, 0, $secret_iv);
        $decrypt = $this->getPayload($output);
        //regresa el resultado
        return $decrypt;
    }

    //funcion donde una vez obtenida la token JWT se obtiene el contenido del mismo para el uso de los datos enviados o recibidos
    public function getPayload($myText_decrypted){
        //aqui separamos el Token por '.' para obtener nuestro payload 
        $payloadResult = explode(".", $myText_decrypted);
        //una ves que separamos nustro payload de nuestro token, decodificamos de base64 nustro payload para que nos regrese la cadena JSON de texto original
        $datosPayload = base64_decode($payloadResult[2]);
        //ya que tenemos nuestro JSON lo decodificamos para que nos regrese los valores originales.
        $recibido = json_decode($datosPayload);
        return $recibido;
    }
}
?>