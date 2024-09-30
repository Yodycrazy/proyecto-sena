// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/registro', (req, res) => {
    const { Nombre_Empresa, Fecha, Email, Numero_Tel, Tipo_Serv } = req.body;

    // Configura el transportador de correo electrónico
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tu-correo@gmail.com',
            pass: 'tu-contraseña'
        }
    });

    const mailOptions = {
        from: 'tu-correo@gmail.com',
        to: Email,
        subject: 'Confirmación de Registro',
        text: `Hola,\n\nHemos recibido tu solicitud para los siguientes servicios: ${Tipo_Serv.join(', ')}.\n\nTe contactaremos en la fecha que solicitaste: ${Fecha}.\n\nSaludos,\nEl equipo`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar correo:', error);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
