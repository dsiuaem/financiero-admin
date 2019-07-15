<?php
    define('idSystem','1');
    define('CHARSET','utf8mb4');
    $production=getenv('PRODUCCION');
        switch ($production) {
            case 1:
			define('URL', getenv('FRONT_URL_ADMIN')); //URL EN DONDE ESTA ALOJADA ESTA APLICACIÓN
			define('URL_API_ADMIN', getenv('API_URL_ADMIN')); //URL DE LA API DE ADMIN
			define('API_URL_SIA', getenv('API_URL_SIA'));
                break;
            default:
                $URLArray=explode("/",getcwd());
				$varurl=strtoupper($URLArray[4]);
				define('URL', getenv('FRONT_URL_ADMIN_'.$varurl)); //URL EN DONDE ESTA ALOJADA ESTA APLICACIÓN
				define('URL_API_ADMIN', getenv('API_URL_ADMIN_'.$varurl).'/'); //URL DE LA API DE ADMIN
                define('API_URL_ADMIN',getenv('API_URL_ADMIN_'.$varurl).'/');
                define('API_URL_SIA',getenv('API_URL_SIA_'.$varurl).'/');
            }

    ?>
