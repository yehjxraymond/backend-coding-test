# Coding Exercise - Rides API

[![CircleCI](https://circleci.com/gh/yehjxraymond/backend-coding-test.svg?style=svg)](https://circleci.com/gh/yehjxraymond/backend-coding-test)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=yehjxraymond_backend-coding-test&metric=alert_status)](https://sonarcloud.io/dashboard?id=yehjxraymond_backend-coding-test) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=yehjxraymond_backend-coding-test&metric=coverage)](https://sonarcloud.io/dashboard?id=yehjxraymond_backend-coding-test)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=yehjxraymond_backend-coding-test&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=yehjxraymond_backend-coding-test) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=yehjxraymond_backend-coding-test&metric=security_rating)](https://sonarcloud.io/dashboard?id=yehjxraymond_backend-coding-test) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=yehjxraymond_backend-coding-test&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=yehjxraymond_backend-coding-test)

## Introduction

This repository holds the code for the backend of the Rides application. The application exposes several APIs for frontend clients to easily query and create new ride information.

## Setup

```sh
git clone https://github.com/yehjxraymond/backend-coding-test.git
npm i
```

### Starting the Server (production build)

```sh
npm run build
npm run start
```

### API Documentation (with Swagger)

![Swagger API](./assets/swagger.png)

To understand and interact with the API with Swagger, run the following commands (your API must be running separately):

```sh
npm run swagger:server
open http://localhost:8080
```

### Running Tests

Below commands runs unit test, integration test and code lint respectively.

```sh
npm run test
npm run test:integration
npm run lint
```

### Development

For hot reloading and faster development environment, run the following to start the dev server:

```sh
npm run dev
```
