#!/usr/bin/env pwsh

# Function to run ESLint with auto-fix
function Fix-EsLint {
    param (
        [string]$Directory = "."
    )

    Write-Host "Running Prettier formatting on $Directory..." -ForegroundColor Cyan
    try {
        npx prettier --write --ignore-path .prettierignore "$Directory/**/*.{js,jsx,ts,tsx,json,css,md}"
    } catch {
        Write-Host "Prettier formatting encountered issues: $_" -ForegroundColor Yellow
    }

    Write-Host "Running ESLint auto-fix on $Directory..." -ForegroundColor Cyan
    try {
        npx eslint "$Directory" --config .eslintrc.cjs --fix
    } catch {
        Write-Host "ESLint auto-fix encountered issues: $_" -ForegroundColor Yellow
    }

    Write-Host "Performing final formatting check..." -ForegroundColor Cyan
    try {
        npx prettier --check --ignore-path .prettierignore "$Directory/**/*.{js,jsx,ts,tsx,json,css,md}"
    } catch {
        Write-Host "Formatting check failed: $_" -ForegroundColor Yellow
    }

    Write-Host "Lint and formatting process completed!" -ForegroundColor Green
}

# Main script execution
try {
    # Change to the script's directory
    Set-Location $PSScriptRoot

    # Run the function
    Fix-EsLint "."
}
catch {
    Write-Host "An error occurred: $_" -ForegroundColor Red
    exit 1
}
