#!/bin/bash
git add .
message="Automated commit: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$message"
git push
