FROM python:3.9

WORKDIR /app

# For dev debugging purposes
RUN apt update && apt install net-tools

WORKDIR /django_app_root
COPY requirements.txt ./
RUN apt-get update && apt-get -y install nginx
RUN service nginx stop
RUN update-rc.d -f nginx remove
RUN rm -rf /etc/nginx/sites-available/default
RUN rm -rf /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/nginx_server.conf /etc/nginx/sites-enabled/
RUN pip install -r requirements.txt
COPY nginx_server.conf /etc/nginx/sites-available/

COPY . .

EXPOSE 8181

# In development mode run this before running the run server
# ENTRYPOINT ["python", "manage.py", "collectstatic", "--noinput"]
# ENTRYPOINT ["python", "manage.py", "runserver"]
CMD ["tail", "-f", "/dev/null" ]

# In production mode run using gunicorn and nginx
# ENTRYPOINT ["./wrapper_script.sh"]

# This line for debug purposes
# ENTRYPOINT ["tail", "-f", "/dev/null"]
