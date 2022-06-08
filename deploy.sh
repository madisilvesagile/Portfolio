#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -addgit commit -m 'New deploy'
git push -f https://github.com/madisilvesagile/Portfolio.git main:gh-pages

cd -