# PowerShell Cleanup Script for Newsletter Frontend

# Remove duplicate and unnecessary configuration files
Remove-Item -Path ".eslintrc.js" -Force
Remove-Item -Path "eslint.config.mjs" -Force
Remove-Item -Path "vite.config.staging.ts" -Force

# Remove unnecessary directories
Remove-Item -Path "build" -Recurse -Force
Remove-Item -Path "coverage" -Recurse -Force

# Remove unnecessary Storybook files if not actively used
Remove-Item -Path ".storybook" -Recurse -Force

# Optional: Clean up node_modules and reinstall dependencies
# Uncomment if you want to do a full clean reinstall
# Remove-Item -Path "node_modules" -Recurse -Force
# npm ci

Write-Host "Cleanup completed successfully!"
