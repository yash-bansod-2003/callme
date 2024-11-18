import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import usersRouter from "@/routes/users.router.js";

import globalErrorHandler from "@/middlewares/error-handler.js";

export const createServer = (): Application => {
  const app = express();
  app
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    .use(helmet({ contentSecurityPolicy: false }))
    .use(morgan("dev"))
    .use(express.json())
    .use(express.static("public"))
    .get("/status", (_, res) => {
      res.json({ ok: true });
    })
    .get("/message/:name", (req, res) => {
      res.json({ message: `hello ${req.params.name}` });
    })
    .use("/users", usersRouter)
    .use(globalErrorHandler);
  return app;
};
