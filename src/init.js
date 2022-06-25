import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";
import "dotenv/config";

const PORT = 4000;

const handleListening = () => {
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);
};

app.listen(process.env.PORT || PORT, handleListening);
