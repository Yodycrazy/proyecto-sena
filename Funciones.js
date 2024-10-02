document.querySelector('Formulario').addEventListener('submit', async (event) => {
    console.log('Evento submit ejecutado');
    event.preventDefault();
  
    // Recolectar los datos del formulario
    const services = [];
    if (document.querySelector('#Pag').checked) services.push('Creación de sitio web');
    if (document.querySelector('#Conex').checked) services.push('Conectar empresas');
    if (document.querySelector('#Host').checked) services.push('Hosting para páginas');
  
      // Obtener y formatear la fecha
    const contactDateInput = document.querySelector('input[name="contactDate"]').value;
    const contactDate = new Date(contactDateInput).toISOString().split('T')[0];

    const data = {
      companyName: document.querySelector('input[name="companyName"]').value,
      contactDate: document.querySelector('input[name="contactDate"]').value,
      email: document.querySelector('input[name="email"]').value,
      phoneNumber: document.querySelector('input[name="phoneNumber"]').value,
      services
    };

    console.log('Datos a enviar:', data);
  
    try {
      // Enviar los datos al backend
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
      } else {
        const errorResponse = await response.text();
        console.error('Error al enviar los datos:', errorResponse);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
});
