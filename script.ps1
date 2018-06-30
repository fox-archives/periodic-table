echo "Producing Production Build"
npm run prod
git add .
echo "Committing Files"
git commit
git status
echo "Pushing files to master"
git push origin master
git subtree push --prefix dist origin gh-pages
Start-Process "https://eankeen.github.io/periodic-table/"
