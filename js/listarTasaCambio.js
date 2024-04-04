(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarTasa();
    })
    
    const listaTasa = document.querySelector('#listaTasaCambio');
    // listaComision.addEventListener('click', confirmarComision);
    function listarTasa() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarTasaCambio.php')
     .then(response => response.json())
     .then(resultado => {

        console.log(resultado)
        
         resultado.forEach(row => {
            const {id, tipo_moneda_id , tasa_venta ,tasa_compro, fecha} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${tipo_moneda_id}</td>
                 <td>${tasa_venta}</td>
                 <td>${tasa_compro}</td>
                 <td>${fecha}</td>
                 <td>
                    <a href="#"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaTasaCambio.appendChild(tr);
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
