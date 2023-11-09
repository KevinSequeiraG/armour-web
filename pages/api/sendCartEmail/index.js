import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kevinrdoitxr@gmail.com', // Tu correo de Gmail
        pass: process.env.EMAIL_API_PASSWORD, // Tu contraseña de Gmail
    },
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { emailToRecieve, subject, content } = req.body;

        try {
            // Enviar el correo electrónico
            await transporter.sendMail({
                from: "armourwebsoporte@gmail.com",
                to: emailToRecieve,
                subject: subject,
                html: content
            });

            res.status(200).json({ message: 'Correo electrónico enviado con éxito' });
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            res.status(500).json({ error: 'Error al enviar el correo electrónico' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
