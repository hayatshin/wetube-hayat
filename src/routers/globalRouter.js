import express from "express";
import { getSignUp } from "../controllers/userController";
import { getVideo, home, postVideo } from "../controllers/videoControllder";

const globalRouter = express.Router();

globalRouter.route("/").get(home);
globalRouter.route("/video").get(getVideo).post(postVideo);
globalRouter.route("/sign-up").get(getSignUp);

export default globalRouter;
