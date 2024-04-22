(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarRol();
    })
    
    const listaRol = document.querySelector('#listaRol');
    listaRol.addEventListener('click', confirmarRol);
    function listarRol() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarRol.php')
     .then(response => response.json())
     .then(resultado => {

        console.log(resultado)
        
         resultado.forEach(row => {
            const {id, nombre, descripcion, fecha} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${nombre}</td>
                 <td>${descripcion}</td>
                 <td>${fecha}</td>
                 <td>
                    <a href="editarRol.html?id=${id}"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i data-rol="${id}" class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaRol.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }

    function confirmarRol(e) {

        if (e.target.classList.contains( 'eliminar')) {
            const rolId = parseInt(e.target.dataset.rol);
            
            Swal.fire({
                title: "Estas seguro que deseas eliminarlo...?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!"
              }).then((result) => {
                if (result.isConfirmed) {
                    
                    eliminarRol(rolId);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Rol eliminada...",
                    icon: "success",
                    
                  });
                  setTimeout(() => {
                    window.location.href = 'listaRolUsuario.html';
                },1000) 
                  
                }
                
              });       
        }            
    }

    function eliminarRol(rolId ) {
        try {
            fetch(`http://localhost:3000/deleteRol.php?rolId=${rolId}`, {
                method: 'GET'
            });
    
        }catch(error) {
            console.log(error)
        }
    }
       
})();
