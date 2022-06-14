import express from "express";
import { getSignUp } from "../controllers/userController";
import {
  getVideo,
  home,
  postVideo,
  deleteVideo,
  showVideo,
} from "../controllers/videoControllder";
import { upload } from "../middlewares";

const globalRouter = express.Router();

globalRouter.route("/").get(home);
globalRouter
  .route("/video")
  .get(getVideo)
  .post(upload.single("file"), postVideo);
globalRouter.route("/sign-up").get(getSignUp);
globalRouter.route("/:id([0-9a-f]{24})/show").get(showVideo);
globalRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);

export default globalRouter;
