# CRUD React Demo Application

Table of Contents
=================

* [Prerequisites](#prerequisites)
* [Install](#install)
* [Run](#run)
* [Build](#build)
* [Test](#test)
* [Debug](#debug)
* [Resources](#resources)

## Prerequisites

You need to have the following programs installed on your machine:
- [Node.js](https://nodejs.org/) (>= 8.11.3)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

You have to use _docker-compose_ in order to build and run the multi-container server application which includes a test PostgreSQL database and a Node.js server which provides the API. The provided `docker-compose.yml` relies on 2 environment files which have to be configured the following way:

_.env.db_:
```sh
POSTGRES_USER=postgres
POSTGRES_PASSWORD=pw
POSTGRES_DB=testdb
```

_.env.server_:
```sh
# Must match the service name of the database in docker-compose.yml
DATABASE_HOST=db

# Must match POSTGRES_USER in .env.db if other than postgres
DATABASE_USER=

# Must match POSTGRES_PASSWORD in .env.db if other than pw
DATABASE_PASSWORD=

# Must match POSTGRES_DB in .env.db if other than testdb
DATABASE_DB=

# If you have an OAuth GitHub Application then you can provide its client id and secret. The callback URL of your app must be set to: http://localhost:3000/api/v1/auth/github/callback
# GITHUB_CLIENT_ID=g17hu8cl13n71d
# GITHUB_CLIENT_SECRET=g17hu8cl13n753cr37

# If you want to use a fake authentication
NODE_ENV=test
```

## Install

```sh
yarn
```

## Run

```sh
yarn start
```

## Build

```sh
yarn build
```

## Test

```sh
yarn test

# With coverage report
yarn test:coverage
```

## Debug

Instructions for debugging in _VS Code_:

TODO

## Resources

- [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
- [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)
- [create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md)
- [Enzyme](http://airbnb.io/enzyme/)
- [Google Fonts](https://fonts.google.com/)
- [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts)
- [Jest](https://jestjs.io/docs/en/api)
- [reactstrap](https://reactstrap.github.io/)