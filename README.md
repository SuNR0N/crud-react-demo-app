# CRUD React Demo Application

[![Build Status](https://travis-ci.org/SuNR0N/crud-react-demo-app.svg?branch=master)](https://travis-ci.org/SuNR0N/crud-react-demo-app)
[![Coverage Status](https://coveralls.io/repos/github/SuNR0N/crud-react-demo-app/badge.svg?branch=master)](https://coveralls.io/github/SuNR0N/crud-react-demo-app?branch=master)

Table of Contents
=================

* [Prerequisites](#prerequisites)
* [Install](#install)
* [Run](#run)
* [Build](#build)
* [Test](#test)
* [Lint](#lint)
* [Debug](#debug)
* [TODO](#todo)
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

# URL to redirect to after a successful authentication
REDIRECT_URL=/

# If you want to use a fake authentication
NODE_ENV=test
```

_Note_: If you're interested in the implementation details of the backend application then you can find it [here](https://github.com/SuNR0N/crud-server-demo-app)

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

## Lint

```sh
yarn lint

# With an attempt to fix selected rules
yarn lint:fix
```

## Debug

Instructions for debugging in _VS Code_:

```json
{
    "name": "Debug React",
    "type": "chrome",
    "request": "launch",
    "url": "http://localhost:3000",
    "webRoot": "${workspaceRoot}/src"
},
{
    "name": "Debug React Tests",
    "type": "node",
    "request": "launch",
    "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/react-scripts-ts",
    "args": [
        "test",
        "--runInBand",
        "--no-cache",
        "--env=jsdom"
    ],
    "cwd": "${workspaceRoot}",
    "protocol": "inspector",
    "console": "integratedTerminal",
    "internalConsoleOptions": "neverOpen"
},
{
    "name": "Debug Current React Test",
    "type": "node",
    "request": "launch",
    "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/react-scripts-ts",
    "args": [
        "test",
        "--env=jsdom",
        "${relativeFile}"
    ],
    "cwd": "${workspaceRoot}",
    "protocol": "inspector",
    "console": "integratedTerminal",
    "internalConsoleOptions": "neverOpen"
}
```

### React

1. Start the application with `yarn start`
2. Go to _Debug_ panel in VS Code and select `Debug React`
3. Click on _Start Debugging_
4. Set a breakpoint

### React Tests

1. Set a breakpoint
2. Go to _Debug_ panel in VS Code and select `Debug React Tests`
3. Click on _Start Debugging_

### Current React Test

1. Set a breakpoint in the currently opened test file
2. Go to _Debug_ panel in VS Code and select `Debug Current React Test`
3. Click on _Start Debugging_

## TODO

- [ ] Accessbility

## Resources

- [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
- [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)
- [create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md)
- [Enzyme](http://airbnb.io/enzyme/)
- [Google Fonts](https://fonts.google.com/)
- [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts)
- [Jest](https://jestjs.io/docs/en/api)
- [React Date Picker](https://github.com/Hacker0x01/react-datepicker)
- [react-redux-toastr](https://github.com/diegoddox/react-redux-toastr)
- [React-Select](https://github.com/JedWatson/react-select)
- [reactstrap](https://reactstrap.github.io/)
- [Redux Form](https://redux-form.com/)
- [Redux-Saga](https://github.com/redux-saga/redux-saga)