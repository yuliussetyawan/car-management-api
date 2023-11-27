const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Synergy API Docs",
      description: "API Documentations for Challenge 6",
      version: "1.0.0",
    },
    externalDocs: {
      description: "OpenAPI Specification",
      url: "https://swagger.io/specification/",
    },
  },
  apis: ["./src/swagger/**/*.yaml"],
};

export { swaggerConfig };
