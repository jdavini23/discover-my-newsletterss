# Windows-specific git commit script
git add .
$message = "Automated commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $message
git push
