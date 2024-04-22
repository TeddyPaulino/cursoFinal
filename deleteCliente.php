<?php

require 'includes/funciones.php';

header("Access-Control-Allow-Origin: *");

echo $_GET["clienteId"];
$eliminarCliente = eliminarCliente($_GET["clienteId"]);
echo json_encode($eliminarCliente);

