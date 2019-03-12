"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = __importStar(require("nodemailer"));
var Emailer = /** @class */ (function () {
    function Emailer() {
    }
    Emailer.welcomeEmail = function (email, username, emailVerifyToken) {
        console.log('Sending welcome email to ' + email);
        var mailData = {
            to: email,
            from: Emailer.fromEmail,
            subject: 'Welcome to JTI2',
            html: "<p>Welcome to JTI2.  To finish registration please click or paste this link into your browser to complete the process. </p>" +
                "<p><a href='" + process.env.APP_URL + "/verify/" + emailVerifyToken + "'>" + process.env.APP_URL + "/verify/" + emailVerifyToken + "</a> </p>"
        };
        Emailer.send(mailData);
    };
    Emailer.forgotPasswordRequestEmail = function (email, passwordResetToken) {
        console.log('Sending reset password email to ' + email);
        var mailData = {
            to: email,
            from: Emailer.fromEmail,
            subject: 'Reset your JTI2 password',
            html: "<p>We have received your request to reset your password. Please click the link below to complete the reset:</p>" +
                "<p><a href='" + process.env.APP_URL + "/reset/" + passwordResetToken + "'>" + process.env.APP_URL + "/reset/" + passwordResetToken + "</a> </p>"
        };
        Emailer.send(mailData);
    };
    Emailer.passwordResetSuccessEmail = function (email) {
        console.log('Sending reset password email to ' + email);
        var mailData = {
            to: email,
            from: Emailer.fromEmail,
            subject: 'Your JTI2 password has been reset.',
            html: "<p>The password for your account has been successfully reset.  If you didn’t make this change or if you believe an unauthorized person has accessed your account, go to JTI2 to reset your password immediately.</p>" +
                "<br><p>If you need additional help, contact JTI2 support.</p>" +
                "<br><br><p>JTI2 Support</p>"
        };
        Emailer.send(mailData);
    };
    Emailer.inviteEmail = function (email, username, fromUsername, emailVerifyToken, password) {
        console.log('Sending invite email to ' + email);
        var mailData = {
            to: email,
            from: Emailer.fromEmail,
            subject: fromUsername + ' invited you to JTI2',
            html: "<p>Welcome to JTI2.  To finish registration please click or paste this link into your browser to complete the process. </p>" +
                "<p><a href='" + process.env.APP_URL + "/verify/" + emailVerifyToken + "'>" + process.env.APP_URL + "/verify/" + emailVerifyToken + "</a> </p>" +
                "<p>This is your temporary password: " + password + "</p>"
        };
        Emailer.send(mailData);
    };
    Emailer.send = function (mailData) {
        var smtpConfig = {
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        };
        var transporter = nodemailer.createTransport(smtpConfig);
        transporter.sendMail(mailData);
    };
    Emailer.fromEmail = process.env.fromEmail;
    Emailer.fromName = process.env.fromName;
    return Emailer;
}());
exports.Emailer = Emailer;
