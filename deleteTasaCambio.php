<?php

require 'includes/funciones.php';

header("Access-Control-Allow-Origin: *");

echo $_GET["tasaId"];
$eliminarTasa = eliminarTasa($_GET["tasaId"]);
echo json_encode($eliminarTasa);
