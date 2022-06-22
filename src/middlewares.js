import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
require("dotenv").config();

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const multerUploader = multerS3({
  s3: s3,
  bucket: "practiceguitar",
  acl: "public-read",
});

export const uploadFiles = multer({
  // dest: "uploads/",
  limits: {
    fileSize: 10000000,
  },
  storage: multerUploader,
});
