export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const getVideo = (req, res) => {
  return res.render("guitarVideo", { pageTitle: "Guitar" });
};

export const postVideo = async (req, res) => {
  const { email, password, date, title } = req.body;
  return res.render("guitarVideo", { pageTitle: "Guitar", date, title });
};
