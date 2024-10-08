import express from "express";
import userRoutes from "./userRoutes.js";
import videoRoutes from "./videoRoutes.js";
import authRoutes from "./authRoutes.js";
const rootRoutes = express.Router();

rootRoutes.use("/user", userRoutes);

rootRoutes.use("/video", videoRoutes);

rootRoutes.use("/auth", authRoutes);

export default rootRoutes;
