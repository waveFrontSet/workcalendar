#!/bin/sh

python manage.py migrate

case $1 in
    "run_locally")
        uvicorn workcalendar.asgi:application \
            -k uvicorn.workers.UvicornWorker \
            --host 0.0.0.0 \
            --port 5000 \
            --reload
        ;;
    "run")
        gunicorn workcalendar.asgi:application \
            -k uvicorn.workers.UvicornWorker \
            --bind 0.0.0.0:5000
        ;;
    *)
        exec "$@"
        ;;
esac
              
