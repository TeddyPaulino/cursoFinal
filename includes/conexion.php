<?php
    $db = mysqli_connect(
        'localhost',
        'root', '',
        'expressExchanges'
    );

    if (!$db) {
        echo "Error en la conexion";
        exit;
    } 