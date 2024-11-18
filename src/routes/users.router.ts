/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import UsersController from "@/controllers/users.controller.js";
import UsersService from "@/services/users.service.js";
import { AppDataSource } from "@/data-source.js";
import { User } from "@/entity/User.js";
import logger from "@/config/logger.js";

const router = Router();

const usersRepository = AppDataSource.getRepository(User);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService, logger);

router.post("/", usersController.create.bind(usersController));

router.get("/", usersController.findAll.bind(usersController));

router.get("/:id", usersController.findOne.bind(usersController));

router.put("/:id", usersController.update.bind(usersController));

router.delete("/:id", usersController.delete.bind(usersController));

export default router;
