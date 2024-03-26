(function() {
   formularioCliente.addEventListener('submit', agregarCliente)
    agregarCliente();

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
        console.log('Todos los campos estan')
    }   
   }

   function mostrarMensaje() {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('mensaje');
    divMensaje.textContent = 'Los siguientes campos son obligatorios, Nombre, Apellido,Dirección, Tipo Documento, Cedula...'
    
    formularioCliente.insertBefore(divMensaje, document.querySelector('form submit'));
    setTimeout(() => {
        divMensaje.remove();
    },6000 )
     
   }

   function LimpiarHTML() {
    while (divMensaje.firstChild) {
        divMensaje.removeChild(divMensaje.firstChild);

        
    }
   }
})();