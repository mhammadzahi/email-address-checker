import csv
import os
import glob

# Folder containing the CSV files
folder_path = 'files'  # Replace with the path to your folder
output_file = 'rcpt_relayed.txt'  # Output text file path

# Open the output file for writing
with open(output_file, mode='w', encoding='utf-8') as output:
    # Loop through all CSV files in the folder
    for csv_file in glob.glob(os.path.join(folder_path, '*.csv')):
        print(f"Processing file: {csv_file}")
        
        # Open each CSV file for reading
        with open(csv_file, mode='r', newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            # Iterate over each row in the CSV
            for row in reader:
                # Check if dsnAction is 'relayed'
                if 'dsnAction' in row and row['dsnAction'] == 'relayed':
                    # Write the value of 'rcpt' to the output file
                    output.write(row['rcpt'] + '\n')


print(f"Data successfully written to {output_file}.")
