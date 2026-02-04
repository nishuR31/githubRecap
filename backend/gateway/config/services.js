// Gateway service configuration
const SERVICES = {
  app: {
    name: "appService",
    port: process.env.APP_SERVICE_PORT || 4000,
    url: process.env.APP_SERVICE_URL || "http://localhost:4000",
    prefix: "/api/v1/app",
  },
  data: {
    name: "dataService",
    port: process.env.DATA_SERVICE_PORT || 4001,
    url: process.env.DATA_SERVICE_URL || "http://localhost:4001",
    prefix: "/api/v1/github",
  },
};

export default SERVICES;
