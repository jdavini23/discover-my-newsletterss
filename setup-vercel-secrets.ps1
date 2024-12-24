# Vercel and GitHub Secrets Setup Script

# Ensure you're in the correct directory
Set-Location $PSScriptRoot

# Function to check if a command exists
function Test-CommandExists {
    param ($command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'stop'
    try { if (Get-Command $command) { return $true } }
    catch { return $false }
    finally { $ErrorActionPreference = $oldPreference }
}

# Install Vercel CLI if not present
if (-not (Test-CommandExists vercel)) {
    Write-Host "Installing Vercel CLI..."
    npm install -g vercel
}

# Install GitHub CLI if not present
if (-not (Test-CommandExists gh)) {
    Write-Host "Installing GitHub CLI..."
    winget install --id GitHub.cli
}

# Vercel Login
Write-Host " Logging into Vercel..."
vercel login

# Link project to Vercel
Write-Host " Linking project to Vercel..."
vercel link

# Retrieve Project Details
try {
    $vercelProjectDetails = vercel project ls | Select-String -Pattern "newsletter-frontend"
    if (-not $vercelProjectDetails) {
        throw "Could not find Vercel project"
    }

    $vercelProjectId = ($vercelProjectDetails -split "\s+")[1]
    $vercelOrgId = (vercel teams ls | Select-String -Pattern "Personal Account" | ForEach-Object { ($_ -split "\s+")[1] })

    # Prompt for tokens
    $vercelToken = Read-Host "Enter your Vercel Token"
    $githubToken = Read-Host "Enter your GitHub Personal Access Token"
    $slackWebhook = Read-Host "Enter Slack Webhook URL (optional)"

    # Create GitHub Secrets configuration
    $githubSecretsFile = ".github/secrets.yml"
    $secretsContent = @"
name: Set Repository Secrets

on:
  workflow_dispatch:

jobs:
  set-secrets:
    runs-on: ubuntu-latest
    steps:
      - name: Configure Secrets
        env:
          GH_TOKEN: `${{ secrets.PERSONAL_ACCESS_TOKEN }}
        run: |
          gh secret set VERCEL_TOKEN $vercelToken
          gh secret set VERCEL_PROJECT_ID $vercelProjectId
          gh secret set VERCEL_ORG_ID $vercelOrgId
          gh secret set GITHUB_TOKEN $githubToken
          
          if [ -n "$slackWebhook" ]; then
            gh secret set SLACK_WEBHOOK $slackWebhook
          fi
"@

    # Write secrets configuration
    New-Item -Path $githubSecretsFile -Value $secretsContent -Force

    Write-Host "Setup Complete!"
    Write-Host "Vercel Project ID: $vercelProjectId"
    Write-Host "Vercel Org ID: $vercelOrgId"
    Write-Host "Next steps:"
    Write-Host "1. Commit changes to GitHub"
    Write-Host "2. Run GitHub Actions workflow"
}
catch {
    Write-Host "Error: $_"
    exit 1
}

Read-Host "Press Enter to exit"
