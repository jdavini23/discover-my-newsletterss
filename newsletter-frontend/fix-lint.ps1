#!/usr/bin/env pwsh

# Comprehensive Code Quality and Maintenance Script
# Version: 1.1.0

# Enhanced Error Handling
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

# Color Output Functions
function Write-SuccessMessage { 
    param($Message)
    Write-Host $Message -ForegroundColor Green 
}

function Write-ErrorMessage { 
    param($Message)
    Write-Host $Message -ForegroundColor Red 
}

function Write-InfoMessage { 
    param($Message)
    Write-Host $Message -ForegroundColor Cyan 
}

# Function to run ESLint with auto-fix
function Fix-EsLint {
    param (
        [string]$Directory = "."
    )

    try {
        Write-InfoMessage "Running Prettier formatting on $Directory..."
        npx prettier --write --ignore-path .prettierignore "$Directory/**/*.{js,jsx,ts,tsx,json,css,md}"
    } catch {
        Write-ErrorMessage "Prettier formatting encountered issues: $_"
        exit 1
    }

    try {
        Write-InfoMessage "Running ESLint auto-fix on $Directory..."
        npx eslint "$Directory" --config .eslintrc.cjs --fix
    } catch {
        Write-ErrorMessage "ESLint auto-fix encountered issues: $_"
        exit 1
    }

    try {
        Write-InfoMessage "Performing final formatting check..."
        npx prettier --check --ignore-path .prettierignore "$Directory/**/*.{js,jsx,ts,tsx,json,css,md}"
    } catch {
        Write-ErrorMessage "Formatting check failed: $_"
        exit 1
    }

    Write-SuccessMessage "Lint and formatting process completed!"
}

# Main script execution
try {
    # Change to the script's directory
    Set-Location $PSScriptRoot

    # Run the function
    Fix-EsLint "."
} catch {
    Write-ErrorMessage "An error occurred: $_"
    exit 1
}
