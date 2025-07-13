const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Configura tu cuenta de correo aquí
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'josuepech015@gmail.com', // Cambia por tu correo real
    pass: 'zndviixsceufpykr',          // Ver explicación abajo
  },
});

app.post('/api/send-mail', async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  const mailOptions = {
    from: '"Formulario Web" <josuepech015@gmail.com>',
    to: correo, // El destinatario es el que el usuario puso en el formulario
    subject: 'Nuevo mensaje para ti',
    text: `
      Hola ${nombre},

      Has recibido un mensaje a través del formulario:

      ${mensaje}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ ok: true, message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ ok: false, message: 'Error enviando correo' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de correo escuchando en http://localhost:${PORT}`);
});