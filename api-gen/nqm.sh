#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
mkdir -p code

if [ -d "$DIR/code/nqm" ]; then
    cd code/nqm
    git pull origin
else
    git clone https://github.com/cocur/nqm code/nqm
    cd code/nqm
fi

composer update
./vendor/bin/sami.php update sami.php
