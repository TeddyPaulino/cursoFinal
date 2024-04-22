<?php

require 'includes/funciones.php';


header("Access-Control-Allow-Origin: *");

$cargarDatosRolActualizar = cargarDatosRolActualizar();

echo json_encode($cargarDatosRolActualizar);
