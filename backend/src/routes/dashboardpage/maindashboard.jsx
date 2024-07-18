const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createWallpaper,
  getWallpaper,
  fetch,
  update,
  delete: del,
  createSpecialize,
  getSpecialize,
  deleteSpecialize,
  createBoard,
  getBoard,
  deleteBoard
} = require("../../controler/dashboardpage/maindashboard.route.jsx");

//WallPaper
router.get("/getwallpaper", getWallpaper);

router.post("/update", update);
router.post("/delete", del);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../public/image/wallpaper"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
router.post("/createwallpaper", upload.single("image"), createWallpaper);

//Specialize

const storageSpecialize = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../public/image/Specialize"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploadSpecialize = multer({ storage: storageSpecialize });
router.post(
  "/createSpecialize",
  uploadSpecialize.single("image"),
  createSpecialize
);

router.get("/getSpecialize", getSpecialize);
router.post("/deleteSpecialize", deleteSpecialize);

const storageboard = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../public/image/boardmember"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploadboard = multer({ storage: storageboard });
router.post("/createBoard", uploadboard.single("image"), createBoard);

router.get("/getBoard", getBoard);

router.post("/deleteBoard", deleteBoard);

module.exports = router;
