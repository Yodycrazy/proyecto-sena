document.querySelector('#Formulario').addEventListener('submit', async (event) => {
    event.preventDefault();

    const services = [];
    if (document.querySelector('#Pag').checked) services.push('Creación de sitio web');
    if (document.querySelector('#Conex').checked) services.push('Conectar empresas');
    if (document.querySelector('#Host').checked) services.push('Hosting para páginas');

    // Captura de datos
    const companyName = document.querySelector('input[name="companyName"]').value;
    const contactDate = document.querySelector('input[name="contactDate"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
    
    /* const notificacion = document.getElementById('notificaciones'); */
    
    const data = {
        companyName, 
        contactDate: new Date(contactDate).toISOString(), 
        email,
        phoneNumber,
        services
    };

    console.log('Datos a enviar:', data);

    try {
        const response = await fetch('http://localhost:10000/servicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Servicio creado:', result);
            alert('Formulario enviado con exito, Hemos recibido su solicitud y en breve le atenderemos');
            //refresh de la pagina o del formulario
/*          notificacion.classList.remove('hidden');
 */        } else {
            const errorResponse = await response.text();
            console.error('Error al enviar los datos:', errorResponse);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});
