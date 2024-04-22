<?php

require 'includes/funciones.php';

header("Access-Control-Allow-Origin: *");

echo $_GET["usuarioId"];
$eliminarUsuario = eliminarUsuario($_GET["usuarioId"]);
echo json_encode($eliminarUsuario);