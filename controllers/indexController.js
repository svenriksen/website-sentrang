const path = require('path');
const mailer = require('../utils/mailer');
const md5 = require('md5');
const user = require('../utils/user');
const alert = require('alert');

var self = module.exports = {
    home : (req, res) => {
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
    },
    register: async (req, res) => {
        if (req.method === "GET") {
            console.log('Register<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            return res.sendFile(path.join(`${__dirname}/../views/register.html`));
        }

        if (req.method === 'POST') {
            try {
                const obj = {
                    username: req.body.username,
                    firstname: req.body.firstname,
                    familyname: req.body.familyname,
                    email: req.body.email,
                    password: md5(req.body.password)
                }
                
                await user.create(obj);
                console.log('Register Successfully');
                res.redirect('/login');
            } catch (error) {
                alert('Someone has used this username');
                console.log('Register Failed');
                res.redirect('/register');
            }
        }
    },
    login: async (req, res) => {
        if (req.method === "GET") {
            console.log('Login<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            return res.sendFile(path.join(`${__dirname}/../views/login.html`));
        }

        if (req.method === 'POST') {
            const obj = {
                username: req.body.username,
                password: md5(req.body.password)
            }
            
            let correct = await user.findOne(obj);
            if (correct) {
                console.log('Login Done');
                return res.send('<h3>Login Successfully</h3>');
            }

            alert('Wrong password or username');
            console.log('Login Failed');
            return res.redirect('/login');
        }
    }
}