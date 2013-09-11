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

    COVERAGE_REPORT=`find ../coverage -name lcov-report`

    cp -r ../docs .

    cp -r ../build .

    cp ../README.md .

    cp ../package.json .

    cp -r "$COVERAGE_REPORT" coverage

    git add *

    git commit -a -m "Publishing JSDoc"

    git push origin gh-pages

fi

