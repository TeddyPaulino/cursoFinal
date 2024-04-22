<?php

require 'includes/funciones.php';

header("Access-Control-Allow-Origin: *");

echo $_GET["rolId"];
$eliminarRol = eliminarRol($_GET["rolId"]);
echo json_encode($eliminarRol);