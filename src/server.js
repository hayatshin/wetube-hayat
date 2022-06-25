import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import { localMiddleware } from "./middlewares";
require("dotenv").config();

const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(localMiddleware);
app.use(express.static("assets"));
app.use("/", globalRouter);
app.use(express.static("src"));

export default app;
