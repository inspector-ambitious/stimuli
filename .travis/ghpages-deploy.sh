#!/bin/bash

set -e

# deploy to jsdoc only if the build is run on the master branch

if [[ "$TRAVIS_BRANCH" == "master" ]]; then

    echo "Deploying jsdocumentation on gh-pages"
    
    git clone https://$GITHUB_LOGIN:$GITHUB_PASSWORD@github.com/yhwh/domino.git

    cd domino

    git config --global user.name "$GIT_USERNAME"

    git config --global user.email $GIT_USEREMAIL

    git fetch origin

    git checkout gh-pages

    cp -r ../docs .

    cp ../build/domino.js .

    cp ../README.md .

    git add docs

    git add domino.js

    git add README.md

    git commit -a -m "Publishing JSDoc"

    git push origin gh-pages

fi

