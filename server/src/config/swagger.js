import swaggerUi from "swagger-ui-express";
import openapi from "../docs/openapi.js";

export const swaggerDocs = app => {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(openapi)
  );
};