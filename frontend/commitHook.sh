#!/bin/sh

npm run lint:fix
git add .
git status
git commit -m "fix: lint"

