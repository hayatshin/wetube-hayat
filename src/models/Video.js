import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, index: true },
  date: { type: String, index: true },
  file: { type: String, index: true },
  show: { type: Boolean, index: true },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
