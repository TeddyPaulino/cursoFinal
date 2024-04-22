(function() {
    const formularioMoneda = document.querySelector('#formularioMoneda');

    console.log(formularioMoneda)
    formularioMoneda.addEventListener('submit', agregarMoneda);

    function agregarMoneda(e) {
        e.preventDefault();
        const nombreMoneda = document.querySelector('#nombreMoneda').value;
        const codigoMoneda = document.querySelector('#codigoMoneda').value;
       
        if (nombreMoneda === ''|| codigoMoneda === '') {
            mostrarMensaje();
        } else {
            let data = new FormData(formularioMoneda);

            console.log(data)

            fetch('http://localhost:3000/agregarMoenda.php', {
            
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
                        window.location.href = 'listaTipoMoneda.html';
                    },5000)
                }    
            }) 
                
        }
        
        formularioMoneda.reset();
    }
    function mostrarMensaje() {
        const divMensaje = document.createElement( 'div' );
        divMensaje.classList.add('mensaje');
        divMensaje.textContent = 'Todos los campos son obligatorios';
    
        formularioMoneda.insertBefore(divMensaje, document.querySelector( 'form  submit' ));
    
        setTimeout(() => {
            divMensaje.remove();
        }, 3000)
    }

})();