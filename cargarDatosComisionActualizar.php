<?php

require 'includes/funciones.php';


header("Access-Control-Allow-Origin: *");

$cargarDatosComisionActualizar = cargarDatosComisionActualizar();

echo json_encode($cargarDatosComisionActualizar);
