#!/bin/bash

ssh root@cocurco 'mkdir -p /root/cocurco_install'
scp -r ./server/* root@cocurco:/root/cocurco_install/
ssh root@cocurco 'cd ./cocurco_install; chmod +x ./server_install.sh;./server_install.sh'
