const validator = require("email-validator");
const dns = require('dns');
const fs = require('fs').promises;
const fs2 = require('fs');


async function readEmailsFromFile(fileName){
    const data = await fs.readFile(fileName, 'utf8');
    const emailsArray = data.split('\n').map(email => email.trim());
    const validEmailsArray = emailsArray.filter(email => email !== '');
    return validEmailsArray;
}


const blackListedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
const blackListedExtensions = ['.in', '.pk', '.lk', 'np'];
async function checkDNS(domain){
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
    if(validator.validate(email)){//add blackListedExtensions here
        validDomain = await checkDNS(email.split("@")[1]);
        //if(validDomain){//check SMTP}
        return validDomain;
    }
    else
        return false;
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
    }

    return valids;
}

//call main
(async () => {
    validateAllEmails('all_uae_sent_weekend.txt').then(validEmails => {
        console.log(validEmails.length);
        fs2.writeFileSync('check_1_all_uae_sent_weekend.txt', validEmails.join('\n'), 'utf8');

    })
})();
