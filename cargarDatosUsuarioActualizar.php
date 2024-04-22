<?php

require 'includes/funciones.php';


header("Access-Control-Allow-Origin: *");

$cargarDatosUsuarioActualizar = cargarDatosUsuarioActualizar();

echo json_encode($cargarDatosUsuarioActualizar);
