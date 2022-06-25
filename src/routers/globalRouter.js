import express from "express";
import {
  getSignUp,
  postSignUp,
  home,
  postLogIn,
} from "../controllers/userController";
import {
  getVideo,
  postVideo,
  deleteVideo,
  showVideo,
} from "../controllers/videoControllder";
import { uploadFiles } from "../middlewares";

const globalRouter = express.Router();

globalRouter.route("/").get(home).post(postLogIn);
globalRouter
  .route("/video")
  .get(getVideo)
  .post(uploadFiles.single("file"), postVideo);
globalRouter.route("/sign-up").get(getSignUp).post(postSignUp);
globalRouter.route("/:id([0-9a-f]{24})/show").get(showVideo);
globalRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);

export default globalRouter;
