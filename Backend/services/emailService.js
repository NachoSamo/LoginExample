const nodeMailer = require('nodemailer');

//configuración del transporte de nodemailer

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Esto es necesario si estás usando un certificado autofirmado
    }
});

//funcion para enviar el correo electrónico de reset de contraseña
const sendPasswordResetEmail = async (to, code) => {
    try {
        const mailOptions = {
            from: `"Your LoginApp" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: 'Password Reset',
            html: `
            <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
                <h2>Password Recovery</h2>
                <p>You have requested to reset your password. Use the following code to continue:</p>
                <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; background-color: #f2f2f2; padding: 10px; border-radius: 5px;">
                ${code}
                </p>
                <p>This code will expire in 10 minutes.</p>
                <p>If you did not request this, you can ignore this email.</p>
            </div>
            `,
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:',to);
        return true;

    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = {
    sendPasswordResetEmail};