import Video from "../models/Video";

export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const getVideo = async (req, res) => {
  const videos = await Video.find({});
  return res.render("guitarVideo", { pageTitle: "Guitar", videos });
};

export const postVideo = async (req, res) => {
  const { email, password, date, title, file } = req.body;
  await Video.create({
    title,
    date,
    file,
    show: false,
  });
  return res.redirect("/video");
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/video");
};

export const showVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await Video.findById(id, function (err, video) {
      video.show = !video.show;
      video.save(function (err) {
        if (err) {
          console.error("ERROR!");
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
  return res.redirect("/video");
};
