#!/bin/bash
git pull --no-edit origin develop
npm install
docker stop fe-portal-app
docker rm fe-portal-app
docker build -t toyongyeon/fe-portal-app:0.1 .
docker run -p 3000:3000 -d --rm --name fe-portal-app toyongyeon/fe-portal-app:0.1
