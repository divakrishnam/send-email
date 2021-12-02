const nodemailer = require('nodemailer');
const mailjet = require('node-mailjet').connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

const sendEmailNodemailer = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'cecelia.terry42@ethereal.email',
      pass: 'YsD6SDxk7G3hYmbQuX',
    },
  });

  let info = await transporter.sendMail({
    from: '"Bli Dev Code" <blidevcode@gmail.com>',
    to: 'divakrishna55@gmail.com',
    subject: 'Hello',
    html: '<h2>Sending Emails with Node.JS</h2>',
  });

  res.json(info);
};

const sendEmail = async (req, res) => {
  const request = await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'blidevcode@gmail.com',
          Name: 'Bli Dev Code',
        },
        To: [
          {
            Email: 'divakrishna55@gmail.com',
            Name: 'Diva',
          },
        ],
        Subject: 'Greetings from Mailjet.',
        TextPart: 'My first Mailjet email',
        HTMLPart:
          "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
        CustomID: 'AppGettingStartedTest',
      },
    ],
  });
  res.json(request.body);
};

module.exports = sendEmail;
