<?php

require 'includes/funciones.php';

header("Access-Control-Allow-Origin: *");

echo $_GET["monedaId"];
$eliminarTipoMoneda = eliminarTipoMoneda($_GET["monedaId"]);
echo json_encode($eliminarTipoMoneda);
