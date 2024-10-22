import express from "express";
import {
  getVideos,
  getTypes,
  getTypesID,
  getVideoById,
} from "../controllers/videoControllers.js";
import { middlewareToken } from "../config/jwt.js";

const videoRoutes = express.Router();

// define API get list videos

videoRoutes.get("/get-videos", getVideos);

videoRoutes.get("/get-types", middlewareToken, getTypes);

videoRoutes.get("/get-types/:id", getTypesID);

videoRoutes.get("/get-video/:videoID", getVideoById);
export default videoRoutes;
