const path = require('path');
const mailer = require('../utils/mailer');

var self = module.exports = {
    home : function (req, res) {
        console.log('Home page<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        return res.sendFile(path.join(`${__dirname}/../views/index.html`));
    },
    sendMail : async (req, res) => {
        console.log('Send Email<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        try {
            const { to, subject, body} = {
                to: "danhphan141204@gmail.com",
                subject: "Contact Order",
                body: "<p>One user wants to contact to you: </p> <br> <p>Name: " + req.body.name + "</p> <p>Email: " + req.body.email + "</p>"
            }
    
            await mailer.sendMail(to , subject, body);
            res.send("<h3>You'll be contacted soon!</h3>");
            console.log("Sent!!!");
        } catch (error) {
            console.log("You have error in sending email");
            console.log(error);
            res.send(error);
        }
    }
}