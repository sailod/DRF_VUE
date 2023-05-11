# Voting system made with Django Rest Framework and Vue.js

This repository can be used as boilerplate for fullstack application written in VueJS and Django,  
This application has example of all CRUD operations, Authentication (using username/password or firebase),  
Authorization (any object can be edited only by its creator), and IP based protection to limit each user for only one vote per subject, Pagination

This repo includes the best practices for running both the frontend and backend in production,
its running the API (Django Rest Framework) using Gunicorn and use Nginx as proxy to the wsgi and serving media and static files like stylesheets 

This platform works as follow:
1. in order to create new poll you need to register and be logged in
2. once you published poll everybody that logged in can vote for it but just single time (enforced via IP detection)
3. only the publisher of the poll can delete it
## Run the app
```
docker compose up
```
[drf_vue_compressed.webm](https://github.com/sailod/DRF_VUE/assets/39811986/3a58c86e-e328-4f86-bd8e-4182c9d18db4)
