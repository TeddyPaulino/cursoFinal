(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarUsuario();
    })
    
    const listaUsuario = document.querySelector('#listaUsuario');
    listaUsuario.addEventListener('click', confirmarUsuario)

    function listarUsuario() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarUsuario.php')
     .then(response => response.json())
     .then(resultado => {

        console.log(resultado)
        
         resultado.forEach(row => {
            const {id, nombre, apellido, correo, nombre_usuario, clave, rolUsuario} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${nombre}</td>
                 <td>${apellido}</td>
                 <td>${correo}</td>
                 <td>${nombre_usuario}</td>
                 <td>${clave}</td>
                 <td>${rolUsuario}</td>
                 <td>
                    <a href="editarUsuario.html?id=${id}"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i data-usuario="${id}" class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaUsuario.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }
    function confirmarUsuario(e) {

        if (e.target.classList.contains('eliminar')) {
            const usuarioId = parseInt(e.target.dataset.usuario);
            console.log(usuarioId)
            Swal.fire({
                title: "Estas seguro que deseas eliminarlo...?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!"
              }).then((result) => {
                if (result.isConfirmed) {
                    
                    eliminarUsuario(usuarioId);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Rol eliminada...",
                    icon: "success",
                    
                  });
                  setTimeout(() => {
                    window.location.href = 'listaUsuario.html';
                },1000) 
                  
                }
                
              });       
        }            
    }

    function eliminarUsuario(usuarioId ) {
        try {
            fetch(`http://localhost:3000/deleteUsuario.php?usuarioId=${usuarioId}`, {
                method: 'GET'
            });
    
        }catch(error) {
            console.log(error)
        }
    }
     
})();
