# Voting system made with Django Rest Framework and Vue.js

This repository can be used as boilerplate for fullstack application written in VueJS and Django,  
This application has example of all CRUD operations, Authentication (using username/password or firebase),  
Authorization (any object can be edited only by its creator), and IP based protection to limit each user for only one vote per subject
Pagination

This repo includes the best practices for running both the frontend and backend in production,
its running the API (Django Rest Framework) using Gunicorn and use Nginx as proxy to the wsgi and serving media and static files like stylesheets 

## Django Administrator User
in case you want to use preconfigured DB with data:  
```
git show 402f023b14e9177d238811a6308824ce61fee182:backend_api/db.sqlite3 > backend_api/db.sqlite3
```
username: admin  
password: x5t47pYj

## Build Commands
```
sudo docker build -t vuejs-with-deps -f DockerfileVueJS .
sudo docker build -t django-with-deps -f DockerfileDjango .
```
## Run Commands
```
sudo docker run -it --mount type=bind,source="$(pwd)",target=/app -p 8080:8080 -d vuejs-with-deps tail -f /dev/null
sudo docker run -it --mount type=bind,source="$(pwd)",target=/app -p 8000:80 -d django-with-deps
```
### if application code mounted instead of copied to container, run:
```
python backend_api/manage.py collectstatic --noinput
```
### otherwise just uncomment this line in DockerfileDjango
