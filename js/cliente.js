(function() {
    document.addEventListener('DOMContentLoaded', () => {
        llenarSelectTipoDocumento();
     });
   formularioCliente.addEventListener('submit', agregarCliente)
    agregarCliente();

     
     // Funcion que llena el select en html
     function llenarSelectTipoDocumento() {
        const select = document.querySelector('#tipoDocumentCliente');

        console.log(select)

        // Realizar la solicitud para obtener los datos desde PHP
        fetch('http://localhost:3000/selectTipoDatos.php')
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


   function agregarCliente(e) {
    e.preventDefault();
    const nombreInput = document.querySelector("#nombrecliente").value;
    const apellidoInput = document.querySelector("#apellidoCliente").value;
    const dirInpunt = document.querySelector('#direccionCliente').value;
    const telefonoInput = document.querySelector('#telefonoCliente').value;
    const tipoDocInput = document.querySelector('#tipoDocumentCliente').value;
    const cedulaInput = document.querySelector('#cedulaCliente').value;
    const emailInput = document.querySelector('#emailCliente').value;

    if (nombreInput === '' || apellidoInput === '' || dirInpunt === '' || tipoDocInput === '' || cedulaInput === '') {
        
        mostrarMensaje();
    }else {
        let data = new FormData(formularioCliente);

            console.log(data)

            fetch('http://localhost:3000/agregarCliente.php', {
            
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
                        timer: 5000,

                    });
                }    
            })   
        }
        
        formularioCliente.reset();
        setTimeout(() => {
            window.location.href = 'listaCliente.html';
        },5000)
        
    }   
   
   function mostrarMensaje() {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('mensaje');
    divMensaje.textContent = 'Los siguientes campos son obligatorios, Nombre, Apellido,Dirección, Tipo Documento, Cedula...'
    
    formularioCliente.insertBefore(divMensaje, document.querySelector('form submit'));
    setTimeout(() => {
        divMensaje.remove();
    },4000 )
     
   }

   function LimpiarHTML() {
    while (divMensaje.firstChild) {
        divMensaje.removeChild(divMensaje.firstChild);

        
    }
   }
})();