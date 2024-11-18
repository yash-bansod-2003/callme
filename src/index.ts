import "reflect-metadata";
import http, { Server } from "http";
import { Application } from "express";
import * as socketIo from "socket.io";
import { createServer } from "@/server.js";
import configuration from "@/config/configuration.js";
import logger from "@/config/logger.js";

const port = configuration.port ? parseInt(configuration.port, 10) : 5000;
const host = configuration.host ?? "localhost";
const server: Application = createServer();
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const httpServer: Server = http.createServer(server);
const io = new socketIo.Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(port, host, () => {
  try {
    logger.info(`Server Listening on  http://${host}:${port}`);
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  }
});
