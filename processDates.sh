#!/bin/bash

git_last_commit_date="$(git log -1 --format=%cd --date=format:"%B %-d, %Y.")"
echo "Git last commit date: $git_last_commit_date"

html_files="$(find . -type f -name "*.html" -not -path "./_site/*")"

for file in $html_files; do
  echo "Inserting date into: $file"
  # Use temp file to avoid leaving .bak files; works on macOS, Linux, and Windows (Git Bash).
  tmp=$(mktemp 2>/dev/null || echo "${file}.tmp")
  sed "s|<span id=\"git-last-commit-date\">[^<]*</span>|<span id=\"git-last-commit-date\">$git_last_commit_date</span>|g" "$file" > "$tmp" && mv "$tmp" "$file"
done
