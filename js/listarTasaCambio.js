(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarTasa();
    })
    
    const listaTasa = document.querySelector('#listaTasaCambio');
    listaTasa.addEventListener('click', confirmarTasa);
    function listarTasa() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarTasaCambio.php')
     .then(response => response.json())
     .then(resultado => {

        console.log(resultado)
        
         resultado.forEach(row => {
            const {id, tipo_moneda_id ,tipo_moneda_id_destino, tipo_transaccion_id ,tasa_dia, fecha} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${tipo_moneda_id}</td>
                 <td>${tipo_moneda_id_destino}</td>
                 <td>${tipo_transaccion_id}</td>
                 <td>${tasa_dia}</td>
                 <td>${fecha}</td>
                 <td>
                    <a href="editarTasa.html?id=${id}"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i data-tasa="${id}"class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaTasa.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }

    function confirmarTasa(e) {

        if (e.target.classList.contains('eliminar')) {
            const tasaId = parseInt(e.target.dataset.tasa);
            
            Swal.fire({
                title: "Estas seguro que deseas eliminarlo...?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!"
              }).then((result) => {
                if (result.isConfirmed) {
                    
                    eliminarTasa(tasaId);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Rol eliminada...",
                    icon: "success",
                    
                  });
                  setTimeout(() => {
                    window.location.href = 'listaTasa.html';
                },1000) 
                  
                }
                
              });       
        }            
    }

    function eliminarTasa(tasaId ) {
        try {
            fetch(`http://localhost:3000/deleteTasaCambio.php?tasaId=${tasaId}`, {
                method: 'GET'
            });
    
        }catch(error) {
            console.log(error)
        }
    }
    
     
})();
