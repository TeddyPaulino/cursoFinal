(function() {
    document.addEventListener('DOMContentLoaded', () => {
        llenarSelectRol();

     });
     const formularioUsuario = document.querySelector('#formularioUsuario');
     formularioUsuario.addEventListener('submit', agregarUsuario);
     // Funcion que llena el select en Rol
    function llenarSelectRol() {
        const select = document.querySelector('#selectRol');

        console.log(select)

        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectRol.php')
        .then(response => response.json())
        .then(respuesta => {
            // Agregar cada opción al select
            respuesta.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.nombre;
            select.appendChild(optionElement);
        });
        })
        // .catch(error => console.error('Error:', error));
    }

    function agregarUsuario(e) {
        e.preventDefault();
        
        const nombreUsuario = document.querySelector('#nombre').value;
        const apellidoUsuario = document.querySelector('#apellidoUsuario').value;
        const correoUsuario = document.querySelector('#correoUsuario').value;
        const usuario = document.querySelector('#usuario').value;
        const claveUsuario = document.querySelector('#passwordUsuario').value;
        const rolUsuario = document.querySelector('#selectRol').value;

        if (nombreUsuario === '' || apellidoUsuario === '' || correoUsuario === '' || usuario === '' || claveUsuario === '' || rolUsuario === '') {
            mostrarMensaje();
        } else {
            let data = new FormData(formularioUsuario);

            console.log(data)

            fetch('http://localhost:3000/agregarUsuario.php', {
            
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
            formularioUsuario.reset();
        }

        function mostrarMensaje() {
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('mensaje');
            divMensaje.textContent = 'Todos los campos son obligatorios';

            formularioUsuario.insertBefore(divMensaje, document.querySelector('form submit'));
            
            setTimeout(() => {
                divMensaje.remove();
            },4000 )
        }
        
    }
})();