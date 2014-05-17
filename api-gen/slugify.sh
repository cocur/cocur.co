#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
mkdir -p code

if [ -d "$DIR/code/slugify" ]; then
    cd code/slugify
    git pull origin master
else
    git clone https://github.com/cocur/slugify code/slugify
    cd code/slugify
fi

composer update
./vendor/bin/sami.php update sami.php
