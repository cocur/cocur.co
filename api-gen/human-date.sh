#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
mkdir -p code

if [ -d "$DIR/code/human-date" ]; then
    cd code/human-date
    git pull origin master
else
    git clone https://github.com/cocur/human-date code/human-date
    cd code/human-date
fi

composer update
./vendor/bin/sami.php update sami.php
