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

// Funcion de agregar tipo documento
function agregarTipoTransaccion() {
    require 'conexion.php';
    $tipoTransaccion = $_POST['tipoTransaccion'];
    $descripcion = $_POST['descripcion'];

    // Consultar si el registro existe
    $sql_select = "SELECT * FROM tipo_transaccion  WHERE nombre = '$tipoTransaccion'";
    $resultado = $db->query($sql_select);

    if ($resultado->num_rows > 0) {
        $respuesta = array(
            "success" => false,
            "message" => "El registro ya existe."
        );
    } else {
        // Insertar datos a la base de datos
        $sql = "INSERT INTO tipo_transaccion(nombre, descripcion)
                VALUES ('$tipoTransaccion', '$descripcion')";

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

// Funcion que llena el Select Rol 
function selectTipoMoneda() {
    require 'conexion.php';
    // Consulta SQL para obtener datos
     $sql = "SELECT id, nombre FROM tipo_moneda ";
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

 function agregarTasa() {
    require 'conexion.php';
    $selectTasa = $_POST['selectTasa'];
    $tasaCompra = $_POST['tasaCompra'];
    $tasaVenta = $_POST['tasaVenta'];

    // Insertar datos a la base de datos
    $sql = "INSERT INTO tasa_cambio(tipo_moneda_id , tasa_venta, tasa_compro)
    VALUES ('$selectTasa', '$tasaCompra', '$tasaVenta')";

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
    
    // Convertir mensaje en Json
    header('Content-Type: application/json');
    echo json_encode($respuesta);
    // Cerrar la conexion
    mysqli_close($db);
}

// Funcion que llena el Select 
function selectTipoTransaccion() {
    require 'conexion.php';
    // Consulta SQL para obtener datos
     $sql = "SELECT id, nombre FROM tipo_transaccion";
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

 function agregarComision() {
    require 'conexion.php';
    $tipoMoneda = $_POST['tipoMoneda'];
    $tipoTransaccion = $_POST['tipoTransaccion'];
    $comision = $_POST['comision'];

    // Insertar datos a la base de datos
    $sql = "INSERT INTO comision(tipo_transaccion_id , tipo_moneda_id, comision)
    VALUES ('$tipoMoneda', '$tipoTransaccion', '$comision')";

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
    
    // Convertir mensaje en Json
    header('Content-Type: application/json');
    echo json_encode($respuesta);
    // Cerrar la conexion
    mysqli_close($db);
}

function agregarEstado() {
    require 'conexion.php';

    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];

    $sql_select = "SELECT * FROM estado WHERE nombre = '$nombre'";
    $resultado = $db->query($sql_select);

    if ($resultado->num_rows > 0) {
        $respuesta = array(
            "success" => false,
            "message" => "El registro ya existe."
        );
    } else {
        // Insertar datos a la base de datos
        $sql = "INSERT INTO estado(nombre, descripcion)
                VALUES ('$nombre', '$descripcion')";

        if (mysqli_query($db, $sql)) {
            $respuesta = array(
                "success" => true,
                "message" => "Estado insertado correctamente."
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

function mostrarCliente() {
    require 'conexion.php';

    $query = "SELECT * FROM cliente";
    $resultado = $db->query($query);

    // Preparar un array para almacenar los resultados
    $rows = array();
    while ($fila = $resultado->fetch_assoc()) {
        $rows[] = $fila;
    }

    // Convertir el array a formato JSON y enviarlo
    header('Content-Type: application/json');
    echo json_encode($rows);

    // Cerrar la conexión
    $db->close();
}

function listarComision() {
    require 'conexion.php';

    $query = "SELECT * FROM comision";
    $resultado = $db->query($query);

    // Preparar un array para almacenar los resultados
    $rows = array();
    while ($fila = $resultado->fetch_assoc()) {
        $rows[] = $fila;
    }

    // Convertir el array a formato JSON y enviarlo
    header('Content-Type: application/json');
    echo json_encode($rows);

    // Cerrar la conexión
    $db->close();
}

function listarEstado() {
    require 'conexion.php';

    $query = "SELECT * FROM estado";
    $resultado = $db->query($query);

    // Preparar un array para almacenar los resultados
    $rows = array();
    while ($fila = $resultado->fetch_assoc()) {
        $rows[] = $fila;
    }

    // Convertir el array a formato JSON y enviarlo
    header('Content-Type: application/json');
    echo json_encode($rows);

    // Cerrar la conexión
    $db->close();

}

function listarRol() {
    require 'conexion.php';

    $query = "SELECT * FROM rol";
    $resultado = $db->query($query);

    // Preparar un array para almacenar los resultados
    $rows = array();
    while ($fila = $resultado->fetch_assoc()) {
        $rows[] = $fila;
    }

    // Convertir el array a formato JSON y enviarlo
    header('Content-Type: application/json');
    echo json_encode($rows);

    // Cerrar la conexión
    $db->close();
}

function listarTasaCambio() {
    require 'conexion.php';

    $query = "SELECT * FROM tasa_cambio";
    $resultado = $db->query($query);

    // Preparar un array para almacenar los resultados
    $rows = array();
    while ($fila = $resultado->fetch_assoc()) {
        $rows[] = $fila;
    }

    // Convertir el array a formato JSON y enviarlo
    header('Content-Type: application/json');
    echo json_encode($rows);

    // Cerrar la conexión
    $db->close();
}

function listarDocumento() {
    require 'conexion.php';

    $query = "SELECT * FROM tipo_documento";
    $resultado = $db->query($query);

    // Preparar un array para almacenar los resultados
    $rows = array();
    while ($fila = $resultado->fetch_assoc()) {
        $rows[] = $fila;
    }

    // Convertir el array a formato JSON y enviarlo
    header('Content-Type: application/json');
    echo json_encode($rows);

    // Cerrar la conexión
    $db->close();
}
?>



