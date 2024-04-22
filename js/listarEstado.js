(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarComision();
    })
    
    const listaEstado = document.querySelector('#listaEstado');
    listaEstado.addEventListener('click', confirmarComision);
    function listarComision() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarEstado.php')
     .then(response => response.json())
     .then(resultado => {
        
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
                     <a href="#"><i data-estado="${id}" class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaEstado.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }

    function confirmarComision(e) {

        if (e.target.classList.contains( 'eliminar')) {
            const estadoId = parseInt(e.target.dataset.estado);
            
            Swal.fire({
                title: "Estas seguro que deseas eliminarlo...?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!"
              }).then((result) => {
                if (result.isConfirmed) {
                    
                    eliminarEstado(estadoId);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Estado eliminada...",
                    icon: "success",
                    
                  });
                  setTimeout(() => {
                    window.location.href = 'listaEstado.html';
                },1000) 
                  
                }
                
              });       
        }            
    }

    function eliminarEstado(estadoId ) {
        try {
            fetch(`http://localhost:3000/deleteEstado.php?estadoId=${estadoId}`, {
                method: 'GET'
            });
    
        }catch(error) {
            console.log(error)
        }
    
    
    }
    
    
    
     
})();
