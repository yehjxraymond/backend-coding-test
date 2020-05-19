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
