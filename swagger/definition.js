module.exports = {
  info: {
    title: "Ride API",
    version: "1.0.0",
    description: "The ride API allows client to query for create and query for ride information."
  },
  basePath: "/",
  host: "localhost:8010",
  apis: ["src/handlers/**/*.ts"]
};
