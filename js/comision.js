(function() {
    document.addEventListener('DOMContentLoaded', () => {
        llenarSelectTipoMoneda();   
        llenarSelectTipoTransaccion();     
    });
    
    const formularioComision = document.querySelector('#formularioComision');

    formularioComision.addEventListener('submit', agregarComision);

    // Funcion que llena el select en html
    function llenarSelectTipoMoneda() {
        const tipoMoneda = document.querySelector('#tipoMoneda');
        console.log(tipoMoneda)
        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoMoneda.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;
            tipoMoneda.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }

     // Funcion que llena el select en html
     function llenarSelectTipoTransaccion() {
        const tipoTransaccion = document.querySelector('#tipoTransaccion');
        console.log(tipoMoneda)
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

    function agregarComision(e) {
        e.preventDefault();

        const tipoMoneda = document.querySelector('#tipoMoneda').value;
        const tipoTransaccion = document.querySelector('#tipoTransaccion').value;
        const comision = document.querySelector('#comision').value;

        
        
        if (tipoMoneda === '' || tipoTransaccion === '' || comision === '') {
            mostrarMensaje()
        } else {
            console.log(tipoMoneda)
            let data = new FormData(formularioComision);

            console.log(data)

            fetch('http://localhost:3000/agregarComision.php', {
            
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
            setTimeout(() => {
                window.location.href = 'listaComision.html';
            },5000)   
        }
        
        formularioComision.reset();
    }


    function mostrarMensaje() {
        const divMesaje = document.createElement('div');
        divMesaje.classList.add('mensaje');
        divMesaje.textContent = 'Todos los campos son obligatorios';

        formularioComision.insertBefore(divMesaje, document.querySelector('form submit'));

        setTimeout(() => {
            divMesaje.remove()
        }, 4000);
    }
    
})();

