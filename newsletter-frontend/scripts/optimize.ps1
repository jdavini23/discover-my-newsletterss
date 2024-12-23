# Comprehensive Project Optimization and Cleanup Script

# Ensure script stops on first error
$ErrorActionPreference = 'Stop'

# Function to log messages
function Write-Log {
    param([string]$Message)
    Write-Host "[OPTIMIZE] $Message" -ForegroundColor Cyan
}

# Cleanup Temporary and Build Artifacts
function Remove-BuildArtifacts {
    Write-Log "Removing build artifacts..."
    $artifactFolders = @(
        "node_modules/.cache",
        "build",
        "dist",
        "coverage",
        ".nyc_output"
    )

    foreach ($folder in $artifactFolders) {
        if (Test-Path $folder) {
            Remove-Item $folder -Recurse -Force
            Write-Log "Removed $folder"
        }
    }
}

# Clean npm cache and reinstall dependencies
function Refresh-Dependencies {
    Write-Log "Cleaning npm cache..."
    npm cache clean --force

    Write-Log "Reinstalling dependencies..."
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    npm ci
}

# Run code quality checks
function Invoke-CodeQualityChecks {
    Write-Log "Running linting..."
    npm run lint

    Write-Log "Running type checks..."
    npm run tsc -- --noEmit

    Write-Log "Running tests..."
    npm test
}

# Optimize and minify assets
function Optimize-Assets {
    Write-Log "Building production assets..."
    npm run build
}

# Main optimization workflow
function Invoke-ProjectOptimization {
    try {
        Remove-BuildArtifacts
        Refresh-Dependencies
        Invoke-CodeQualityChecks
        Optimize-Assets

        Write-Log "Project optimization completed successfully!"
    }
    catch {
        Write-Error "Optimization failed: $_"
    }
}

# Execute optimization
Invoke-ProjectOptimization
