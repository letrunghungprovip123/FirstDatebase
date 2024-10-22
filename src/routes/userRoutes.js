import express from "express";
import {
  createUser,
  getUserDB,
  getUsers,
  getUserOrm,
  getUserOrmById,
  createUserOrm,
} from "../controllers/userControllers.js";
import { middlewareToken } from "../config/jwt.js";

const userRoutes = express.Router();

userRoutes.get("/get-users", getUsers);
userRoutes.post("/create-user", createUser);
userRoutes.get("/get-user-db", getUserDB);
userRoutes.get("/get-user-orm", getUserOrm);
userRoutes.get("/get-user-orm/:id", getUserOrmById);
userRoutes.post("/create-user-orm", middlewareToken, createUserOrm);
export default userRoutes;