# Performance Monitoring Script for Build Process

function Measure-BuildPerformance {
    # Clear previous build artifacts
    if (Test-Path "dist") {
        Remove-Item -Recurse -Force "dist"
    }

    # Measure build time
    $startTime = Get-Date
    npm run build
    $endTime = Get-Date
    $duration = $endTime - $startTime

    # Log build performance
    Write-Host "Build Duration: $($duration.TotalSeconds) seconds" -ForegroundColor Green

    # Check bundle sizes
    $bundleSizes = Get-ChildItem -Path "dist/assets" -Include "*.js", "*.css" | 
        Select-Object Name, 
        @{Name='SizeInKB'; Expression={[math]::Round($_.Length / 1KB, 2)}}

    Write-Host "`nBundle Sizes:" -ForegroundColor Cyan
    $bundleSizes | Format-Table -AutoSize

    # Total bundle size
    $totalBundleSize = ($bundleSizes | Measure-Object -Property SizeInKB -Sum).Sum
    Write-Host "`nTotal Bundle Size: $([math]::Round($totalBundleSize, 2)) KB" -ForegroundColor Green

    # Performance warnings
    if ($duration.TotalSeconds -gt 60) {
        Write-Warning "Build time exceeds 1 minute. Consider optimizing build process."
    }

    if ($totalBundleSize -gt 5000) {
        Write-Warning "Total bundle size exceeds 5MB. Consider code splitting and optimization."
    }
}

# Run the performance measurement
Measure-BuildPerformance
