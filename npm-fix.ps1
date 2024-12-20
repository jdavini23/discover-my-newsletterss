# NPM and Node.js Repair Script

# Function for colored output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = 'Green'
    )
    Write-Host $Message -ForegroundColor $Color
}

# Backup Project Function
function Backup-Project {
    $backupScript = "c:/Users/joeda/Desktop/discover-my-newsletters/backup-project.ps1"
    if (Test-Path $backupScript) {
        Write-ColorOutput "Creating project backup..." Yellow
        & $backupScript
    } else {
        Write-ColorOutput "Backup script not found. Skipping backup." Red
    }
}

# 1. Verify and Update PATH
function Update-SystemPath {
    Write-ColorOutput "Checking and Updating System PATH..." Yellow
    
    # Get current PATH
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", "Machine")
    
    # Potential Node.js installation paths
    $nodePaths = @(
        "C:\Program Files\nodejs",
        "C:\Program Files (x86)\nodejs",
        "C:\nodejs"
    )
    
    $pathUpdated = $false
    foreach ($nodePath in $nodePaths) {
        if ((Test-Path $nodePath) -and ($currentPath -notlike "*$nodePath*")) {
            $newPath = "$currentPath;$nodePath"
            [Environment]::SetEnvironmentVariable("PATH", $newPath, "Machine")
            Write-ColorOutput "Added $nodePath to system PATH" Green
            $pathUpdated = $true
        }
    }
    
    if (-not $pathUpdated) {
        Write-ColorOutput "No new Node.js paths added to PATH" Yellow
    }
}

# 2. Clear NPM Cache
function Clear-NpmCache {
    Write-ColorOutput "Clearing NPM Cache..." Yellow
    try {
        & npm cache clean --force
        Write-ColorOutput "NPM cache cleared successfully" Green
    } catch {
        Write-ColorOutput "Failed to clear NPM cache" Red
    }
}

# 3. Reinstall NPM
function Repair-NpmInstallation {
    Write-ColorOutput "Repairing NPM Installation..." Yellow
    try {
        # Uninstall existing npm
        & npm uninstall -g npm
        
        # Install latest npm
        & npm install -g npm@latest
        
        Write-ColorOutput "NPM reinstalled successfully" Green
    } catch {
        Write-ColorOutput "Failed to reinstall NPM" Red
    }
}

# 4. Check Node.js and NPM Versions
function Check-Versions {
    Write-ColorOutput "Checking Installed Versions..." Yellow
    
    try {
        $nodeVersion = & node --version
        Write-ColorOutput "Node.js Version: $nodeVersion" Green
    } catch {
        Write-ColorOutput "Node.js is not installed" Red
    }
    
    try {
        $npmVersion = & npm --version
        Write-ColorOutput "NPM Version: $npmVersion" Green
    } catch {
        Write-ColorOutput "NPM is not installed" Red
    }
}

# 5. Repair Project Dependencies
function Repair-ProjectDependencies {
    $projectPath = "c:/Users/joeda/Desktop/discover-my-newsletters/backend"
    
    Write-ColorOutput "Repairing Project Dependencies..." Yellow
    
    # Change to project directory
    Push-Location $projectPath
    
    try {
        # Remove existing node_modules
        if (Test-Path "node_modules") {
            Remove-Item "node_modules" -Recurse -Force
            Write-ColorOutput "Removed existing node_modules" Green
        }
        
        # Remove package-lock.json
        if (Test-Path "package-lock.json") {
            Remove-Item "package-lock.json" -Force
            Write-ColorOutput "Removed package-lock.json" Green
        }
        
        # Clean npm cache
        & npm cache clean --force
        
        # Reinstall dependencies
        & npm install
        
        Write-ColorOutput "Project dependencies reinstalled successfully" Green
    } catch {
        Write-ColorOutput "Failed to repair project dependencies" Red
    } finally {
        Pop-Location
    }
}

# Main Repair Process
function Repair-NpmEnvironment {
    Write-ColorOutput "=== NPM and Node.js Repair Tool ===" Cyan
    
    # Add backup as the first step
    Backup-Project
    
    Update-SystemPath
    Clear-NpmCache
    Repair-NpmInstallation
    Check-Versions
    Repair-ProjectDependencies
    
    Write-ColorOutput "=== Repair Process Complete ===" Cyan
}

# Run the repair process
Repair-NpmEnvironment
