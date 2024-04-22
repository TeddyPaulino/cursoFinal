(function() {
    //  .catch(error => console.error('Error:', error));
    document.addEventListener('DOMContentLoaded', () => {
        mostrarTransaccion();
    })

    const listaTransaccion = document.querySelector('#listaTransaccion');
    // listaTransaccion.addEventListener('click', confirmarCliente);

    function mostrarTransaccion() {
        // Hace una petición fetch para obtener los datos de PHP
        fetch('http://localhost:3000/listarTransaccion.php')
        .then(response => response.json())
        .then(resultado => {

            console.log(resultado)
            
            resultado.forEach(row => {
                const {id, tipo_transaccion, monto_recibido, tipo_moneda, tasa_cambio, comision, total_comision, monedaDestino, monto_entregar, documento, nombre_cliente, fecha} = row
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${id}</td>
                    <td>${tipo_transaccion}</td>
                    <td>${monto_recibido}</td>
                    <td>${monedaDestino}</td>
                    <td>${tasa_cambio}</td>
                    <td>${comision}</td>
                    <td>${total_comision}</td>
                    <td>${tipo_moneda}</td>
                    <td>${monto_entregar}</td>
                    <td>${documento}</td>
                    <td>${nombre_cliente}</td>
                    <td>${fecha}</td>
                    
                `;
             listaTransaccion.appendChild(tr);
            });
    
    // function confirmarCliente(e) {

    //     if (e.target.classList.contains( 'eliminar')) {
    //         const clienteId = parseInt(e.target.dataset.cliente);
            
    //         Swal.fire({
    //             title: "Estas seguro de eliminarlo...?",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonColor: "#3085d6",
    //             cancelButtonColor: "#d33",
    //             confirmButtonText: "Yes, delete!"
    //           }).then((result) => {
    //             if (result.isConfirmed) {
                    
    //                 eliminarEmpleado(clienteId);
    //               Swal.fire({
    //                 title: "Deleted!",
    //                 text: "Cliente eliminado...",
    //                 icon: "success",
                    
    //               });
    //               setTimeout(() => {
    //                 window.location.href = 'listaCliente.html';
    //             },5000) 
                  
    //             }
                
              });       
        }            
    // }

    // function eliminarEmpleado( clienteId ) {
    //     try {
    //         fetch(`http://localhost:3000/deleteCliente.php?clienteId=${clienteId}`, {
    //             method: 'GET'
    //         });
    
    //     }catch(error) {
    //         console.log(error)
    //     }
    
    
    // }
    
     
})();
