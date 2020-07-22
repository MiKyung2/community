#!/bin/bash
git pull --no-edit origin master
docker stop fe-portal-app
docker build -t toyongyeon/fe-portal-app .
docker run -p 3000:3000 -d --name fe-portal-app toyongyeon/fe-portal-app:0.1
