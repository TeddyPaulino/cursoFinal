(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarComision();
    })
    
    const listaComision = document.querySelector('#listaComision');
    // listaComision.addEventListener('click', confirmarComision);
    function listarComision() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarComision.php')
     .then(response => response.json())
     .then(resultado => {

        console.log(resultado)
        
         resultado.forEach(row => {
            const {id, tipo_transaccion_id, tipo_moneda_id,comision, fecha} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${tipo_transaccion_id}</td>
                 <td>${tipo_moneda_id}</td>
                 <td>${comision}</td>
                 <td>${fecha}</td>
                 <td>
                    <a href="#"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaComision.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }

    function eliminar() {
        if (e.target.classList.contains( 'eliminar')) {

        }

    }


    // function confirmarCliente(e) {

    //     if (e.target.classList.contains( 'eliminar')) {
    //         // const clienteId = parseInt(e.target.dataset.empleado);

    //         console.log("Hola");
    //         // const idEmpleado = e.target.getAttribute( 'data-empleado' );
    
    //         // const confirmar = confirm('¿Deseas eliminar este registro?');
    
    
    //         // if (confirmar) {
    //         //     eliminarEmpleado( empleadoId );
    //         // }
    //     }
    //     // window.location.href = 'index.html';    
    // }
    
     
})();
