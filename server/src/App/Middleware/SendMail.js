
const nodemailer = require('nodemailer');
require('dotenv').config();

SendMailOgani = async (accountTo,Content) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'nguyenvanvanbh1991@gmail.com',
            pass: '',
        },
    });
    let info = await transporter.sendMail({
        from: '"Password Change Notification " <nguyenvanvanbh1991@gmail.com>', // sender address
        to:accountTo, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: Content, // html body
    });
}


module.exports = SendMailOgani