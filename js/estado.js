(function() {
    
    const formularioEstado = document.querySelector('#formularioEstado');
    formularioEstado.addEventListener('submit', agregarEstado);

    
    function agregarEstado(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const descripcion = document.querySelector('#descripcion').value;

        if (nombre === '' || descripcion === '') {
            mostrarMensaje();
        }else {
            let data = new FormData(formularioEstado);

            console.log(data)

            fetch('http://localhost:3000/agregarEstado.php', {
            
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
                window.location.href = 'listaEstado.html';
            },5000)   
        }
        
        formularioEstado.reset();
    }
    
    function mostrarMensaje() {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('mensaje');
        divMensaje.textContent = 'Todos los campos son obligatorios';

        formularioEstado.insertBefore(divMensaje, document.querySelector('form submit'));

        setTimeout(() => {
            divMensaje.remove();
        },4000 )
    }
})();