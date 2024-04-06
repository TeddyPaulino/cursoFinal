(function() {
    document.addEventListener('DOMContentLoaded', () => {
        llenarSelectTipoMoneda(); 
        llenarSelectTipoTransaccion();       
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
    function llenarSelectTipoMoneda() {
        const selectTasa = document.querySelector('#selectTasa');
        console.log(selectTasa)
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoMoneda.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;

            selectTasa.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }
    function agregarTasa(e) {
        e.preventDefault();
        const tipoTransaccion = document.querySelector('#selectTransaccion').value;
        console.log(tipoTransaccion)
        const tipoMoneda = document.querySelector('#selectTasa').value;
        console.log(tipoMoneda)
        const tasaDia = document.querySelector('#tasaDia').value;

        console.log(tasaDia)
        if (tipoTransaccion === '' || tipoMoneda === '' || tasaDia === '') {
            mostrarMensaje();
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
                }    
            })   
        
        formularioTasa.reset();
        }
    }

    function mostrarMensaje() {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('mensaje');
        divMensaje.textContent = 'Todos los campos son obligatorios';
        
        formularioTasa.insertBefore(divMensaje, document.querySelector('form submit'));
        setTimeout(() => {
            divMensaje.remove();
        },4000 )    
       }
})();