(function() {
    document.addEventListener('DOMContentLoaded', () => {
        listarMoneda();
    })
    
    const listaMoneda = document.querySelector('#listaMoneda');
    listaMoneda.addEventListener('click', confirmarTipoMoneda);
    function listarMoneda() {
        // Hace una petición fetch para obtener los datos de PHP
     fetch('http://localhost:3000/listarMoneda.php')
     .then(response => response.json())
     .then(resultado => {

        console.log(resultado)
        
         resultado.forEach(row => {
            const {id, nombre, codigo_moneda, fecha} = row
             const tr = document.createElement('tr');
             tr.innerHTML = `
                 <td>${id}</td>
                 <td>${nombre}</td>
                 <td>${codigo_moneda}</td>
                 <td>${fecha}</td>
                 <td>
                    <a href="#"><i class="fa-solid fa-pen-to-square editar"></i></a>
                     <a href="#"><i data-moneda="${id}" class="fa-solid fa-trash-can-arrow-up eliminar"></i></a>
                 </td>
             `;
             listaMoneda.appendChild(tr);
         });
     })
    //  .catch(error => console.error('Error:', error));
    }

    function confirmarTipoMoneda(e) {
        e.preventDefault();
        if (e.target.classList.contains('eliminar')) {
            const monedaId = parseInt(e.target.dataset.moneda);
            Swal.fire({
                title: "Estas seguro que deseas eliminarlo...?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!"
              }).then((result) => {
                if (result.isConfirmed) {
                    console.log(monedaId)
                    eliminarTipoMoneda(monedaId);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Rol eliminada...",
                    icon: "success",
                    
                  });
                  setTimeout(() => {
                    window.location.href = 'listaTipoMoneda.html';
                },1000) 
                  
                }
                
              });       
        }            
    }

    function eliminarTipoMoneda(monedaId ) {
        try {
            fetch(`http://localhost:3000/deleteTipoMoneda.php?monedaId=${monedaId}`, {
                method: 'GET'
            });
    
        }catch(error) {
            console.log(error)
        }
    
    
    }
    
     
})();
