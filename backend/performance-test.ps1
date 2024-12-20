#!/usr/bin/env pwsh

# Performance Testing Script for Newsletter Recommendations

# Ensure the backend is running
Start-Process npm -ArgumentList "run", "start" -PassThru

# Wait for the server to start
Start-Sleep -Seconds 5

# Run Clinic.js performance profiling
npx clinic doctor -- npm run test:performance

# Run Artillery load tests
npx artillery run load-test.yml --output performance-report.json

# Generate HTML report
npx artillery report performance-report.json

# Optional: Run specific performance diagnostics
npx clinic bubbleprof -- node src/performance/recommendation-benchmark.js
