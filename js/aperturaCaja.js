(function(){ 

    document.addEventListener('DOMContentLoaded', () => {
        llenarSelectTipoMoneda()
    })

    const formularioApertura = document.querySelector('#formularioApertura');
    formularioApertura.addEventListener('submit', agregarCantidad);

    function llenarSelectTipoMoneda() {
        const selectMonedaInput = document.querySelector('#nombreMoneda');
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoMoneda.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;
            selectMonedaInput.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }

    function agregarCantidad(e) {
        e.preventDefault();
        
        const cantidad = document.querySelector('#cantidad').value;
        const selectMonedaInput = document.querySelector('#nombreMoneda').value;
        if (cantidad === '' ||  selectMonedaInput === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Todos los campos son obligatorios...",
                
            });
        } else {
            let data = new FormData(formularioApertura);
            console.log(data)

            fetch('http://localhost:3000/agregarApertura.php', {
            
            method: 'POST',
            body: data
            
            })
            .then(response => response.json())
            .then(respuesta => {
                 console.log(respuesta)
                if (respuesta.success === false) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: respuesta.message,
                        
                    });
                } else {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: respuesta.message,
                        showConfirmButton: false,
                        timer: 3000
                    });
                    setTimeout(() => {
                        window.location.href = 'listaApertura.html';
                    },5000)  
                } 
                   
            })   
        
            formularioApertura.reset();
        }
    }

})();