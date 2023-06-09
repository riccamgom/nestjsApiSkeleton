[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Skeleton Backend API<a href="http://nodejs.org" target="_blank">NestJS</a> framework for building efficient and scalable server-side applications with relational DB (MySQL, PostgreSQL).</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
</p>

<p align="center">
NestJs Flow
</p>

<p align="center">
  <a href="#" target="blank"><img src="./nest_flow.jpeg" alt="NestFlow" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# Open root directory and run a first install
$ npm install
```

## Docker

```bash
# Create .env.local / .env.prod / .env.docker files
#API DATA
PORT=2222

#DATABASE DATA
DATABASE_HOST=exampledb
DATABASE_PORT=3306
DATABASE_USERNAME=test
DATABASE_PASSWORD=test
DATABASE_DATABASE=example
DATABASE_SYNC=true

#JWT DATA & TIME
JWT_SECRET = example
#Time in seconds
JWT_ACCESS_EXPIRATION_TIME = 600s
JWT_DATE_EXPIRATION_TIME = 60
```

## Running the app

```bash
#To run the api local or in production

## development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
#To run tests for the API

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

NestJs Skeleton API

## Stay in touch

- Author - Ricardo Campo

## License

Nest is [MIT licensed](LICENSE).
