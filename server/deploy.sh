#!/bin/bash

ssh root@cocurco 'cd /var/www/cocur.co; git pull origin master; gulp build --prod'
