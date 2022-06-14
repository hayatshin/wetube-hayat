import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
require("dotenv").config();

const s3 = new aws.S3({
  credentials: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const multerUploader = multerS3({
  s3: s3,
  bucket: "practiceguitar",
});

export const upload = multer({ dest: "uploads/", storage: multerUploader });
