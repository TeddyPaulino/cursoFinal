<?php

require 'includes/funciones.php';

header("Access-Control-Allow-Origin: *");

echo $_GET["estadoId"];
$eliminarEstado = eliminarEstado($_GET["estadoId"]);
echo json_encode($eliminarEstado);