<?php

require 'includes/funciones.php';


header("Access-Control-Allow-Origin: *");

$cargarDatosTasaActualizar = cargarDatosTasaActualizar();

echo json_encode($cargarDatosTasaActualizar);
