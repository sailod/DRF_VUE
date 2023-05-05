#!/bin/bash

/usr/local/bin/gunicorn backend_api.wsgi --bind 0.0.0.0:8282 -D
