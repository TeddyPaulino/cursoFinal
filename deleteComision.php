<?php

require 'includes/funciones.php';

header("Access-Control-Allow-Origin: *");

echo $_GET["comisionId"];
$eliminarComision = eliminarComision($_GET["comisionId"]);
echo json_encode($eliminarComision);