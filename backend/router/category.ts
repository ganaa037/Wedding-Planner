import express from "express";
import {
  createCategory,
  getCategory,
  getCategoryById,
} from "../controller/category.ts";

export const categoryRouter = express.Router();

categoryRouter
  .post("/", createCategory)
  .get("/", getCategory)
  .get("/", getCategoryById);
