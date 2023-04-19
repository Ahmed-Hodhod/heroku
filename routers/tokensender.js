const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.USER,
		pass: process.env.PASS
	}
});

const token = jwt.sign({
		data: 'Token Data' 
	}, 'ourSecretKey', { expiresIn: '100m' }
);	


const verifyEmail = async (email) => {
	const mailConfigurations = {

		// It should be a string of sender/server email
		to: email,
	
		// Subject of Email
		subject: 'Email Verification',
		
		// This would be the text of email body
		text: `Hi! There, You have recently visited
			our website and entered your email.
			Please follow the given link to verify your email
			http://localhost:3000/users/verify/${token}
			Thanks`
		
	};
	
	transporter.sendMail(mailConfigurations, function(error, info){
		if (error) throw Error(error);
		console.log('Email Sent Successfully');
		console.log(info);
	});
	
}
module.exports = verifyEmail