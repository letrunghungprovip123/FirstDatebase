import express from "express";
import {
  getVideos,
  getTypes,
  getTypesID,
  getVideoById,
} from "../controllers/videoControllers.js";
import { middlewareToken } from "../config/jwt.js";
import { tryCatch } from "../config/tryCatch.js";

const videoRoutes = express.Router();

// define API get list videos

videoRoutes.get("/get-videos", tryCatch(getVideos));

videoRoutes.get("/get-types", tryCatch(getTypes));

videoRoutes.get("/get-types/:id", getTypesID);

videoRoutes.get("/get-video/:videoID", getVideoById);
export default videoRoutes;
