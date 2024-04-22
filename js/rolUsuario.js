(function() {
    
    const formularioRol = document.querySelector('#formularioUsuario');
    formularioRol.addEventListener('submit', agregarRol);

    
    function agregarRol(e) {
        e.preventDefault();

        const nombreRol = document.querySelector('#usuario').value;
        const descripcion = document.querySelector('#descripcion').value;

        

        if (nombreRol === '' || descripcion === '') {
            mostrarMensaje();
        }else {
            let data = new FormData(formularioRol);

            console.log(data)

            fetch('http://localhost:3000/agregarRol.php', {
            
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
                window.location.href = 'listaUsuario.html';
            },5000)   
        }
        
        formularioRol.reset();
        
    }
    
    function mostrarMensaje() {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('mensaje');
        divMensaje.textContent = 'Todos los campos son obligatorios';

        formularioRol.insertBefore(divMensaje, document.querySelector('form submit'));

        setTimeout(() => {
            divMensaje.remove();
        },4000 )
    }
})();