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
                to: "trannguyensinh2004@gmail.com",
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

        // method === 'POST'
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
    },
    login: async (req, res) => {
        if (req.session.user) return res.redirect(`/profile?id=${req.session.user._id}`);

        if (req.method === "GET") {
            console.log('Login<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            return res.sendFile(path.join(`${__dirname}/../views/login.html`));
        }

        // method === 'POST'
        const obj = {
            username: req.body.username,
            password: md5(req.body.password)
        }
        
        let correct = await user.findOne(obj);
        if (correct) {
            //store information of user
            req.session.user = {
                _id: correct._id,
                username: correct.username
            }
            console.log('Login Done');
            return res.redirect(`/profile?id=${correct._id}`);
        }

        alert('Wrong password or username');
        console.log('Login Failed');
        res.redirect('/login');
    },
    profile: (req, res) => {
        console.log('Profile<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        if (req.session.user.username === 'Admin') res.send('Admin Panel');
        else res.sendFile(path.join(`${__dirname}/../views/user.html`));
    },
    update: async (req, res) => {
        if (req.method === 'GET') {
            console.log('Edit Profile<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            return res.sendFile(path.join(`${__dirname}/../views/changeprofile.html`));
        }

        try {
            const filter = req.session.user;
            var updateObj = {
                job : req.body.job,
                email : req.body.email,
                phone : req.body.phone,
                address : req.body.address,
            }
            let doc = await user.findOneAndUpdate(filter, {$set: updateObj}, {new: true});
            console.log('Update Successfully!');
        } catch (error) {
            console.log('Update Failed.');
            alert('Update Failed');
        }
        res.redirect(`/profile?id=${req.session.user._id}`);
    },
    logout: (req, res, next) => {
        console.log('Logout<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        if (req.session) {
            req.session.destroy((err) => {
                if (err) return next(err);
                console.log('Logout Complete');
            })
        }
        res.redirect('/');
    },
    delete: async (req, res) => {
        if (req.method === 'GET') return res.send('Delete_User Page');

        // method === 'POST'
        const filter = {
            username: req.body.username
        }
        try {
            await user.deleteOne(filter);
            console.log('Successful Deletion');
            alert(`You've deleted user: ${filter.username}`);
        } catch (error) {
            console.log('Fail Deletion. ' + error);
            alert('Delete Failed');
        }
        res.redirect('/deleteAccount');
    }
}