
const nodemailer = require('nodemailer');
require('dotenv').config();

SendMailOgani = async (accountTo, Content, subject ="Ogani Notification!",textContent = "Thank you for using our service <3") => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',//smtp.gmail.com  //in place of service use host...
        secure: false,//true
        port: 25,//465
        auth: {
            user: 'nguyenvanvanbh1991@gmail.com',
            pass: process.env.PASSWORD_EMAIL,
        },
        tls: {
            rejectUnauthorized: false
          }
    });
    let info = await transporter.sendMail({
        from: '"Ecommerce Blockchain - Ogani " <nguyenvanvanbh1991@gmail.com>', // sender address
        to:accountTo, // list of receivers
        subject:subject, // Subject line
        text: textContent, // plain text body
        html: Content, // html body
    });
}


module.exports = SendMailOgani