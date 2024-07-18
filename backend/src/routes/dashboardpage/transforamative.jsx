const express = require("express");
const router = express.Router();

const multer = require('multer')
const path = require('path');
const {createnews,createnews1,gettrans,validation,delete:del,update} = require('../../controler/dashboardpage/transfromative.route.jsx');




router.get('/trying',createnews1)

router.get('/gettrans',gettrans)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../../public/image/trasformative"));
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: storage });


router.post('/createtrans' ,upload.single("image"),createnews)

router.post('/validation',validation)

router.post('/delete',del)

router.post('/update',update)


















module.exports = router;