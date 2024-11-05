import express from "express";
import {
  signUp,
  signIn,
  loginFacebook,
  forgotPassword,
  changePassword,
  extendToken,
} from "../controllers/authController.js";
import { tryCatch } from "../config/tryCatch.js";
const authRoutes = express.Router();

authRoutes.post("/sign-up", signUp);

authRoutes.post("/sign-in", tryCatch(signIn));

//define API login facebook

authRoutes.post("/login-facebook", loginFacebook);

authRoutes.post("/forgot-password", forgotPassword);

authRoutes.post("/change-password", changePassword);

authRoutes.post("/extend-token", extendToken);
export default authRoutes;
