<?php

require 'includes/funciones.php';

header("Access-Control-Allow-Origin: *");

echo $_GET["aperturaId"];
$eliminarApertura = eliminarRol($_GET["aperturaId"]);
echo json_encode($eliminarApertura);