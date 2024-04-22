(function() {
    const formulario = document.querySelector('#formulario');

    formulario.addEventListener('submit', agregarDocumento);

    function agregarDocumento(e) {
        e.preventDefault();
        const nombreDocumento = document.querySelector('#nombre').value;
       
        if (nombreDocumento === '') {
            mostrarMensaje();
        } else {
            let data = new FormData(formulario);

            console.log(data)

            fetch('http://localhost:3000/agregarTipoDocumento.php', {
            
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
                        timer: 5000
                    });
                    setTimeout(() => {
                        window.location.href = 'listaDocumento.html';
                    },5000) 
                }    
            })    
        }
        
        formulario.reset();
    }

    function mostrarMensaje() {
        const divMensaje = document.createElement( 'div' );
        divMensaje.classList.add('mensaje');
        divMensaje.textContent = 'El campo no puede estar en blanco';
    
        formulario.insertBefore(divMensaje, document.querySelector( 'form  submit' ));
    
        setTimeout(() => {
            divMensaje.remove();
        }, 3000)
    }


})();