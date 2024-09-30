document.getElementById('Formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const formData = new FormData(this);

    fetch('http://localhost:3000/api/registro', { // Cambia esta URL por la URL de tu servidor
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('¡Gracias por tu registro! Hemos recibido tus datos y te enviaremos una confirmación por correo electrónico.');
            document.getElementById('Formulario').reset(); // Opcional: Limpiar el formulario
        } else {
            alert('Hubo un error. Por favor, intenta de nuevo.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error en el envío. Por favor, intenta de nuevo.');
    });
});
