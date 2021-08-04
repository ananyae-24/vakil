const nodemailer = require("nodemailer");
const pug = require("pug");
const htmttotext = require("html-to-text");

module.exports = class Email {
  constructor(user, url, password) {
    this.from = "vakillab2021@gmail.com";
    this.to = user.email;
    this.url = url;
    this.name = user.name;
    this.password = password;
  }
  createTransporter() {
    return nodemailer.createTransport(
      //   {
      //     host: process.env.EMAIL_HOST,
      //     port: process.env._PORT,
      //     auth: {
      //       user: process.env.EMAIL_USERNAME,
      //       pass: process.env.EMAIL_PASSWORD,
      //     },
      //   }
      {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD,
        },
      }
    );
  }
  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        name: this.name,
        url: this.url,
        subject,
        password: this.password,
      }
    );

    const option = {
      from: this.from,
      to: this.to,
      subject: subject,
      text: htmttotext.fromString(html),
      html,
    };
    await this.createTransporter().sendMail(option);
  }
  async welcomemail() {
    await this.send("signup", "Your OTP to activate your account");
  }
  async forgetpassword() {
    await this.send("forgetpassword", "Your OTP for password change");
  }
};
