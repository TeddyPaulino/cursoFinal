(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarDocumento();
    })
    
    const listaDocumento = document.querySelector('#listaDocumento');
    listaDocumento.addEventListener('click', confirmarComision);
    function listarDocumento() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarDocumento.php')
     .then(response => response.json())
     .then(resultado => { 
         resultado.forEach(row => {
            const {id, nombre, fecha} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${nombre}</td>
                 <td>${fecha}</td>
                 <td>
                    <a href="#"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i data-documento="${id}" class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaDocumento.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }

    function confirmarComision(e) {

        if (e.target.classList.contains( 'eliminar')) {
            const documentoId = parseInt(e.target.dataset.documento);
            
            Swal.fire({
                title: "Estas seguro que deseas eliminarlo...?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!"
              }).then((result) => {
                if (result.isConfirmed) {
                    
                    eliminarTipoDocumento(documentoId);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Documento eliminada...",
                    icon: "success",
                    
                  });
                  setTimeout(() => {
                    window.location.href = 'listaDocumento.html';
                },1000) 
                  
                }
                
              });       
        }            
    }

    function eliminarTipoDocumento(documentoId ) {
        console.log(documentoId)
        try {
            fetch(`http://localhost:3000/deleteTipoDocumento.php?documentoId=${documentoId}`, {
                method: 'GET'
            });
    
        }catch(error) {
            console.log(error)
        }
    
    
    }
    
    
})();
