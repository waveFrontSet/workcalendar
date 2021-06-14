# Workcalendar App

A small django app to experiment with the deployment process of
[devspace](https://devspace.sh/).

## Quick development setup

- You need to [install
  devspace](https://devspace.sh/cli/docs/getting-started/installation).
- You need to have access to a Kubernetes cluster. The easiest would be to
  [install docker for your OS](https://docs.docker.com/get-docker/) and to
  [enable
  Kubernetes](https://docs.docker.com/desktop/kubernetes/#enable-kubernetes).

If you have the prerequisites installed, you can do `devspace dev` to fire up a
development container. Then, issue `python manage.py runserver` to start the
development server.

If you want to test proper deployment you will need to execute `devspace
deploy`.
