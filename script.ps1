npm run prod
git add .
git commit
git status
git push origin master
git subtree push --prefix dist origin gh-pages
Start-Process "https://eankeen.github.io/periodic-table/"
