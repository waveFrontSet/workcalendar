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

Then, we can use `devspace` to fire up a development container via the following
process.
1. Choose a namespace for the app, for example `workcalendar` via `devspace use
   namespace workcalendar`.
2. Fire up the development container `devspace dev` which will load a pre-built
   development image containing all necessary dependencies and development
   extras such as `pytest`, `flake8` and `black`.
3. As soon as you regain control, you will have access to the shell of the
   development container. Execute `python manage.py runserver 5000` to fire up a
   development server listening on port 5000. If everything goes well, you will
   be greeted by a new browser window showing the app.
