# PowerShell commit script

# Stage all changes
git add .

# Get current timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Commit with a timestamp-based message
git commit -m "Linting and code quality improvements - $timestamp"

# Push changes
git push
