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
    $monedaOrigen = $_POST['monedaOrigen'];
    $monedaDestino = $_POST['monedaDestino'];
    $tasaDia = $_POST['tasaDia'];
    $selectTransaccion = $_POST['selectTransaccion'];

    // Insertar datos a la base de datos
    $sql = "INSERT INTO tasa_cambio(tipo_moneda_id,tasa_dia, tipo_transaccion_id, tipo_moneda_id_destino)
    VALUES ('$monedaOrigen','$tasaDia','$selectTransaccion' , '$monedaDestino')";

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
    $sql = "INSERT INTO comision(tipo_transaccion_id , tipo_moneda_id, comision_dia)
    VALUES ('$tipoTransaccion', '$tipoMoneda', '$comision')";

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

function listarUsuario() {
    require 'conexion.php';

    $query = "SELECT usuario.*, rol.nombre  AS rolUsuario from usuario 
    join rol  on usuario.rol_Id = rol.id ";
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

function listarTipoMoneda() {
    require 'conexion.php';

    $query = "SELECT * FROM tipo_moneda";
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

function listarTipoTransaccion() {  
    require 'conexion.php';

    $query = "SELECT * FROM tipo_transaccion";
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

function listarTransaccion() {
    require 'conexion.php';

    $query = ("SELECT transaccion.*,tipo_transaccion.nombre AS tipo_transaccion, tm.nombre AS tipo_moneda, tmdestino.nombre  AS monedaDestino  from transaccion 
    join tipo_transaccion on transaccion.tipo_transaccion_id = tipo_transaccion.id
    JOIN tipo_moneda tmdestino on transaccion.tipo_moneda_id_destino  = tmdestino.id 
    JOIN tipo_moneda tm ON transaccion.tipo_moneda_id = tm.id"); 
    

   
    

    $resultado = $db->query($query);

    // Preparar un array para almacenar los resultados
    $rows = array();
    while ($fila = $resultado->fetch_assoc()) {
        $rows[] = $fila;
    }

    // ("SELECT  tipo_transaccion.nombre AS tipo_transaccion, tipo_moneda.nombre AS tipo_moneda
    // FROM transaccion
    //                         JOIN tipo_transaccion ON transaccion.tipo_transaccion_id = tipo_transaccion.id
    //                         JOIN tipo_moneda ON transaccion.tipo_moneda_id = tipo_moneda.id
    //                         WHERE transaccion.id = $id");

    // Convertir el array a formato JSON y enviarlo
    header('Content-Type: application/json');
    echo json_encode($rows);

    // Cerrar la conexión
    $db->close();
}

function obtenerUltimaTasa() {
    require 'conexion.php';

    // Obtener los parámetros desde la solicitud
    $tipoTransaccion = $_GET['tipoTransaccion'];
    $monedaOrigen = $_GET['monedaOrigen'];
    $monedaDestino = $_GET['monedaDestino'];

    // Consulta para obtener la última tasa de cambio según el tipo de transacción y tipo de moneda
    $sql = "SELECT tasa_dia FROM tasa_cambio WHERE tipo_moneda_id='$monedaOrigen' AND tipo_moneda_id_destino= '$monedaDestino' AND tipo_transaccion_id='$tipoTransaccion' ORDER BY fecha DESC LIMIT 1";
    $resultado = $db->query($sql);

    
if ($resultado->num_rows > 0) {
    // Devolver la tasa como JSON
    $row = $resultado->fetch_assoc();
    header('Content-Type: application/json');
    echo json_encode($row);
} 
   
    
    $db->close();
    }

    function obtenerComision() {
        require 'conexion.php';
    
        // Obtener los parámetros desde la solicitud
        $tipoTransaccion = $_GET['tipoTransaccion'];
        $monedaOrigen = $_GET['monedaOrigen'];
    
        // Consulta para obtener la última tasa de cambio según el tipo de transacción y tipo de moneda
        $sql = "SELECT comision_dia FROM comision 
        WHERE tipo_transaccion_id = '$tipoTransaccion' AND tipo_moneda_id ='$monedaOrigen' ORDER BY fecha DESC LIMIT 1";
        $resultado = $db->query($sql);
    
        
    if ($resultado->num_rows > 0) {
        // Devolver la tasa como JSON
        $row = $resultado->fetch_assoc();
        header('Content-Type: application/json');
        echo json_encode($row);
    } 
       
        
        $db->close();
    }

    function obtenerNombreApellido() {
        require 'conexion.php';
        $documento = $_GET['numeroDocumento'];
         // Consultar si el registro existe
        $sql_select = "SELECT * FROM cliente WHERE documento = '$documento'";
        $resultado = $db->query($sql_select);

        if ($resultado->num_rows > 0) {

        // Consulta para obtener el nombre y apellido del cliente por el número de documento
        $sql = "SELECT UPPER(CONCAT(nombre, ' ', apellido)) AS nombre_apellido FROM cliente WHERE documento='$documento'";
        $resultado = $db->query($sql);
 
            // Devolver el nombre y apellido combinados en mayúsculas como JSON
            $row = $resultado->fetch_assoc();
            header('Content-Type: application/json');
            echo json_encode($row);
            
        } else {
            $respuesta = array(
                "success" => false,
                "message" => "Cliente no existe"
            );

            // Convertir mensaje en Json
            header('Content-Type: application/json');
            echo json_encode($respuesta);
        }

       
        
        $db->close();

      
    }

    function agregarTransaccion() {
        require 'conexion.php';

        $tipoTransaccion = $_POST['tipoTransaccion'];
        $montoRecibido = $_POST['montoRecibido'];
        $monedaDestino = $_POST['monedaDestino'];
        $ultimaTasa = $_POST['ultimaTasa'];
        $ultimaComision = $_POST['ultimaComision'];
        $totalComision = $_POST['totalComision'];
        $montoEntregar = $_POST['montoEntregar'];
        $numeroDocumento = $_POST['numeroDocumento'];
        $nombreCLiente = $_POST['nombreCLiente'];
        $monedaOrigen = $_POST['monedaOrigen'];
        
        // $usuario = $_POST['nombreUsuario'];
        
        // Obtener el número de factura actual y actualizar el contador
        $sql = "SELECT numero FROM contador_facturas FOR UPDATE";
        $resultado = $db->query($sql);
        $row = $resultado->fetch_assoc();
        $numero_factura = $row['numero'];

        $new_numero_factura = $numero_factura + 1;
        // Acutlizar el numero de factura
        $sql_update = "UPDATE contador_facturas SET numero = $new_numero_factura";

        $db->query($sql_update);

        // Verificar si hay una apertura de caja para el tipo de moneda seleccionado
        $sql = "SELECT estado FROM apertura_caja WHERE tipo_moneda_id = '$monedaOrigen' AND estado = 'abierto'";
        $resultado = $db->query($sql);

        if ($resultado->num_rows > 0) {
            // La caja está abierta, se puede realizar la transacción

                  // Insertar datos a la base de datos
                $sql = "INSERT INTO transaccion(tipo_transaccion_id, monto_recibido, tipo_moneda_id, tasa_cambio, comision,  total_comision, monto_entregar,
                 documento, nombre_cliente, tipo_moneda_id_destino, numero_factura)

                VALUES ('$tipoTransaccion', '$montoRecibido', '$monedaDestino',  '$ultimaTasa', '$ultimaComision','$totalComision', '$montoEntregar', '$numeroDocumento', '$nombreCLiente', '$monedaOrigen', '$numero_factura')";

                if ($db->query($sql) === TRUE) {
                
                   // Obtener el ID de la transacción recién insertada
                    $last_id = $db->insert_id;
                    // Devolver el ID de la transacción en formato JSON
                    echo json_encode(array("id" => $last_id));
                } else {
                    echo "Error: " . $sql . "<br>" . $db->error;
                }

                // Preparar la consulta SQL para actualizar la cantidad de moneda en caja
                $sql_actualizar_caja = "UPDATE apertura_caja SET cantidad = cantidad - '$montoRecibido' WHERE tipo_moneda_id = '$monedaOrigen'";
                $db->query($sql_actualizar_caja);

                // Cerrar la conexion
           

            // echo "Transacción realizada con éxito.";
        } else {
            // La caja está cerrada, no se puede realizar la transacción
            // $mensaje = "No se puede realizar la transacción. La caja para $monedaOrigen está cerrada.";
            // header('Content-Type: application/json');
            // echo json_encode($mensaje);

            }


              

               
            $db->close(); 
        }            
        
      
    
    // Funcion de borrar registro cliente
    function eliminarCliente($clienteId) {
    

        require('includes/conexion.php');
        
        header("Access-Control-Allow-Origin: *");
        $sql = "DELETE  FROM cliente WHERE id = '" . $clienteId . "'";
        
        if (mysqli_query($db, $sql)) {

            echo json_encode("Usuario Eliminado");

        } else {
            echo json_encode("Usuario no pudo ser eliminado");

        }
}

// Funcion de borrar registro comision
function eliminarComision($comisionId) {
    
    require('includes/conexion.php');
    
    header("Access-Control-Allow-Origin: *");
    $sql = "DELETE  FROM comision WHERE id = '" . $comisionId . "'";
    
    if (mysqli_query($db, $sql)) {

        echo json_encode("Comision Eliminada");

    } else {
        echo json_encode("Comision no pudo ser eliminado");

    }
}

// Funcion de borrar registro Documento
function eliminarDocumento($documentoId) {
    
    require('includes/conexion.php');
    
    header("Access-Control-Allow-Origin: *");
    $sql = "DELETE  FROM tipo_Documento WHERE id = '" . $documentoId . "'";
    
    if (mysqli_query($db, $sql)) {

        echo json_encode("Documento Eliminado");

    } else {
        echo json_encode("Documento no pudo ser eliminado");

    }
}

// Funcion de borrar registro Estado
function eliminarEstado($estadoId) {
    
    require('includes/conexion.php');
    
    header("Access-Control-Allow-Origin: *");
    $sql = "DELETE  FROM estado WHERE id = '" . $estadoId . "'";
    
    if (mysqli_query($db, $sql)) {

        echo json_encode("Estado Eliminado");

    } else {
        echo json_encode("Estado no pudo ser eliminado");

    }
}

// Funcion de borrar registro Estado
function eliminarRol($rolId) {
    
    require('includes/conexion.php');
    
    header("Access-Control-Allow-Origin: *");
    $sql = "DELETE  FROM rol WHERE id = '" . $rolId . "'";
    
    if (mysqli_query($db, $sql)) {

        echo json_encode("Rol Eliminado");

    } else {
        echo json_encode("Rol no pudo ser eliminado");

    }
}

// Funcion de borrar registro Estado
function eliminarTasa($tasaId) {
    
    require('includes/conexion.php');
    
    header("Access-Control-Allow-Origin: *");
    $sql = "DELETE  FROM tasa_cambio WHERE id = '" . $tasaId . "'";
    
    if (mysqli_query($db, $sql)) {

        echo json_encode("Rol Eliminado");

    } else {
        echo json_encode("Rol no pudo ser eliminado");

    }
}

function eliminarTipoMoneda($monedaId) {
    
    require('includes/conexion.php');
    
    header("Access-Control-Allow-Origin: *");
    $sql = "DELETE  FROM tipo_moneda WHERE id = '" . $monedaId . "'";
    
    if (mysqli_query($db, $sql)) {

        echo json_encode("Tipo moneda Eliminado");

    } else {
        echo json_encode("Tipo moneda no pudo ser eliminado");

    }
}

function eliminarUsuario($usuarioId) {
    
    require('includes/conexion.php');
    
    header("Access-Control-Allow-Origin: *");
    $sql = "DELETE  FROM usuario WHERE id = '" . $usuarioId . "'";
    
    if (mysqli_query($db, $sql)) {

        echo json_encode("Usuario  Eliminado");

    } else {
        echo json_encode("Usuario no pudo ser eliminado");

    }
}

function eliminarTipoTransaccion($transaccionId) {
    
    require('includes/conexion.php');
    
    header("Access-Control-Allow-Origin: *");
    $sql = "DELETE  FROM tipo_transaccion WHERE id = '" . $transaccionId . "'";
    
    if (mysqli_query($db, $sql)) {

        echo json_encode("Usuario  Eliminado");

    } else {
        echo json_encode("Usuario no pudo ser eliminado");

    }
}

function cargarDatosActualizarCliente() {

    try {

        // Importar la conexión
        require 'conexion.php';
        $id = $_GET['id'];
        // Realiza la consulta
        $sql = "SELECT * FROM cliente WHERE id = '$id'";

        $consulta = mysqli_query($db, $sql);

        $cliente;

        $i = 0;
        // Obtenemos los resultados
        while( $row = mysqli_fetch_assoc($consulta)) {
            $cliente[$i]['id'] = $row['id'];
            $cliente[$i]['nombre'] = $row['nombre'];
            $cliente[$i]['apellido'] = $row['apellido'];
            $cliente[$i]['direccion'] = $row['direccion'];
            $cliente[$i]['telefono'] = $row['telefono'];
            $cliente[$i]['tipo_Documento_Id'] = $row['tipo_Documento_Id'];
            $cliente[$i]['documento'] = $row['documento'];
            $cliente[$i]['correo'] = $row['correo'];
            
            $i++;
            
        }
      
        return $cliente;
        
    }catch(\Throwable $th) {
        var_dump($th);
    }

    
    
}

function actualizarCliente() {

    $data = json_decode(file_get_contents('php://input'), true);
    header("Access-Control-Allow-Origin: *");
    require 'conexion.php';
    
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $tipoDocumento = $_POST['tipoDocumento'];
    $cedula = $_POST['cedula'];
    $correo = $_POST['correo'];

    $sql = "UPDATE cliente SET nombre = '$nombre', apellido = '$apellido', direccion = '$direccion', telefono = '$telefono',
    tipo_Documento_Id = '$tipoDocumento', documento = '$cedula', correo = '$correo' WHERE id = '$id'";

    // Paso 3: Ejecutar la consulta SQL
    if ($db->query($sql) === TRUE) {
        header('Content-Type: application/json');
        echo json_encode("Registro actualizado correctamente");
    } else {
        header('Content-Type: application/json');
        echo "Error al actualizar el registro: " . $db->error;
    }

// Cerrar la conexión
    $db->close();
   
}

// Actualizar Rol de usuario

function cargarDatosRolActualizar() {

    try {

        // Importar la conexión
        require 'conexion.php';
        $idRol = $_GET['idRol'];
        // Realiza la consulta
        $sql = "SELECT * FROM rol WHERE id = '$idRol'";

        $consulta = mysqli_query($db, $sql);

        $rol;

        $i = 0;
        // Obtenemos los resultados
        while( $row = mysqli_fetch_assoc($consulta)) {
            $rol[$i]['id'] = $row['id'];
            $rol[$i]['nombre'] = $row['nombre'];    
            $rol[$i]['descripcion'] = $row['descripcion'];    
            $i++;
            
        }
        
        return $rol;
        
    }catch(\Throwable $th) {
        var_dump($th);
    }
}
function actualizarRol() {
    $data = json_decode(file_get_contents('php://input'), true);
    header("Access-Control-Allow-Origin: *");
    require 'conexion.php';
    
    $idRol = $_POST['idRol'];
    $nombreEditar = $_POST['nombreEditar'];
    $descripcionEditar = $_POST['descripcionEditar'];

    $sql = "UPDATE rol SET nombre = '$nombreEditar', descripcion = '$descripcionEditar' WHERE id = '$idRol'";

    // Paso 3: Ejecutar la consulta SQL
    if ($db->query($sql) === TRUE) {
        header('Content-Type: application/json');
        echo json_encode("Registro actualizado correctamente");
    } else {
        echo "Error al actualizar el registro: " . $db->error;
    }

// Cerrar la conexión
$db->close();
   
}

// Funcion de obtener el usuario via id
function cargarDatosUsuarioActualizar() {

    try {

        // Importar la conexión
        require 'conexion.php';
        $id = $_GET['idUsuario'];
        // Realiza la consulta
        $sql = "SELECT * FROM usuario WHERE id = '$id'";

        $consulta = mysqli_query($db, $sql);

        $usuario;

        $i = 0;
        // Obtenemos los resultados
        while( $row = mysqli_fetch_assoc($consulta)) {
            $usuario[$i]['id'] = $row['id'];
            $usuario[$i]['nombre'] = $row['nombre'];    
            $usuario[$i]['apellido'] = $row['apellido'];    
            $usuario[$i]['correo'] = $row['correo'];    
            $usuario[$i]['nombre_usuario'] = $row['nombre_usuario'];    
            $usuario[$i]['clave'] = $row['clave'];    
            $usuario[$i]['rol_Id'] = $row['rol_Id'];       
            $i++;
            
        }
        
        return $usuario;
        
    }catch(\Throwable $th) {
        var_dump($th);
    }
}

function actualizarUsuario() {

    $data = json_decode(file_get_contents('php://input'), true);
    header("Access-Control-Allow-Origin: *");
    require 'conexion.php';
    
    $idUsuario = $_POST['idUsuario'];
    $nombre = $_POST['editarNombre'];
    $apellido = $_POST['editarApellido'];
    $correo = $_POST['editarCorreo'];
    $usuario = $_POST['editarUsuario'];
    $clave = $_POST['editarClave'];
    $rol = $_POST['editarRol'];
    
    $sql = "UPDATE usuario SET nombre = '$nombre', apellido = '$apellido', correo = '$correo', nombre_usuario = '$usuario', clave = '$clave', rol_Id = '$rol' WHERE id = '$idUsuario'";

    // Paso 3: Ejecutar la consulta SQL
    if ($db->query($sql) === TRUE) {
        header('Content-Type: application/json');
        echo json_encode("Registro actualizado correctamente");
    } else {
        header('Content-Type: application/json');
        echo "Error al actualizar el registro: ";
    }

// Cerrar la conexión
    $db->close();
   
}

function cargarDatosTransaccionActualizar() {

    try {

        // Importar la conexión
        require 'conexion.php';
        $idTransaccion = $_GET['idTransaccion'];
        // Realiza la consulta
        $sql = "SELECT * FROM tipo_transaccion WHERE id = '$idTransaccion'";

        $consulta = mysqli_query($db, $sql);

        $transaccion;

        $i = 0;
        // Obtenemos los resultados
        while( $row = mysqli_fetch_assoc($consulta)) {
            $transaccion[$i]['id'] = $row['id'];
            $transaccion[$i]['nombre'] = $row['nombre'];    
            $transaccion[$i]['descripcion'] = $row['descripcion'];    
            $i++;
            
        }
        
        return $transaccion;
        
    }catch(\Throwable $th) {
        var_dump($th);
    }
}

function actualizarTipoTransaccion() {

    $data = json_decode(file_get_contents('php://input'), true);
    header("Access-Control-Allow-Origin: *");
    require 'conexion.php';
    
    $idTransaccion = $_POST['idTransaccion'];
    $editarTransaccion = $_POST['editarTransaccion'];
    $editarDescripcion = $_POST['editarDescripcion'];
    
    
    $sql = "UPDATE tipo_transaccion SET nombre = '$editarTransaccion', descripcion = '$editarDescripcion' WHERE id = '$idTransaccion'";

    // Paso 3: Ejecutar la consulta SQL
    if ($db->query($sql) === TRUE) {
        header('Content-Type: application/json');
        echo json_encode("Registro actualizado correctamente");
    } else {
        header('Content-Type: application/json');
        echo "Error al actualizar el registro: ";
    }

// Cerrar la conexión
    $db->close();

    
   
}

function cargarDatosTasaActualizar() {

    try {

        // Importar la conexión
        require 'conexion.php';
        $idTasa = $_GET['idTasa'];
        // Realiza la consulta
        $sql = "SELECT * FROM tasa_cambio WHERE id = '$idTasa'";

        $consulta = mysqli_query($db, $sql);

        $tasa;

        $i = 0;
        // Obtenemos los resultados
        while( $row = mysqli_fetch_assoc($consulta)) {
            $tasa[$i]['id'] = $row['id'];
            $tasa[$i]['tipo_moneda_id'] = $row['tipo_moneda_id'];    
            $tasa[$i]['tasa_dia'] = $row['tasa_dia'];    
            $tasa[$i]['tipo_transaccion_id'] = $row['tipo_transaccion_id'];        
            $tasa[$i]['tipo_moneda_id_destino'] = $row['tipo_moneda_id_destino'];    
            
        }
        
        return $tasa;
        
    }catch(\Throwable $th) {
        var_dump($th);
    }

    
}

function actualizarTasa() {

    $data = json_decode(file_get_contents('php://input'), true);
    header("Access-Control-Allow-Origin: *");
    require 'conexion.php';
    
    $idTasa = $_POST['idTasa'];
    $editarSelectTransaccion = $_POST['editarSelectTransaccion'];
    $editarMonedaOrigen = $_POST['editarMonedaOrigen'];
    $editarMonedaDestino = $_POST['editarMonedaDestino'];
    $editarTasaDia = $_POST['editarTasaDia'];
    
    
    $sql = "UPDATE tasa_cambio SET tipo_moneda_id = '$editarMonedaOrigen', tasa_dia = '$editarTasaDia', tipo_transaccion_id = '$editarSelectTransaccion', tipo_moneda_id_destino = '$editarMonedaDestino' WHERE id = '$idTasa'";

    // Paso 3: Ejecutar la consulta SQL
    if ($db->query($sql) === TRUE) {
        header('Content-Type: application/json');
        echo json_encode("Registro actualizado correctamente");
    } else {
        header('Content-Type: application/json');
        echo "Error al actualizar el registro: ";
    }

// Cerrar la conexión
    $db->close();    
   
}

function cargarDatosComisionActualizar() {

    try {

        // Importar la conexión
        require 'conexion.php';
        $idComision = $_GET['idComision'];
        // Realiza la consulta
        $sql = "SELECT * FROM comision WHERE id = '$idComision'";

        $consulta = mysqli_query($db, $sql);

        $comision;

        $i = 0;
        // Obtenemos los resultados
        while( $row = mysqli_fetch_assoc($consulta)) {
            $comision[$i]['id'] = $row['id'];
            $comision[$i]['tipo_transaccion_id'] = $row['tipo_transaccion_id'];    
            $comision[$i]['tipo_moneda_id'] = $row['tipo_moneda_id'];    
            $comision[$i]['comision_dia'] = $row['comision_dia'];        
            
        }
        
        return $comision;
        
    }catch(\Throwable $th) {
        var_dump($th);
    }
}

function actualizarComision() {

    $data = json_decode(file_get_contents('php://input'), true);
    header("Access-Control-Allow-Origin: *");
    require 'conexion.php';
    
    $idComision = $_POST['idComision'];
    $editartipoMoneda = $_POST['editartipoMoneda'];
    $editarTipoTransaccion = $_POST['editarTipoTransaccion'];
    $editarComision = $_POST['editarComision'];
    
    
    $sql = "UPDATE comision SET tipo_transaccion_id = '$editarTipoTransaccion', tipo_moneda_id = '$editartipoMoneda', comision_dia = '$editarComision' WHERE id = '$idComision'";

    // Paso 3: Ejecutar la consulta SQL
    if ($db->query($sql) === TRUE) {
        header('Content-Type: application/json');
        echo json_encode("Registro actualizado correctamente");
    } else {
        header('Content-Type: application/json');
        echo "Error al actualizar el registro: ";
    }

// Cerrar la conexión
    $db->close();    
   
}

function login() {
    require 'conexion.php';
    // $usuario = $_POST['usuario'];
    // $clave = $_POST['clave'];

    // echo json_encode("Los Datos correctos ${usuario}, ${clave}");
    // // Consulta SQL para verificar las credenciales del usuario
    // $sql = "SELECT * FROM usuario WHERE nombre_usuario='$usuario'";
    // $result = $db->query($sql);

    // // Verificar si se encontraron resultados y enviar la respuesta al cliente
    // if ($result->num_rows > 0) {
    //     // Usuario válido encontrado
    //     // echo json_encode(array("success" => true));
    // } else {
    //     // Usuario o contraseña incorrectos
    //     // echo json_encode(array("success" => false, "message" => "Usuario o contraseña incorrectos."));
    // }

    // // Cerrar conexión a la base de datos
    $db->close();
}   

function agregarApertura() {
    require 'conexion.php';
    $nombreMoneda = $_POST['nombreMoneda'];
    $cantidad = $_POST['cantidad'];
    

    // Insertar datos a la base de datos
    $sql = "INSERT INTO apertura_caja(tipo_moneda_id, cantidad)
    VALUES ('$nombreMoneda','$cantidad')";

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

function listarApertura() {
    require 'conexion.php';

    $query = "SELECT * FROM apertura_caja";
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

function eliminarApertura($aperturaId) {
    
    require('includes/conexion.php');
    
    header("Access-Control-Allow-Origin: *");
    $sql = "DELETE FROM apertura_caja WHERE id = '" . $aperturaId . "'";
    
    if (mysqli_query($db, $sql)) {

        echo json_encode("Comision Eliminada");

    } else {
        echo json_encode("Comision no pudo ser eliminado");

    }
}


?>


    
    
    




