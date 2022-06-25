import User from "../models/User";
import bcrypt from "bcrypt";

export const getSignUp = (req, res) => {
  return res.render("signUp", { pageTitle: "등록" });
};

export const postSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExists = await User.exists({ $or: [{ email }] });
    if (emailExists) {
      return res.status(400).render("signUp", {
        pageTitle: "등록",
        errorMessage: "이미 존재하는 이메일 입니다.",
      });
    }
    await User.create({
      email,
      password,
    });
    return res.redirect("/sign-up");
  } catch (e) {
    console.log(e);
  }
};

export const home = (req, res) => {
  const { JAVASCRIPT_KEY } = process.env;
  return res.render("home", { pageTitle: "로그인" });
};

export const postLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pageTitle = "로그인";
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render("home", {
        pageTitle,
        emailError: "이메일이 등록되어있지 않습니다.",
      });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).render("home", {
        pageTitle,
        passwordError: "잘못된 비밀번호 입니다.",
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/video");
  } catch (e) {
    console.log(e);
  }
};
