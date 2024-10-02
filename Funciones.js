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

    // Verifica si los valores están capturando correctamente
    console.log('companyName:', companyName);
    console.log('contactDate:', contactDate);
    console.log('email:', email);
    console.log('phoneNumber:', phoneNumber);
    console.log('services:', services);

    const data = {
        companyName, // Asegúrate de que este valor no sea undefined
        contactDate: new Date(contactDate).toISOString(), // Formatea la fecha
        email,
        phoneNumber,
        services
    };

    console.log('Datos a enviar:', data); // Muestra los datos que se enviarán

    try {
        const response = await fetch('http://localhost:10000/servicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Servicio creado:', result);
        } else {
            const errorResponse = await response.text();
            console.error('Error al enviar los datos:', errorResponse);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});
