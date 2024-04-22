<?php

require 'includes/funciones.php';


header("Access-Control-Allow-Origin: *");

$cargarDatosActualizarCliente = cargarDatosActualizarCliente();

echo json_encode($cargarDatosActualizarCliente);

