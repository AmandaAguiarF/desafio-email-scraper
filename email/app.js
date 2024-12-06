const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = (subject, text) => {
  console.log("Iniciando envio de e-mail...");

  // Criação do transportador
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",        
    port: 587,                     
    secure: false,                 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


  // Definindo as opções de e-mail
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: subject,
    text: text,
  };

  // Envio do e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erro ao enviar o e-mail: ', error);
    } else {
      console.log('E-mail enviado: ' + info.response);
    }
  });
};

// Exporta a função sendEmail para ser usada em outros arquivos
module.exports = sendEmail;

