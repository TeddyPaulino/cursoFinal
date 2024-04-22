<?php

require 'includes/funciones.php';

header("Access-Control-Allow-Origin: *");

echo $_GET["documentoId"];
$eliminarDocumento = eliminarDocumento($_GET["documentoId"]);
echo json_encode($eliminarDocumento);
