(function() {
    document.addEventListener('DOMContentLoaded', () => {
        llenarSelectRol();

     });
     const formularioUsuario = document.querySelector('#formularioUsuario');
     formularioUsuario.addEventListener('submit', agregarUsuario)
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
        
    }
})();