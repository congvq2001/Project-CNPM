import { handleAsync } from "../utils/handleAsync";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Token } from "../models/token";



export const handleForgotPasswor = handleAsync(async (req, res) => {
    const email = req.body.email;

    // TODO: Check if the email is registered in the database
    // If the email is not registered, return an error response

    // Generate a password reset token
    try {

        const secretKey = 'mysecretkey';
        const jtoken = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

        const token = new Token({
            email: email,
            token: jtoken
        })
        await token.save()
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'phongtintruong@gmail.com', // Replace with your email address
                pass: 'tfnbdyqtojiotcup' // Replace with your email password
            }
        });
        const resetLink = `http://localhost:5000/api/v1/forgot-password?token=${jtoken}`;
        const mailOptions = {
            from: 'phongtintruong@gmail.com', // Replace with your email address
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Click this link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'If the provided email address is registered, a password reset link has been sent to the email.' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending password reset email.' });
        }
    }
    catch (e) {
        console.log(e);
    }
    // Store the token in the database
    // Send an email to the user with a link to reset their password

});

export const handleForgotPassworGet = handleAsync(async (req, res) => {
    const token = req.query.token;

    try {
        const secretKey = 'mysecretkey';
        const decoded = jwt.verify(token, secretKey);
        const email = decoded.email;
        const ltoken = await Token.findOne({ email: { $eq: email } })
        console.log(ltoken.email)
        if (!ltoken.email || ltoken.token !== token) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        Token.deleteOne({ _id: ltoken._id }, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Token deleted successfully');
            }
        });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'phongtintruong@gmail.com', // Replace with your email address
                pass: 'tfnbdyqtojiotcup' // Replace with your email password
            }
        });
        const mailOptions = {
            from: 'phongtintruong@gmail.com', // Replace with your email address
            to: email,
            subject: 'Password Reset Done',
            html: `done`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'If the provided email address is registered, a password reset link has been sent to the email.' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending password reset email.' });
        }

        // // TODO: Allow the user to reset their password

        // // Delete the token from the database
        // delete passwordResetTokens[email];
    }

    catch (e) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
})