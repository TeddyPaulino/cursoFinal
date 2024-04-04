(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarComision();
    })
    
    const listaEstado = document.querySelector('#listaEstado');
    // listaComision.addEventListener('click', confirmarComision);
    function listarComision() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarEstado.php')
     .then(response => response.json())
     .then(resultado => {

        console.log(resultado)
        
         resultado.forEach(row => {
            const {id, nombre, descripcion,  fecha} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${nombre}</td>
                 <td>${descripcion}</td>
                 <td>${fecha}</td>
                 <td>
                    <a href="#"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaEstado.appendChild(tr);
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
