<?php

require 'includes/funciones.php';


header("Access-Control-Allow-Origin: *");

$login = login();

echo json_encode($login);
