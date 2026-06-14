import express from "express";
import cors from "cors";

import helmet from "helmet";
import morgan from "morgan";
import passport from "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";
import dietRoutes from "./routes/diet.routes.js";
import  "@dotenvx/dotenvx/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/diet", dietRoutes);

export default app;