# Voting system made with Django Rest Framework and Vue.js

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
