const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USERNAME,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});

transporter.sendMail({
    from: 'Stamp Shop <marcelodev@gmail.com>',
    to: 'marcelodev@gmail.com', // Sending to yourself to test
    subject: 'OAuth2 Test Works!',
    text: 'If you see this, your Gmail automation is ready!'
}, (err, info) => {
    if (err) console.log('ERROR:', err);
    else console.log('Email sent successfully!', info.response);
});