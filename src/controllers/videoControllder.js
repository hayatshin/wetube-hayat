import Video from "../models/Video";

const pageSize = 20;
let page = null;
let limit = null;
let offset = null;
let lastPage = null;
let videos = null;

export const getVideo = async (req, res) => {
  try {
    page = req.query.page || 1;
    limit = page * pageSize;
    offset = limit - pageSize + 1;
    const totalVideo = await Video.find({});
    const totalVideoCount = totalVideo.length;
    videos = await Video.find({}).skip(offset).limit(limit);
    lastPage = Math.ceil(totalVideoCount / pageSize);
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
  await Video.create({
    title,
    date,
    file: location,
    show: false,
  });
  const videos = await Video.find({});
  return res.render("guitarVideo", { pageTitle: "연습장", videos });
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  page = req.query.page;
  await Video.findByIdAndDelete(id);
  return res.redirect(`/video?page=${page}`);
};

export const showVideo = (req, res) => {
  const { id } = req.params;
  page = req.query.page;
  try {
    Video.findById(id, function (err, video) {
      video.show = !video.show;
      video.save();
      res.redirect(`/video?page=${page}`);
    });
  } catch (e) {
    console.log(e);
  }
};
