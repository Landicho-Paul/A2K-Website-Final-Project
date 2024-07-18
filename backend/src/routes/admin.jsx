const express = require("express");
const router = express.Router();

const adminAcount = require("../model/model.jsx");

const CreateService = require("../services/admin/Create.jsx");
const RetrieveService = require("../services/admin/Retrieve.jsx");
const UpdateService = require("../services/admin/Update.jsx");
const DeleteService = require("../services/admin/Delete.jsx");
const NewsValidation = require("../services/validation/NewsValiidation.jsx");
const GettingCurrentlog = require("../services/fetching/fetchingUserCredential.jsx");
const path = require("path");

const Images = require("../../imageDetails.jsx");
// mongoose.model("ImageDetails");

router.post("/create", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const result = await CreateService(firstname, lastname, email, password);

  if (result) {
    res.status(200).send({
      status: result,
      message: "Successfully Created!",
    });
  } else {
    res.status(500).send({
      status: result,
      message: "Not Created!",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const existingAccount = await AdminAccount.findOne({
      email: req.body.email,
    });
    if (existingAccount) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const newAdminAccount = await AdminAccount.create(req.body);
    res.status(201).json({
      success: true,
      message: "Admin account successfully created",
      data: newAdminAccount,
    });
  } catch (err) {
    let message = "Something went wrong";
    if (err.name === "ValidationError") {
      message = "Validation error: " + err.message;
    }

    res.status(400).json({
      success: false,
      message: message,
      error: err,
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  adminAcount.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The Password is incorrect ");
      }
    } else {
      res.json("No record existed");
    }
  });
});

router.get("/fetch", async (req, res) => {
  const results = await RetrieveService();

  if (results) {
    res.status(200).send(results);
  } else {
    res.status(500).send({
      status: results,
      message: "Not Retrieved!",
    });
  }
});

// Make sure this path is correct

router.get("/get/:id", async (req, res) => {
  const routeId = req.params.id;
  console.log(routeId);
  try {
    const userData = await adminAcount.findById(routeId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.set("Access-Control-Allow-Origin", "*");
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

// router.get('/get/:_id', async (req, res) => {
//   const { _id } = req.params; // Correctly destructure as _id
//   console.log('Fetching user with ID:', _id);

// });

router.get("/fetch2", async (req, res) => {
  const { email } = req.query;
  const results = await GettingCurrentlog(email);

  if (results) {
    res.status(200).send(results);
  } else {
    res.status(500).send({
      status: results,
      message: "Not Retrieved!",
    });
  }
});

router.post("/update", async (req, res) => {
  const { _id, set } = req.body;

  const results = await UpdateService(_id, set);

  if (results) {
    res.status(200).send({
      status: results,
      message: "Successfully Updated!",
    });
  } else {
    res.status(500).send({
      status: results,
      message: "Not Updated!",
    });
  }
});

router.post("/delete", async (req, res) => {
  const { _id } = req.body;

  const results = await DeleteService(_id);

  if (results) {
    res.status(200).send({
      status: results,
      message: "Successfully Deleted!",
    });
  } else {
    res.status(500).send({
      status: results,
      message: "Not Deleted!",
    });
  }
});

//Validation Routes

router.post("/newsvalidation", async (req, res) => {
  const { _id, set } = req.body;

  if (!_id) {
    return res.status(400).send({ message: "Invalid ID provided" });
  }

  const results = await NewsValidation(_id, set);

  if (results) {
    res.status(200).send({
      status: results,
      message: "Successfully Updated!",
    });
  } else {
    res.status(500).send({
      status: results,
      message: "Not Updated!",
    });
  }
});

//////////////////////////////////////////////////////////////

const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {

//     if (!req.file) {
//       console.log("No file uploaded");
//       return res.status(400).json({ status: "error", message: "No file uploaded" });
//     }

//     const imageName = req.file.filename;

//     await Images.create({ image: imageName });
//     res.status(200).json({ status: "ok" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: "error", message: error.message });
//   }
// });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/image"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Define the route to handle file uploads
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Log information about the uploaded file

    // Handle the file upload process (e.g., save to database, process further)
    // Example: Save filename to a database
    if (!req.file) {
      console.log("No file uploaded");
      return res
        .status(400)
        .json({ status: "error", message: "No file uploaded" });
    }

    // res.status(200).json(req.file);
    const imageName = req.file.filename;
    try {
      await Images.create({ image: imageName });
      res.send({ imageUrl: `${req.file.filename}` });
    } catch (error) {
      res.json({ status: error });
    }
  } catch (error) {
    console.log(req.body); // Log any additional form data sent with the request
    console.log(req.file);
    console.error("Error uploading file:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/getdata", (req, res) => {
  Images.find()
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

module.exports = router;
