import os





isp_domains = {
    'gmail': ['gmail.com'],
    'yahoo': ['yahoo.in', 'yahoo.com.br', 'yahoo.co.in', 'yahoo.com', 'yahoo.co.uk', 'ymail.com'],
    'hotmail': ['hotmail.sg', 'hotmail.co.in', 'hotmail.ca', 'hotmail.it', 'hotmail.fr', 'hotmail.co.uk', 'live.in', 'hotmail.com', 'live.com', 'outlook.com', 'outlook.fr', 'msn.com'],
    # Add more ISPs and their associated domains here
}

# Function to find the ISP for a given email
def get_isp(email):
    domain = email.split('@')[-1]
    for isp, domains in isp_domains.items():
        if domain in domains:
            return isp
    return 'other'  # For ISPs not in the list

# Function to split emails by ISP and save them in separate files
def split_emails_by_isp(input_file, output_folder):
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)

    # Open the input file
    with open(input_file, mode='r', encoding='utf-8') as file:
        emails = file.readlines()

    # Create a dictionary to store emails by ISP
    isp_emails = {}

    # Sort emails into ISP groups
    for email in emails:
        email = email.strip()  # Remove any leading/trailing whitespace
        isp = get_isp(email)
        if isp not in isp_emails:
            isp_emails[isp] = []
        isp_emails[isp].append(email)

    # Write each ISP's emails to a separate file
    for isp, email_list in isp_emails.items():
        output_file = os.path.join(output_folder, f'{isp}_emails.txt')
        with open(output_file, mode='w', encoding='utf-8') as file:
            for email in email_list:
                file.write(email + '\n')

    print(f"Emails successfully split by ISP and saved in {output_folder}.")






input_file = 'pmta_data.txt'
output_folder = 'isps'  
split_emails_by_isp(input_file, output_folder)
