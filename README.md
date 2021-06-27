# Workcalendar App

A small full stack app to experiment with the deployment process of
[devspace](https://devspace.sh/).

## Quick development setup

- You need to [install
  devspace](https://devspace.sh/cli/docs/getting-started/installation).
- You need to have access to a Kubernetes cluster. The easiest would be to
  [install docker for your OS](https://docs.docker.com/get-docker/) and to
  [enable
  Kubernetes](https://docs.docker.com/desktop/kubernetes/#enable-kubernetes).

Then, we can use `devspace` to fire up development containers via the following
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
   both the backend's admin panel and the frontend. Logs from the development
   containers will be streamed.

Note that both the frontend and the backend support hot reloading. If you make
changes to the backend code in `backend/`, the backend server will restart and
apply your changes immediately. The same goes for the frontend.

## Opening shells to the development containers

If you want to open shells to the development containers you may do so by
executing

```
devspace run backend
```
or

```
devspace run frontend
```

respectively. It's also possible to fire one-off commands inside the containers.
If you want `flake8` to inspect the code quality inside the backend container,
you may do so by executing

```
devspace run backend -- flake8
```

## Running tests and linters

There are shortcuts for frequent commands (tests & linting) for the backend
container.
If you stop the logs streaming or open up another terminal window, you may
enter
```
devspace run test
```

to let the tests run inside the backend container. If you wish to run linting
checks (black + flake8), execute
```
devspace run lint
```

