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

// Funcion que llena el Select 
function selectTipoDocumento() {
   require 'conexion.php';
   // Consulta SQL para obtener datos
    $sql = "SELECT id, nombre FROM tipo_documento";
    $resultado = $db->query($sql);

    // Comprobar si hay resultados y construir un array
    $options = array();
    if ($resultado->num_rows > 0) {
        while($row = $resultado->fetch_assoc()) {
            $options[] = $row;
        }
    }

    // Devolver los datos como JSON
    header('Content-Type: application/json');
    echo json_encode($options);

    // Cerrar conexión
    $db->close();
}

// Funcion que agrega los clientes
function agregarClientes() {
    require 'conexion.php';
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $tipoDocumento = $_POST['tipoDocumento'];
    $cedula = $_POST['cedula'];
    $correo = $_POST['correo'];

    // Consultar si el registro existe
    $sql_select = "SELECT * FROM cliente WHERE documento = '$cedula' OR correo = '$correo' ";
    $resultado = $db->query($sql_select);

    if ($resultado->num_rows > 0) {
        $respuesta = array(
            "success" => false,
            "message" => "El cliente ya existe."
        );
    } else {
        // Insertar datos a la base de datos
        $sql = "INSERT INTO cliente(nombre, apellido, direccion, telefono,   tipo_Documento_Id, documento, correo)
                VALUES ('$nombre', '$apellido', '$direccion', '$telefono', '$tipoDocumento', '$cedula', '$correo')";

        if (mysqli_query($db, $sql)) {
            $respuesta = array(
                "success" => true,
                "message" => "Cliente insertado correctamente."
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

// Funcion agregar Tipo Moneda
function agregarTipoMoneda() {
    require 'conexion.php';
    $nombreMoneda = $_POST['nombreMoneda'];
    $codigoMoneda = $_POST['codigoMoneda'];

    $sql_select = "SELECT * FROM tipo_moneda WHERE nombre = '$nombreMoneda' OR codigo_moneda = '$codigoMoneda' ";
    $resultado = $db->query($sql_select);

    if ($resultado->num_rows > 0) {
        $respuesta = array(
            "success" => false,
            "message" => "El registro ya existe."
        );
    } else {
        // Insertar datos a la base de datos
        $sql = "INSERT INTO tipo_moneda(nombre, codigo_moneda)
                VALUES ('$nombreMoneda', '$codigoMoneda')";

        if (mysqli_query($db, $sql)) {
            $respuesta = array(
                "success" => true,
                "message" => "Moneda insertado correctamente."
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

// Funcion de agregar usuario
function agregarRolUsuario() {
    require 'conexion.php';

    $nombreRol = $_POST['nombreUsuario'];
    $descripcion = $_POST['descripcion'];

    $sql_select = "SELECT * FROM rol WHERE nombre = '$nombreRol'";
    $resultado = $db->query($sql_select);

    if ($resultado->num_rows > 0) {
        $respuesta = array(
            "success" => false,
            "message" => "El registro ya existe."
        );
    } else {
        // Insertar datos a la base de datos
        $sql = "INSERT INTO rol(nombre, descripcion)
                VALUES ('$nombreRol', '$descripcion')";

        if (mysqli_query($db, $sql)) {
            $respuesta = array(
                "success" => true,
                "message" => "Moneda insertado correctamente."
            );
        } else {
            $respuesta = array(
                "success" => false,
                "message" => "Error al insertar datos: " . $db->error
            ); 
        }
    }
    // Convertir mensaje en Json
    header('Content-Type: application/json');
    echo json_encode($respuesta);
    // Cerrar la conexion
    mysqli_close($db);

}

// Funcion que llena el Select Rol 
function selectRol() {
    require 'conexion.php';
    // Consulta SQL para obtener datos
     $sql = "SELECT id, nombre FROM rol";
     $resultado = $db->query($sql);
 
     // Comprobar si hay resultados y construir un array
     $options = array();
     if ($resultado->num_rows > 0) {
         while($row = $resultado->fetch_assoc()) {
             $options[] = $row;
         }
     }
 
     // Devolver los datos como JSON
     header('Content-Type: application/json');
     echo json_encode($options);
 
     // Cerrar conexión
     $db->close();
 }

//  Funcion que agrega usuario
function agregarUsuario() {
    require 'conexion.php';

    $nombre = $_POST['nombre'];
    $apellidoUsuario = $_POST['apellido'];
    $correo = $_POST['correo'];
    $usuario = $_POST['nombreUsuario'];
    $clave = $_POST['clave'];
    $rol = $_POST['selectRolUsuario'];

    $sql_select = "SELECT * FROM usuario WHERE nombre_usuario = '$usuario'";
    $resultado = $db->query($sql_select);

    if ($resultado->num_rows > 0) {
        $respuesta = array(
            "success" => false,
            "message" => "El usuario ya existe."
        );
    } else {
        // Insertar datos a la base de datos
        $sql = "INSERT INTO usuario(nombre, apellido, correo, nombre_usuario, clave, rol_id)
                VALUES ('$nombre', '$apellidoUsuario', '$correo', '$usuario', '$clave', '$rol')";

        if (mysqli_query($db, $sql)) {
            $respuesta = array(
                "success" => true,
                "message" => "Usuario insertado correctamente."
            );
        } else {
            $respuesta = array(
                "success" => false,
                "message" => "Error al insertar datos: " . $db->error
            ); 
        }
    }
    // Convertir mensaje en Json
    header('Content-Type: application/json');
    echo json_encode($respuesta);
    // Cerrar la conexion
    mysqli_close($db);


}
 