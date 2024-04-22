
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
       
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $result = $db->query("SELECT transaccion.*, tipo_transaccion.nombre AS tipo_transaccion, tipo_moneda.nombre AS tipo_moneda
            FROM transaccion
                                    JOIN tipo_transaccion ON transaccion.tipo_transaccion_id = tipo_transaccion.id
                                    JOIN tipo_moneda ON transaccion.tipo_moneda_id = tipo_moneda.id
                                    WHERE transaccion.id = $id");

            if ($result->num_rows > 0) {
                $transaccion = $result->fetch_assoc();
                ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ticket de Compra de Divisa</title>
            <link rel="stylesheet" href="styles.css"> <!-- Vincula aquí tu archivo CSS si tienes uno -->
        </head>
        <body>
            <h1>Ticket Compra y Venta de Divisa</h1>
            <div id="ticket">
                <h2>Detalle de Transacción</h2>
                <p>Tipo de Transacción: <?php echo $transaccion['tipo_transaccion']; ?></p>
                <p>Moneda Origen: <?php echo $transaccion['tipo_moneda']; ?></p>
                <p>Cantidad Recibida: <?php echo $transaccion['monto_recibido']; ?></p>
                <p>Tasa: <?php echo $transaccion['tasa_cambio']; ?></p>
                <p>Comisión: <?php echo $transaccion['comision']; ?></p>
                <p>Total Comisión: <?php echo $transaccion['total_comision']; ?></p>
                <p>Monto Entregar: <?php echo $transaccion['monto_entregar']; ?></p>
                <p>Cliente: <?php echo $transaccion['nombre_cliente']; ?></p>
                <p>Ticket: <?php echo $transaccion['numero_factura']; ?></p>
                <p>Fecha: <?php echo $transaccion['fecha']; ?></p>
            </div>
        </body>
        </html>
        <?php
    } else {
        echo "No se encontró la transacción.";
    }
} else {
    echo "No se proporcionó un ID de transacción.";
}

// Cerrar la conexión a la base de datos


        $db->close();
?>
