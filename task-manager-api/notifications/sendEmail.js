const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
     const msg = {
          to,
          from: 'your-email@example.com',
          subject,
          text,
     };

     try {
          await sgMail.send(msg);
          console.log('Email sent successfully');
     } catch (error) {
          console.error('Error sending email:', error);
     }
};

module.exports = sendEmail;
