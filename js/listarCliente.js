(function() {
    document.addEventListener('DOMContentLoaded', () => {
        mostrarCliente();
    })
    
    const listaCliente = document.querySelector('#listaCliente');
    listaCliente.addEventListener('click', confirmarCliente)
    function mostrarCliente() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/mostrarCliente.php')
     .then(response => response.json())
     .then(resultado => {

        console.log(resultado)
        
         resultado.forEach(row => {
            const {id, nombre, apellido, direccion, telefono, tipo_Documento_Id, documento, correo, fecha} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${nombre}</td>
                 <td>${apellido}</td>
                 <td>${direccion}</td>
                 <td>${telefono}</td>
                 <td>${tipo_Documento_Id}</td>
                 <td>${documento}</td>
                 <td>${correo}</td>
                 <td>${fecha}</td>
                 <td>
                    <a href="#"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaCliente.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }

    function eliminar() {
        if (e.target.classList.contains( 'eliminar')) {

        }

    }


    function confirmarCliente(e) {

        if (e.target.classList.contains( 'eliminar')) {
            // const clienteId = parseInt(e.target.dataset.empleado);

            console.log("Hola");
            // const idEmpleado = e.target.getAttribute( 'data-empleado' );
    
            // const confirmar = confirm('¿Deseas eliminar este registro?');
    
    
            // if (confirmar) {
            //     eliminarEmpleado( empleadoId );
            // }
        }
        // window.location.href = 'index.html';    
    }
    
     
})();
