(function() {
    const formulario = document.querySelector('#formularioLogin');
    
    formulario.addEventListener('submit', (e) => {
        
        
            e.preventDefault();
            // const usuario = document.querySelector('#usuario').value;
            // const clave = document.querySelector('#password').value;
            
            let data = new FormData(formulario);
            // data.append('usuario', usuario.value);
            // data.append('clave', clave.value);
    
            console.log(usuario)
                fetch('http://localhost:3000/login.php', {
                
            method: 'POST',
             body: data
            
             })
            .then(response => response.json())
            .then(respuesta => {
                
                alert( respuesta )
            });
        

    })

  
        
        // const usuario = document.querySelector('#usuario').value;
        // const clave = document.querySelector('#password');
          

    


})();