(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarUsuario();
    })
    
    const listaUsuario = document.querySelector('#listaUsuario');
    listaUsuario.addEventListener('click', confirmarCliente)

    function listarUsuario() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarUsuario.php')
     .then(response => response.json())
     .then(resultado => {

        console.log(resultado)
        
         resultado.forEach(row => {
            const {id, nombre, apellido, correo, nombre_usuario, clave, rol_Id} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${nombre}</td>
                 <td>${apellido}</td>
                 <td>${correo}</td>
                 <td>${nombre_usuario}</td>
                 <td>${clave}</td>
                 <td>${rol_Id}</td>
                 <td>
                    <a href="#"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaUsuario.appendChild(tr);
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
