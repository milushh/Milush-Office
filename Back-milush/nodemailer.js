const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
    user: 'samanta57@ethereal.email',
    pass: 'qe7Ttm74S2Z59WUv4N'
    }
   });

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Email sent: ", info);
      return console.log(err);
    }
  });
};

module.exports = mailer;