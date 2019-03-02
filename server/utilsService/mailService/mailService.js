"use strict";
const mailer = require("nodemailer");
const welcomeTemplate = require('./welcome_template');
const purchaseTemplate = require('./purchase_template');
const resetPass = require('./resetpass_template');
const utilsConstant = require('../utilsConstant');

require('dotenv').config();

const getMailData = (to, type, data=null) => {

    var mailOptions = {
        from: `Waves Guitar <${process.env.SERVER_MAIL_ID}>`, // sender address
        to, // list of receivers
    }

    switch(type) {
        case utilsConstant.WELCOME_MAIL:
            return {
                ...mailOptions,
                subject: 'Welcome to Waves',
                html: welcomeTemplate()
            }
        case utilsConstant.PURCHASE_MAIL:
            return {
                ...mailOptions,
                subject: 'Thank you for shopping with Waves',
                html: purchaseTemplate(data),
            }
        case utilsConstant.RESET_PASSWORD:
            return {
                ...mailOptions,
                subject: 'Reset You Password',
                html: resetPass(data),
            }
        default:
            return {
                ...mailOptions
            }
    } 
}

const sendMail = (to, type, history=[]) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = mailer.createTransport({
        service:"Gmail",
        auth:{
            user: process.env.SERVER_MAIL_ID,
            pass: process.env.SERVER_MAIL_PASSWORD
        }
    });

    // create mail data
    const mailData = getMailData(to, type, history);

    // send the email
    transporter.sendMail(mailData,(error, res) => {
        if (error) {
            console.log("Error in mail sending",error);
        } else {
            console.log("Mail sent successfully");
        }
    })
}

module.exports = sendMail ;

// setup email data with unicode symbols
// let mailOptions = {
//     from: `Waves Guitar <${process.env.SERVER_MAIL_ID}>`, // sender address
//     to: "seannguyen5696@gmail.com", // list of receivers
//     subject: "Welcome", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>" // html body
// };

// let info = transporter.sendMail(mailOptions,(error, res) => {
//     if (error) {
//         console.log("Error in mail sending",error);
//     } else {
//         console.log("Mail sent successfully");
//     }
// })