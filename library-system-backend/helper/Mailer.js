const nodemailer = require("nodemailer");
// var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require("handlebars");
var fs = require("fs");
const path = require("path");
const moment = require("moment");

const sendEmailResetLink = async (reciever, sender, subject, user, link) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "", // generated ethereal user
      pass: "", // generated ethereal password
    },
  });
  try {
    let html = await readHTMLFile(
      path.join(__dirname, "..", "/config/emailtemplate/PassReset.html")
    );
    let template = handlebars.compile(html);
    let replacements = {
      firstname: user.firstname,
      lastname: user.lastname,
      middlename: user.middlename,
      link,
    };
    let htmlToSend = template(replacements);

    let info = await transporter.sendMail({
      from: `Library System - ${sender}`, // sender address
      to: reciever, // list of receivers
      subject: subject, // Subject line

      html: htmlToSend, // html body
    });

    // console.log("Message sent: %s", info.messageId);

    if (info && info?.messageId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const sendEmailLoanNotif = async (
  reciever,
  sender,
  subject,
  user,
  book,
  loandate
) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "", // generated ethereal user
      pass: "", // generated ethereal password
    },
  });
  try {
    let html = await readHTMLFile(
      path.join(__dirname, "..", "/config/emailtemplate/ReturnNotif.html")
    );
    let template = handlebars.compile(html);
    let replacements = {
      firstname: user.firstname,
      lastname: user.lastname,
      middlename: user.middlename,

      title: book.title,
      author: book.author,
      isbn: book.isbn,

      returndate: loandate.returndate,
      duedate: loandate.duedate,
      issuedate: loandate.issuedate,
    };
    let htmlToSend = template(replacements);

    let info = await transporter.sendMail({
      from: `Library System - ${sender}`, // sender address
      to: reciever, // list of receivers
      subject: subject, // Subject line

      attachments: [
        {
          filename: "h1.gif",
          path: path.join(__dirname, "..", "/public/images/h1.gif"),
          cid: "img_h1",
        },
        {
          filename: "fb.gif",
          path: path.join(__dirname, "..", "/public/images/fb.gif"),
          cid: "img_fb",
        },
        {
          filename: "left.gif",
          path: path.join(__dirname, "..", "/public/images/left.gif"),
          cid: "img_left",
        },
        {
          filename: "right.gif",
          path: path.join(__dirname, "..", "/public/images/right.gif"),
          cid: "img_right",
        },
        {
          filename: "tw.gif",
          path: path.join(__dirname, "..", "/public/images/tw.gif"),
          cid: "img_tw",
        },
      ],

      html: htmlToSend, // html body
    });

    if (info && info?.messageId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const sendEmailRegister = async (reciever, sender, subject, user, pass) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    // host: "smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: "",
    //   pass: "",
    // },
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "", // generated ethereal user
      pass: "", // generated ethereal password
    },
  });

  try {
    let html = await readHTMLFile(
      path.join(__dirname, "..", "/config/emailtemplate/Register.html")
    );
    let template = handlebars.compile(html);
    let replacements = {
      firstname: user.firstname,
      lastname: user.lastname,
      middlename: user.middlename,
      phone: user.details.phone,
      email: user.email,
      password: pass,
    };
    let htmlToSend = template(replacements);

    let info = await transporter.sendMail({
      from: `Library System - ${sender}`, // sender address
      to: reciever, // list of receivers
      subject: subject, // Subject line

      attachments: [
        {
          filename: "h1.gif",
          path: path.join(__dirname, "..", "/public/images/h1.gif"),
          cid: "img_h1",
        },
        {
          filename: "fb.gif",
          path: path.join(__dirname, "..", "/public/images/fb.gif"),
          cid: "img_fb",
        },
        {
          filename: "left.gif",
          path: path.join(__dirname, "..", "/public/images/left.gif"),
          cid: "img_left",
        },
        {
          filename: "right.gif",
          path: path.join(__dirname, "..", "/public/images/right.gif"),
          cid: "img_right",
        },
        {
          filename: "tw.gif",
          path: path.join(__dirname, "..", "/public/images/tw.gif"),
          cid: "img_tw",
        },
      ],

      html: htmlToSend, // html body
    });

    // console.log("Message sent: %s", info.messageId);

    if (info && info?.messageId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const readHTMLFile = (path) => {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
      if (err) {
        reject(err);
        //  throw err;
      } else {
        resolve(html);
      }
    });
  });
};

module.exports = {
  sendEmailRegister,
  sendEmailLoanNotif,
  sendEmailResetLink,
};
