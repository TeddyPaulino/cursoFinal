<?php

// Funcion de agregar tipo documento
function agregarTipoDocumento() {
    require 'conexion.php';
    $nombre = $_POST['nombre'];

    // Consultar si el registro existe
    $sql_select = "SELECT * FROM tipo_documento WHERE nombre = '$nombre'";
    $resultado = $db->query($sql_select);

    if ($resultado->num_rows > 0) {
        $respuesta = array(
            "success" => false,
            "message" => "El registro ya existe."
        );
    } else {
        // Insertar datos a la base de datos
        $sql = "INSERT INTO tipo_documento(nombre)
                VALUES ('$nombre')";

        if (mysqli_query($db, $sql)) {
            $respuesta = array(
                "success" => true,
                "message" => "Registro insertado correctamente."
            );
        } else {
            $respuesta = array(
                "success" => false,
                "message" => "Error al insertar datos: " . $$db->error
            );
    
        }
    }
    // Convertir mensaje en Json
    header('Content-Type: application/json');
    echo json_encode($respuesta);
    // Cerrar la conexion
    mysqli_close($db);
}
