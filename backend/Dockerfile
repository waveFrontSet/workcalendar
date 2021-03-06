# `python-base` sets up all our shared environment variables
FROM python:3.9.6-slim as python-base

    # python
ENV PYTHONUNBUFFERED=1 \
    # prevents python creating .pyc files
    PYTHONDONTWRITEBYTECODE=1 \
    \
    # pip
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    \
    # poetry
    # https://python-poetry.org/docs/configuration/#using-environment-variables
    POETRY_VERSION=1.1.6 \
    # make poetry install to this location
    POETRY_HOME="/opt/poetry" \
    # make poetry create the virtual environment in the project's root
    # it gets named `.venv`
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    # do not ask any interactive question
    POETRY_NO_INTERACTION=1 \
    \
    # paths
    # this is where our requirements + virtual environment will live
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"

# prepend poetry and venv to path
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"
ENTRYPOINT ["./bootstrap.sh"]
EXPOSE 5000

# `builder-base` stage is used to build deps + create our virtual environment
FROM python-base as builder-base
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # deps for installing poetry
        curl \
        # deps for psycopg2
        libpq-dev \
        # deps for building python deps
        build-essential \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*
# install poetry - respects $POETRY_VERSION & $POETRY_HOME
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
# copy project requirement files here to ensure they will be cached.
WORKDIR $PYSETUP_PATH
COPY poetry.lock pyproject.toml ./
# install runtime deps - uses $POETRY_VIRTUALENVS_IN_PROJECT internally
RUN poetry install --no-dev

FROM python-base as development
ENV ENVIRONMENT=development
WORKDIR $PYSETUP_PATH
# copy in our built poetry + venv
COPY --from=builder-base $POETRY_HOME $POETRY_HOME
COPY --from=builder-base $PYSETUP_PATH $PYSETUP_PATH
# quicker install as runtime deps are already installed
RUN poetry install
COPY --from=builder-base /usr/lib /usr/lib
COPY --from=builder-base /lib /lib
# will become mountpoint of our code
WORKDIR /app
COPY ./workcalendar /app/workcalendar
COPY ./apps /app/apps
COPY bootstrap.sh manage.py setup.cfg /app/
RUN chmod +x ./bootstrap.sh
CMD ["run_locally"]

# `production` image used for runtime
FROM python-base as production
ENV ENVIRONMENT=production
COPY --from=builder-base $PYSETUP_PATH $PYSETUP_PATH
COPY --from=builder-base /usr/lib /usr/lib
COPY --from=builder-base /lib /lib
WORKDIR /app
COPY ./workcalendar /app/workcalendar
COPY ./apps /app/apps
COPY bootstrap.sh manage.py /app/
RUN chmod +x ./bootstrap.sh
CMD ["run"]
