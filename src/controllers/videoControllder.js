import Video from "../models/Video";

const pageSize = 20;

export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const getVideo = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = page * pageSize;
    const offset = limit - pageSize + 1;
    const totalVideo = await Video.find({});
    const totalVideoCount = totalVideo.length;
    const videos = await Video.find({}).skip(offset).limit(limit);
    const lastPage = Math.ceil(totalVideoCount / pageSize);
    return res.render("guitarVideo", {
      pageTitle: "Guitar",
      videos,
      limit,
      offset,
      lastPage,
      page,
    });
  } catch (e) {
    console.log(e);
  }
};

export const postVideo = async (req, res) => {
  const { date, title } = req.body;
  const { location } = req.file;
  console.log(date, title, location);
  await Video.create({
    title,
    date,
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
      console.log(video.show);
      res.redirect("/video");
    });
  } catch (e) {
    console.log(e);
  }
};

export const pageVideo = (req, res) => {
  console.log(req.query);
  res.redirect("/video");
};
