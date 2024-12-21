#!/bin/bash

# Create or clear the for_gpt_40.md file
> atef.md

# Find all files in the components folder
find src/components -type f | while read -r file; do
    # Write the file path as a header
    echo "# $file" >> for_gpt_40.md
    
    # Write the file contents
    echo "\`\`\`" >> for_gpt_40.md
    cat "$file" >> for_gpt_40.md
    echo "\`\`\`" >> for_gpt_40.md
    
    # Add a newline for separation
    echo "" >> for_gpt_40.md
done