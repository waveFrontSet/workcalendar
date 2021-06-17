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
1. Make sure you are in the right context. If in doubt, use `devspace use
   context` and select it again. For instance, if you want to use the Docker
   Kubernetes context you will need to select `docker-desktop`.
2. Choose a namespace for the app, for example `workcalendar` via `devspace use
   namespace workcalendar`.
3. Fire up the development container `devspace dev` which will build a 
   development image containing all necessary dependencies and development
   extras such as `pytest`, `flake8` and `black`.
4. If everything goes will, you will be greeted by a new browser window showing
   the app. Logs from the development container will be streamed.

## Running tests and linters

If you stop the logs streaming or open up another terminal window, you may
enter
```
devspace run test
```

to let the tests run inside the container. If you wish to run linting checks,
execute
```
devspace run lint
```

