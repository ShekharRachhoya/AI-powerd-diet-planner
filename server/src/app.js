import express from "express";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";

import corsOptions from "./config/cors.js";
import routes from "./routes/index.routes.js";
import profileRoutes from
'./modules/profile/profile.routes.js';

import requestLogger from './middlewares/requestLogger.middleware.js'
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

import {
  swaggerDocs
}
from './docs/swagger.js';



const app = express();

app.use(helmet());
app.use(compression());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300
  })
);

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cookieParser());
app.use(
  rateLimit(100, 60)
);
app.use(requestLogger);


app.use(
  rateLimit(100, 60)
);

app.use("/api/v1", routes);




app.use(notFoundMiddleware);
app.use(errorMiddleware);

swaggerDocs(app);

export default app;