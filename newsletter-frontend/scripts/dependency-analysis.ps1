# Dependency Analysis and Cleanup Script

# Ensure script stops on first error
$ErrorActionPreference = 'Stop'

# Function to log messages
function Write-Log {
    param([string]$Message)
    Write-Host "[DEPENDENCY ANALYSIS] $Message" -ForegroundColor Cyan
}

# Check for outdated dependencies
function Analyze-OutdatedDependencies {
    Write-Log "Checking for outdated dependencies..."
    npm outdated
}

# Find unused dependencies
function Find-UnusedDependencies {
    Write-Log "Searching for unused dependencies..."
    npx depcheck
}

# Analyze bundle size
function Analyze-BundleSize {
    Write-Log "Analyzing bundle size..."
    npm run build
    npx vite-bundle-analyzer
}

# Security audit
function Perform-SecurityAudit {
    Write-Log "Running npm security audit..."
    npm audit
}

# Main dependency analysis workflow
function Invoke-DependencyAnalysis {
    try {
        Analyze-OutdatedDependencies
        Find-UnusedDependencies
        Analyze-BundleSize
        Perform-SecurityAudit

        Write-Log "Dependency analysis completed successfully!"
    }
    catch {
        Write-Error "Dependency analysis failed: $_"
    }
}

# Execute analysis
Invoke-DependencyAnalysis
