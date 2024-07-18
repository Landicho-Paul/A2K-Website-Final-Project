const express = require("express");
const router = express.Router();
const multer = require('multer')
const path = require('path');
const {
  getnews,
  createnews,
  createnews1,
  validation,
  update,
  delete :DeleteNews,getnewsLimit
} = require("../../controler/dashboardpage/newsinformation.route.jsx");

router.get("/getnews", getnews);


router.get("/getnewsLimit", getnewsLimit);
router.post("/createnewss", createnews1);







// this route is for image download and save the image name in database

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../public/image/newsimage"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
router.post("/createnews", upload.single("image"), createnews);



router.post("/newsvalidation",validation);

router.post("/updatenews", update);

router.post("/deletenews", DeleteNews)




module.exports = router;
