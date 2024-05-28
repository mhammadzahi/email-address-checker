const nodemailer = require('nodemailer');

async function validateMailbox(email) {
    
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com', // Replace with your SMTP server details
            port: 587,
            secure: false, // Set to true for SSL/TLS
        });

        const info = await transporter.verify();
        if(info.success) {
            console.log(`Mailbox exists for ${email}`);
            return true;
        }
        else {
            console.log(`Mailbox does not exist for ${email}`);
            return false;
        }
}

validateMailbox('mohamedzahi33@gmail.com');
