const validator = require("email-validator");
const dns = require('dns');
const fs = require('fs').promises;
const fs2 = require('fs');
const path = require('path');

let i = 1;

async function readEmailsFromFile(fileName){
    const data = await fs.readFile(fileName, 'utf8');
    const emailsArray = data.split('\n').map(email => email.trim());
    const validEmailsArray = emailsArray.filter(email => email !== '');
    return validEmailsArray;
}

const blackListedDomains = ['doe.com', 'yourmail.com', 'mysite.com', 'miramar-uae.com', 'icloud.com', 'host.com', 'website.com', 'domaine.com', 'sentry.io', 'yoursite.com', 'address.com', 'google.com', 'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'domain.com', 'mail.com', 'email.com', 'example.com'];
const badReputationExtensions = [
    '.xyz', '.top', '.club', '.online', '.site', '.biz', '.info', '.pw', '.work', '.click', 
    '.live', '.fun', '.win', '.loan', '.men', '.stream', '.download', '.review', '.party', 
    '.trade', '.date', '.gdn', '.science', '.racing', '.accountant', '.faith', '.webcam',
    '.cn', '.ru', '.su', '.tk', '.ml', '.ga', '.cf', '.gq', '.ws', '.br', '.in', '.pk', '.lk', '.np',
    '.bet', '.guru', '.casino', '.money', '.win', '.finance', '.investments', '.exchange',
    '.zip', '.mov', '.cam', '.bar', '.rest', '.host', '.press', '.bid', '.free', '.space', '.stream'
];

async function checkDNS(domain){// also check if start with '%'
    return new Promise((resolve, reject) => {
        dns.resolveMx(domain, (err, addresses) => {
            if(err || blackListedDomains.includes(domain)){
                resolve(false);
            }
            else
                resolve(addresses.length > 0);
        });
    });
}

async function validateEmail(email){
    if(email.startsWith('exemple') || email.startsWith('u00') || email.startsWith('%') || email.startsWith('+') || email.endsWith('.avif') || email.endsWith('onmicrosoft.com')){
        return false;
    }
    if (badReputationExtensions.some(ext => email.endsWith(ext))) {
        console.log(email);
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
    console.log(inValids);
    return valids;
}





// Call main
(async () => {
    const inputFiles = [
        '/home/mohammad/Desktop/email-address-checker/real-estate-sa.txt'
        // '/home/mohammad/Desktop/email-address-checker/octoparse-data/txt/cleaned_all-factories-octoparse1.txt',
        // '/home/mohammad/Desktop/email-address-checker/octoparse-data/txt/cleaned_it-usa-octoparse.txt',
        // '/home/mohammad/Desktop/email-address-checker/octoparse-data/txt/cleaned_oil-gcc-octoparse.txt',
        // '/home/mohammad/Desktop/email-address-checker/octoparse-data/txt/cleaned_usa-real-estate.txt'
    ];

    await Promise.all(inputFiles.map(async (input) => {
        const filename = path.basename(input); // Extracts just the filename
        const output = path.join(path.dirname(input), 'checked____' + filename); // Creates output file in the same directory

        const validEmails = await validateAllEmails(input);
        fs2.writeFileSync(output, validEmails.join('\n'), 'utf8');
        console.log(`Processed ${input}: ${validEmails.length} valid emails`);
    }));
})();

