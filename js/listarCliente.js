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
                    <a href="editarCliente.html?id=${id}"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i data-cliente="${id}" class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaCliente.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }

    
    function confirmarCliente(e) {

        if (e.target.classList.contains( 'eliminar')) {
            const clienteId = parseInt(e.target.dataset.cliente);
            
            Swal.fire({
                title: "Estas seguro de eliminarlo...?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!"
              }).then((result) => {
                if (result.isConfirmed) {
                    
                    eliminarEmpleado(clienteId);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Cliente eliminado...",
                    icon: "success",
                    
                  });
                  setTimeout(() => {
                    window.location.href = 'listaCliente.html';
                },5000) 
                  
                }
                
              });       
        }            
    }

    function eliminarEmpleado( clienteId ) {
        try {
            fetch(`http://localhost:3000/deleteCliente.php?clienteId=${clienteId}`, {
                method: 'GET'
            });
    
        }catch(error) {
            console.log(error)
        }
    
    
    }
    
     
})();
