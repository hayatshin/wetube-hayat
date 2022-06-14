import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  date: String,
  file: String,
  show: Boolean,
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
