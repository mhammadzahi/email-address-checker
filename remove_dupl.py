def remove_duplicates(filename):
    with open(filename, 'r') as file:
        emails = file.readlines()

    
    unique_emails = set(email.lower().strip() for email in emails)

    with open('cleaned_' + filename, 'w') as file:
        for email in unique_emails:
            file.write(email + '\n')



remove_duplicates('_checked__50_europ_cities_.txt')
