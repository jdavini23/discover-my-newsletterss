# Comprehensive Performance and Optimization Script

$ErrorActionPreference = 'Stop'

function Write-Log {
    param([string]$Message, [string]$Color = 'Cyan')
    Write-Host "[OPTIMIZE] $Message" -ForegroundColor $Color
}

function Measure-BuildPerformance {
    # Clear previous build artifacts
    if (Test-Path "dist") {
        Remove-Item -Recurse -Force "dist"
    }

    # Cleanup temporary folders
    $artifactFolders = @(
        "node_modules/.cache",
        "build",
        "coverage",
        ".nyc_output"
    )

    foreach ($folder in $artifactFolders) {
        if (Test-Path $folder) {
            Remove-Item $folder -Recurse -Force
            Write-Log "Removed $folder"
        }
    }

    # Measure build time
    $startTime = Get-Date
    npm run build
    $endTime = Get-Date
    $duration = $endTime - $startTime

    # Log build performance
    Write-Log "Build Duration: $($duration.TotalSeconds) seconds" -Color Green

    # Check bundle sizes
    $bundleSizes = Get-ChildItem -Path "dist/assets" -Include "*.js", "*.css" | 
        Select-Object Name, 
        @{Name='SizeInKB'; Expression={[math]::Round($_.Length / 1KB, 2)}}

    Write-Log "`nBundle Sizes:" -Color Cyan
    $bundleSizes | Format-Table -AutoSize

    # Total bundle size
    $totalBundleSize = ($bundleSizes | Measure-Object -Property SizeInKB -Sum).Sum
    Write-Log "Total Bundle Size: $([math]::Round($totalBundleSize, 2)) KB" -Color Green

    # Performance warnings
    if ($duration.TotalSeconds -gt 60) {
        Write-Log "Build time exceeds 1 minute. Consider optimizing build process." -Color Yellow
    }

    if ($totalBundleSize -gt 5000) {
        Write-Log "Total bundle size exceeds 5MB. Consider code splitting and optimization." -Color Yellow
    }
}

function Invoke-CodeQualityChecks {
    Write-Log "Running linting..."
    npm run lint

    Write-Log "Running type checks..."
    npm run tsc -- --noEmit

    Write-Log "Running tests..."
    npm test
}

function Refresh-Dependencies {
    Write-Log "Cleaning npm cache..."
    npm cache clean --force

    Write-Log "Reinstalling dependencies..."
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    npm ci
}

# Main execution
Write-Log "Starting Performance Optimization Process" -Color Green
Refresh-Dependencies
Invoke-CodeQualityChecks
Measure-BuildPerformance
Write-Log "Performance Optimization Complete" -Color Green
