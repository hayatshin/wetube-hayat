import Video from "../models/Video";

export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const getVideo = async (req, res) => {
  const videos = await Video.find({});
  return res.render("guitarVideo", { pageTitle: "Guitar", videos });
};

export const postVideo = async (req, res) => {
  const { date, title, type } = req.body;
  const { location } = req.file;
  await Video.create({
    title,
    date,
    type: "video",
    file: location,
    show: false,
  });
  const videos = await Video.find({});
  return res.render("guitarVideo", { pageTitle: "Guitar", videos });
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/video");
};

export const showVideo = (req, res) => {
  const { id } = req.params;
  try {
    Video.findById(id, function (err, video) {
      video.show = !video.show;
      video.save();
      console.log(video);
    });
    res.redirect("/video");
  } catch (e) {
    console.log(e);
  }
};
