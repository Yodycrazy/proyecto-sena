document.querySelector('#Formulario').addEventListener('submit', async (event) => {
    event.preventDefault();

    const services = [];
    if (document.querySelector('#Pag').checked) services.push('Creación de sitio web');
    if (document.querySelector('#Conex').checked) services.push('Conectar empresas');
    if (document.querySelector('#Host').checked) services.push('Hosting para páginas');

    const companyName = document.querySelector('input[name="companyName"]').value;
    const contactDate = document.querySelector('input[name="contactDate"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;

    const data = {
        companyName, 
        contactDate: new Date(contactDate).toISOString(), 
        email,
        phoneNumber,
        services
    };

    console.log('Datos a enviar:', data);

    try {
        const response = await fetch('https://backend-sena-afh4d6gud7fnfpem.eastus2-01.azurewebsites.net/servicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            try {
                const result = await response.json(); // Analizar la respuesta solo si es JSON
                console.log('Servicio creado:', result);
                alert('El servicio ha sido agendado. Nos comunicaremos contigo para la asesoría gratuita.');
                window.location.reload();
            } catch (jsonError) {
                console.error('Error al analizar la respuesta JSON:', jsonError);
            }
        } else if (response.status === 401) {
            console.error('Error de autenticación. Verifica las credenciales.');
        } else if (response.status === 403) {
            console.error('No tienes permisos para realizar esta operación.');
        } else if (response.status === 500) {
            console.error('Error en el servidor. Intenta de nuevo más tarde.');
        } else {
            const errorResponse = await response.text(); // Leer el texto de la respuesta
            console.error('Error al enviar los datos:', errorResponse);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        if (error.message.includes('CORS')) {
            alert('Parece que hay un problema con la política CORS. Por favor, contacta al administrador.');
        }
    }
});
