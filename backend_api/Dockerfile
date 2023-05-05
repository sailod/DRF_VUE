FROM python:3.9

# For dev debugging purposes
RUN apt update && apt install net-tools

WORKDIR /test
COPY requirements.txt ./
RUN apt-get update && apt-get -y install nginx
RUN service nginx stop
RUN update-rc.d -f nginx remove
RUN rm -rf /etc/nginx/sites-available/default
RUN rm -rf /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/nginx_server.conf /etc/nginx/sites-enabled/
RUN pip install -r requirements.txt --use-feature=2020-resolver
COPY nginx_server.conf /etc/nginx/sites-available/
COPY . ./
# RUN python backend_api/manage.py collectstatic --noinput
CMD ["tail","-f","/dev/null"]
# ENTRYPOINT ["./wrapper_script.sh"]
EXPOSE 8181
