(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarApertura();
    })
    
    const listaApertura = document.querySelector('#listaApertura');
    listaApertura.addEventListener('click', confirmarApertura);
    function listarApertura() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarApertura.php')
     .then(response => response.json())
     .then(resultado => { 
         resultado.forEach(row => {
            const {id, tipo_moneda_id ,cantidad, fecha_apertura} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${tipo_moneda_id}</td>
                 <td>${cantidad}</td>
                 <td>${fecha_apertura}</td>
                 <td>
                    <a href="editarTasa.html?id=${id}"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i data-apertura="${id}"class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaApertura.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }

    function confirmarApertura(e) {

        if (e.target.classList.contains('eliminar')) {
            const aperturaId = parseInt(e.target.dataset.apertura);

            console.log(aperturaId)
            
            Swal.fire({
                title: "Estas seguro que deseas eliminarlo...?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!"
              }).then((result) => {
                if (result.isConfirmed) {
                    
                    eliminarTasa(aperturaId);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Rol eliminada...",
                    icon: "success",
                    
                  });
                  setTimeout(() => {
                    // window.location.href = 'listaTasa.html';
                },1000) 
                  
                }
                
              });       
        }            
    }

    function eliminarTasa(aperturaId ) {
        try {
            fetch(`http://localhost:3000/deleteApertura.php?aperturaId=${aperturaId}`, {
                method: 'GET'
            });
    
        }catch(error) {
            console.log(error)
        }
    }
    
     
})();
