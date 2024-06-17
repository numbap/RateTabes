#!/bin/zsh

# Define the directory containing the files and the output JavaScript file
DIRECTORY="/Users/patrick/Desktop/10k backup"
OUTPUT_FILE="fileNames.js"

# Start the JavaScript file with an empty array
echo "const fileNames = [" > $OUTPUT_FILE

# Loop through each file in the directory
for FILE in "$DIRECTORY"/*; do
  # Get the base name of the file
  FILE_NAME=$(basename "$FILE")
  # Append the file name to the JavaScript array
  echo "  \"$FILE_NAME\"," >> $OUTPUT_FILE
done

# Close the array and export it
echo "];" >> $OUTPUT_FILE
echo "export default fileNames;" >> $OUTPUT_FILE

echo "File names have been written to $OUTPUT_FILE"