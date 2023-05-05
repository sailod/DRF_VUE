# Backend in Django

Backend support Firebase Auth (need to download service account key in json format and save it under the name firebase_key.json)
Backend DB is Postgres

## Prepare the DB
```
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

## Run API in development mode
```
python manage.py runserver 8181
```
