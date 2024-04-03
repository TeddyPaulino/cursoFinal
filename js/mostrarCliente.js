(function() {
    document.addEventListener('DOMContentLoaded', () => {
        mostrarCliente();
    })
    
    function mostrarCliente() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/mostrarCliente.php')
     .then(response => response.json())
     .then(resultado => {

        console.log(resultado)
         const listaCliente = document.querySelector('#listaCliente');
         resultado.forEach(row => {
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${row.id}</td>
                 <td>${row.nombre}</td>
                 <td>${row.apellido}</td>
                 <td>${row.direccion}</td>
                 <td>${row.telefono}</td>
                 <td>${row.tipo_Documento_Id}</td>
                 <td>${row.documento}</td>
                 <td>${row.correo}</td>
                 <td>${row.fecha}</td>
                 <td>
                    <button onclick="editar(${row.id})"><i class="fas fa-edit editar"></i></button>
                    <button onclick="eliminar(${row.id})"><i 
                    class="fa-solid fa-trash-can-arrow-up"></i></button>

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
     
})();
