import express from "express";
import {
  signUp,
  signIn,
  loginFacebook,
  forgotPassword,
  changePassword
} from "../controllers/authController.js";
const authRoutes = express.Router();

authRoutes.post("/sign-up", signUp);

authRoutes.post("/sign-in", signIn);

//define API login facebook

authRoutes.post("/login-facebook", loginFacebook);

authRoutes.post("/forgot-password", forgotPassword);

authRoutes.post("/change-password",changePassword);
export default authRoutes;
