import * as nodemailer from 'nodemailer'

export class Emailer {
    
    static fromEmail = process.env.fromEmail;
    static fromName = process.env.fromName;


    static welcomeEmail(email: string, username: string, emailVerifyToken: string) {
        console.log('Sending welcome email to ' + email)

        const mailData = {
            to: email,
            from: Emailer.fromEmail,
            subject: 'Welcome to JTI2',
            html: "<p>Welcome to JTI2.  To finish registration please click or paste this link into your browser to complete the process. </p>" +
                  "<p><a href='" + process.env.APP_URL + "/verify/" + emailVerifyToken + "'>" + process.env.APP_URL + "/verify/" + emailVerifyToken + "</a> </p>"
        };

        Emailer.send(mailData)
    }





    static forgotPasswordRequestEmail(email: string, passwordResetToken: string) {
        console.log('Sending reset password email to ' + email)

        const mailData = {
            to: email,
            from: Emailer.fromEmail,
            subject: 'Reset your JTI2 password',
            html: "<p>We have received your request to reset your password. Please click the link below to complete the reset:</p>" +
                  "<p><a href='" + process.env.APP_URL + "/reset/" + passwordResetToken + "'>" + process.env.APP_URL + "/reset/" + passwordResetToken + "</a> </p>"
        };

        Emailer.send(mailData)
    }





    static passwordResetSuccessEmail(email: string) {
        console.log('Sending reset password email to ' + email)

        const mailData = {
            to: email,
            from: Emailer.fromEmail,
            subject: 'Your JTI2 password has been reset.',
            html: "<p>The password for your account has been successfully reset.  If you didn’t make this change or if you believe an unauthorized person has accessed your account, go to JTI2 to reset your password immediately.</p>" +
                  "<br><p>If you need additional help, contact JTI2 support.</p>" +
                  "<br><br><p>JTI2 Support</p>"
        };

        Emailer.send(mailData)
    }


    
    static inviteEmail(email: string, username: string, fromUsername: string, emailVerifyToken: string, password: string) {

        console.log('Sending invite email to ' + email)

        const mailData = {
            to: email,
            from: Emailer.fromEmail,
            subject: fromUsername + ' invited you to JTI2',
            html: "<p>Welcome to JTI2.  To finish registration please click or paste this link into your browser to complete the process. </p>" +
                  "<p><a href='" + process.env.APP_URL + "/verify/" + emailVerifyToken + "'>" + process.env.APP_URL + "/verify/" + emailVerifyToken + "</a> </p>" +
                  "<p>This is your temporary password: " + password + "</p>"
        };

        Emailer.send(mailData)
    }



    static send(mailData: any) {
        let smtpConfig = {
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        }

        let transporter = nodemailer.createTransport(smtpConfig)

        transporter.sendMail(mailData)
    }
}
