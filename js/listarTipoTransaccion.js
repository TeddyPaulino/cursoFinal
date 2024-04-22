(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarTransaccion();
    })
    
    const listaTransaccion = document.querySelector('#listaTransaccion');
    listaTransaccion.addEventListener('click', confirmarTipoTransaccion);
    function listarTransaccion() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarTipoTransaccion.php')
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
                    <a href="editarTipoTransaccion.html?id=${id}"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i data-transaccion="${id}" class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
        
             `;
             listaTransaccion.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }

    function confirmarTipoTransaccion(e) {

        if (e.target.classList.contains( 'eliminar')) {
            const transaccionId = parseInt(e.target.dataset.transaccion);
            
            Swal.fire({
                title: "Estas seguro de eliminarlo...?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!"
              }).then((result) => {
                if (result.isConfirmed) {
                    
                    eliminarTipoTransaccion(transaccionId);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Cliente eliminado...",
                    icon: "success",
                    
                  });
                  setTimeout(() => {
                    window.location.href = 'listaTipoTransaccion.html';
                },5000) 
                  
                }
                
              });       
        }            
    }

    function eliminarTipoTransaccion(transaccionId ) {
        console.log(transaccionId)
        try {
            fetch(`http://localhost:3000/deleteTipoTrasanccion.php?transaccionId=${transaccionId }`, {
                method: 'GET'
            });
    
        }catch(error) {
            console.log(error)
        }
    
    }
    
     
})();
