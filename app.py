import smtplib

def verify_email_smtp(email_address):
    with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
        smtp.starttls()
        smtp.set_debuglevel(1)

        #smtp.connect()
        #smtp.helo()

        smtp.login('j95016576@gmail.com', 'lheclplaguoucufc')
        smtp.mail('mohamedzahi678@gmail.com')
        #smtp.mail('j95016576@gmail.com')

        response_code, _ = smtp.rcpt(email_address)
        #return response_code == 250
        #print(response_code)
  
verify_email_smtp('infsao@pentame.com')
  