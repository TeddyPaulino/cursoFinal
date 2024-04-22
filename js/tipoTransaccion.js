(function() {
    const formularioTipoTransaccion = document.querySelector('#formularioTipoTransaccion');

    formularioTipoTransaccion.addEventListener('submit',agregarTipoTransaccion);

    function agregarTipoTransaccion(e) {
        e.preventDefault();
        const tipoTransaccion = document.querySelector('#tipoTransaccion').value;

        console.log(tipoTransaccion)
        const descripcion = document.querySelector('#descripcionTipoTransaccion').value;

        console.log(descripcion)
       
        if (tipoTransaccion === ''|| descripcion === '' ) {
            mostrarMensaje();
        } else {
            let data = new FormData(formularioTipoTransaccion);

            console.log(data)

            fetch('http://localhost:3000/agregarTipoTransaccion.php', {
            
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
                        window.location.href = 'listaTipoTransaccion.html';
                    },5000) 
                }    
            })    
        }
        formularioTipoTransaccion.reset();
    }

    function mostrarMensaje() {
        const divMensaje = document.createElement( 'div' );
        divMensaje.classList.add('mensaje');
        divMensaje.textContent = 'Todos los campos son obligatorios';
    
        formularioTipoTransaccion.insertBefore(divMensaje, document.querySelector( 'form  submit' ));
    
        setTimeout(() => {
            divMensaje.remove();
        }, 3000)
    }
  
})();