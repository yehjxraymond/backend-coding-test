# Opinions

## Typescript

Typescript is a gift that keeps giving. Seeing that the code base is in the infancy stage, it is best to get started with migrating it to typescript. For that reason, it is the first thing I chose to work on.

## Dev Feedback Loop

To keep the feedback loop really short, `nodemon` is used in conjunction with `ts-node` to keep the dev server running. The choice of ts-node was because it is much faster than waiting for `tsc` to build and the server to start.

Use `npm run dev` to get the server running in the dev mode where it watches for changes in the src directory and reruns the server.

## Different Types of Testing

To keep the feedback loop for developers short, unit test should be plenty and it should run without the server actually running. To do that we will need to separate integration test from unit tests and run them separately.

Finally, load test should be kept separately from the integration or unit test as it's purpose is not to test for implementation correctness.

`npm run test` to run unit test
`npm run test:watch` to run unit test in watch mode
`npm run test:integration` to run integration test

## Handler Boundary

With a handler boundary to handle `res.send`, depending if the handler returns a result in a successful call or throws an error during an unsuccessful call, will allow developers writing functions to focus on the matter at hand. That is to implement the function correctly without concerns about the request/response layer of the application.

Compared to previous implementations, we can now throw an error immediately to terminate the function flow and there will be no risk of not returning the function after res.send, causing subsequent statements to execute.

## DB as a Service

The DB object does not have to be passed around from the initialization stage to the handler functions. Rather, it can be exposed as a service to the different handlers directly without being passed around as an argument.

One may argue that testing will be easier when DB is passed in as an object using dependency injection, but with mocks, the same can be achieved easily.

## Test setup

Mocha + NYC + Chai = Jest

If given the ability to choose the test runner, I will pretty much prefer Jest as it requires very little setup. Aside from that it has expect and code coverage out of the box. The cherry on top will be it's CLI which allows a developer to run various subset of tests, for instance:

- only changed files since last commit
- regex filter on files to run

## SonarQube

## Code as Documentation

## Load Testing
