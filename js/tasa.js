(function() {
    document.addEventListener('DOMContentLoaded', () => {
        llenarSelectTipoTransaccion();
        llenarSelectTipoMonedaOrigen(); 
        llenarSelectTipoMonedaDestino()       
    });

    const formularioTasa = document.querySelector('#formularioTasa');

    formularioTasa.addEventListener('submit', agregarTasa);

    function llenarSelectTipoTransaccion() {
        const tipoTransaccion = document.querySelector('#selectTransaccion');
        console.log(tipoTransaccion)
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoTransaccion.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;

            tipoTransaccion.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }


    // Funcion que llena el select en html
    function llenarSelectTipoMonedaOrigen() {
        const monedaOrigen = document.querySelector('#monedaOrigen');
     
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoMoneda.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;

            monedaOrigen.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }

    function llenarSelectTipoMonedaDestino() {
        const monedaDestino = document.querySelector('#monedaDestino');
     
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoMoneda.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;

            monedaDestino.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }
    function agregarTasa(e) {
        e.preventDefault();
        const tipoTransaccion = document.querySelector('#selectTransaccion').value;
        console.log(tipoTransaccion)
        const monedaOrigen = document.querySelector('#monedaOrigen').value;
        const monedaDestino = document.querySelector('#monedaDestino').value;
        const tasaDia = document.querySelector('#tasaDia').value;

        if (tipoTransaccion === '' || monedaOrigen === '' || monedaDestino === '' || tasaDia === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Todos los campos son obligatorios...",
                
            });
        } else {
            let data = new FormData(formularioTasa);
            console.log(data)

            fetch('http://localhost:3000/agregarTasa.php', {
            
            method: 'POST',
            body: data
            
            })
            .then(response => response.json())
            .then(respuesta => {

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
                        window.location.href = 'listaTasa.html';
                    },5000)  
                } 
                   
            })   
        
        formularioTasa.reset();
        }
    }

})();