# Comprehensive NPM and Node.js Diagnostic Script

# Function to write colored output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = 'Green'
    )
    Write-Host $Message -ForegroundColor $Color
}

# Diagnostic Header
Write-ColorOutput "=== NPM and Node.js Diagnostic Tool ===" Yellow

# 1. Check Node.js Installation
Write-ColorOutput "`n1. Node.js Version Check:" Cyan
try {
    $nodeVersion = & node --version 2>&1
    Write-ColorOutput "Node.js Version: $nodeVersion" Green
} catch {
    Write-ColorOutput "Node.js is not installed or not in PATH" Red
}

# 2. Check NPM Installation
Write-ColorOutput "`n2. NPM Version Check:" Cyan
try {
    $npmVersion = & npm --version 2>&1
    Write-ColorOutput "NPM Version: $npmVersion" Green
} catch {
    Write-ColorOutput "NPM is not installed or not in PATH" Red
}

# 3. NPM Configuration
Write-ColorOutput "`n3. NPM Configuration:" Cyan
try {
    $npmConfig = & npm config list 2>&1
    Write-Host ($npmConfig | Out-String)
} catch {
    Write-ColorOutput "Could not retrieve NPM configuration" Yellow
}

# 4. Check Global Packages
Write-ColorOutput "`n4. Global NPM Packages:" Cyan
try {
    $globalPackages = & npm list -g --depth=0 2>&1
    Write-Host ($globalPackages | Out-String)
} catch {
    Write-ColorOutput "Could not list global packages" Yellow
}

# 5. Verify NPM Cache
Write-ColorOutput "`n5. NPM Cache Verification:" Cyan
try {
    $npmCache = & npm cache verify 2>&1
    Write-Host ($npmCache | Out-String)
} catch {
    Write-ColorOutput "NPM cache verification failed" Yellow
}

# 6. Check System Environment Variables
Write-ColorOutput "`n6. Node and NPM PATH Configuration:" Cyan
$paths = $env:PATH -split ';'
$nodePaths = $paths | Where-Object { $_ -like '*node*' -or $_ -like '*npm*' }

if ($nodePaths) {
    Write-ColorOutput "Node/NPM Paths in Environment:" Green
    $nodePaths | ForEach-Object { Write-Host $_ }
} else {
    Write-ColorOutput "No Node or NPM paths found in PATH" Red
}

# 7. Check Project Specific Configurations
Write-ColorOutput "`n7. Project NPM Configuration:" Cyan
$projectPath = "c:/Users/joeda/Desktop/discover-my-newsletters/backend"

if (Test-Path "$projectPath/package.json") {
    Write-ColorOutput "package.json found" Green
    try {
        $packageJson = Get-Content "$projectPath/package.json" | ConvertFrom-Json
        Write-ColorOutput "Project Name: $($packageJson.name)" White
        Write-ColorOutput "Project Version: $($packageJson.version)" White
    } catch {
        Write-ColorOutput "Could not parse package.json" Yellow
    }
} else {
    Write-ColorOutput "No package.json found in project directory" Red
}

# 8. Potential Issues and Recommendations
Write-ColorOutput "`n8. Potential Issues and Recommendations:" Yellow
$recommendations = @(
    "Ensure Node.js and NPM are correctly installed",
    "Check your system's PATH environment variable",
    "Verify npm is working by running 'npm --version'",
    "If issues persist, try reinstalling Node.js",
    "Clear npm cache with 'npm cache clean --force'"
)

$recommendations | ForEach-Object {
    Write-Host "- $_" -ForegroundColor White
}

# Closing Message
Write-ColorOutput "`n=== Diagnostic Complete ===" Yellow
