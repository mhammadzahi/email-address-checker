import os

def remove_duplicates(filenames):
    for filename in filenames:
        with open(filename, 'r') as file:
            emails = file.readlines()

        unique_emails = set(email.lower().strip() for email in emails)

        output_filename = os.path.join(os.path.dirname(filename), 'clean____' + os.path.basename(filename))

        with open(output_filename, 'w') as file:
            for email in unique_emails:
                file.write(email + '\n')

        print(f"Processed {filename}: {len(unique_emails)} unique emails saved to {output_filename}")



file_list = [
    '/home/mohammad/Desktop/email-address-checker/oo___real-estate-sa.txt'
]


remove_duplicates(file_list)
