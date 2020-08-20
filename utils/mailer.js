const nodeMailer = require('nodemailer')

const adminEmail = "kakakakaa772@gmail.com"
const adminPassword = "danhtai123"

const mailHost = 'smtp.gmail.com'
const mailPort = 587

const sendMail = (to, subject, htmlContent) => {
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
            user: adminEmail,
            pass: adminPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const options = {
        from: adminEmail,
        to: to,
        subject: subject,
        html: htmlContent
    }

    return transporter.sendMail(options)
}

module.exports = {
    sendMail: sendMail
}