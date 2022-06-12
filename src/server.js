import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";

const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("src"));
app.use("/", globalRouter);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(process.env.PORT || PORT, handleListening);
