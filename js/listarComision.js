(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarComision();
    })
    
    const listaComision = document.querySelector('#listaComision');
    listaComision.addEventListener('click', confirmarComision);
    function listarComision() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarComision.php')
     .then(response => response.json())
     .then(resultado => {

        console.log(resultado)
        
         resultado.forEach(row => {
            const {id, tipo_transaccion_id, tipo_moneda_id,comision_dia, fecha} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${tipo_transaccion_id}</td>
                 <td>${tipo_moneda_id}</td>
                 <td>${comision_dia}</td>
                 <td>${fecha}</td>
                 <td>
                    <a href="editarComision.html?id=${id}"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i data-comision="${id}" class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaComision.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }

    function confirmarComision(e) {

        if (e.target.classList.contains( 'eliminar')) {
            const comisionId = parseInt(e.target.dataset.comision);
            
            Swal.fire({
                title: "Estas seguro que deseas eliminarlo...?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!"
              }).then((result) => {
                if (result.isConfirmed) {
                    
                    eliminarComision(comisionId);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Comisión eliminada...",
                    icon: "success",
                    
                  });
                  setTimeout(() => {
                    window.location.href = 'listaComision.html';
                },5000) 
                  
                }
                
              });       
        }            
    }

    function eliminarComision(comisionId ) {
        try {
            fetch(`http://localhost:3000/deleteComision.php?comisionId=${comisionId}`, {
                method: 'GET'
            });
    
        }catch(error) {
            console.log(error)
        }
    
    
    }
    
    
     
})();
