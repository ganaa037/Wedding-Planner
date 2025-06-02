import express from "express";
import { createUser, getUser, getUserById } from "../controller/user.ts";

export const userRouter = express.Router();

userRouter.post("/", createUser).get("/", getUser).get("/:id", getUserById);
