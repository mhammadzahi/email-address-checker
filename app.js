const validator = require("email-validator");
const dns = require('dns');
const fs = require('fs').promises;
const fs2 = require('fs');

let i = 1;

async function readEmailsFromFile(fileName){
    const data = await fs.readFile(fileName, 'utf8');
    const emailsArray = data.split('\n').map(email => email.trim());
    const validEmailsArray = emailsArray.filter(email => email !== '');
    return validEmailsArray;
}

const blackListedDomains = ['yourmail.com', 'mysite.com', 'miramar-uae.com', 'icloud.com', 'host.com', 'website.com', 'domaine.com', 'sentry.io', 'yoursite.com', 'address.com', 'google.com', 'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'domain.com', 'mail.com', 'email.com', 'example.com'];
//const blackListedExtensions = ['in', 'pk', 'lk', 'np'];

async function checkDNS(domain){// also check if start with '%'
    return new Promise((resolve, reject) => {
        dns.resolveMx(domain, (err, addresses) => {
            if(err || blackListedDomains.includes(domain)){
                //console.log(domain);
                resolve(false);
            }
            else
                resolve(addresses.length > 0);
        });
    });
}

async function validateEmail(email){
    if(email.startsWith('%') || email.startsWith('+') || email.endsWith('.in')){
        return false;
    }
    else{
        if(validator.validate(email)){
            validDomain = await checkDNS(email.split("@")[1]);
            return validDomain;
        }
        else{
            return false;
        }
    }

}

async function validateAllEmails(emailsListFile){
    var valids = [];
    var inValids = [];
    var emailsList = await readEmailsFromFile(emailsListFile);

    for(const email of emailsList){
        const isValid = await validateEmail(email);
        if(isValid){
            valids.push(email);
        }
        else
            inValids.push(email);


        console.log(i);
        i = i + 1;
    }

    return valids;
}

//call main
(async () => {
    input = '__uae__best__.txt'
    output = 'checked__' + input
    validateAllEmails(input).then(validEmails => {
        console.log(validEmails.length);
        fs2.writeFileSync(output, validEmails.join('\n'), 'utf8');
    })
})();
