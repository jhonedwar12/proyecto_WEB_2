import { createTransport } from 'nodemailer';

class EmailSender {
  constructor() {
    // Configuración del transporte (en este caso, usando Gmail como ejemplo)
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'jhon.morales39079@ucaldas.edu.co', // Tu correo de Gmail
        pass: 'morales20@@'        // Tu contraseña de Gmail
      }
    });
  }

  // Método para enviar el correo
  async sendEmail(to, subject, text) {
    try {
      const mailOptions = {
        from: 'jhon.morales39079@ucaldas.edu.co', // Tu correo de Gmail
        to: to,                      // Destinatario
        subject: subject,            // Asunto del correo
        text: text                   // Cuerpo del correo
      };

      // Enviar el correo
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado: ' + info.response);
    } catch (error) {
      console.error('Error al enviar el correo: ', error);
    }
  }
}


export default EmailSender;


