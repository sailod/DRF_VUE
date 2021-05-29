#!/bin/bash

/usr/local/bin/gunicorn backend_api.wsgi --pythonpath /app/backend_api/ --bind 0.0.0.0:8000 -D
