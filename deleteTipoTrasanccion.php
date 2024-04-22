<?php

require 'includes/funciones.php';

header("Access-Control-Allow-Origin: *");

echo $_GET["transaccionId"];
$eliminarTipoTransaccion = eliminarTipoTransaccion($_GET["transaccionId"]);
echo json_encode($eliminarTipoTransaccion);
