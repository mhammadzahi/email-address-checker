
// 3rd function: Check SMTP connectivity
const nodemailer = require("nodemailer");
async function checkSMTP(email) {
    const domain = email.split("@")[1];//   ??
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: "mohamedzahi33@gmail.com",
            pass: "x2Qt4V9WcRZUJvKE",
        },
    });

    try {
        await transporter.verify();
        return true;
    } catch (error) {
        return false;
    }
}
//-------Example--usage-----
const emailToValidate = "test@email.com";

(async () => {
    const isValid = validateEmail(emailToValidate);
    if (!isValid) {
        console.log(`"${emailToValidate}" is not a valid email address.`);
        return;
    }

    const domain = emailToValidate.split("@")[1];
    const hasValidDNS = await checkDNS(domain);
    const hasValidSMTP = await checkSMTP(emailToValidate);

    if(hasValidDNS && hasValidSMTP) {
        console.log(`"${emailToValidate}" is a valid email address.`);
    }
})();

