const news = require("../../model/newsmodel.jsx");

exports.getnews = async (req, res, next) => {
  try {
    const results = await news.find();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error fetching data", error: err.message });
    next(err);
  }
};

exports.getnewsLimit = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 4; // Default to 4 if no limit is provided in the query parameters
    const results = await news.find().limit(limit);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error fetching data", error: err.message });
    next(err);
  }
};

exports.createnews = async (req, res, next) => {
  const { title, description, date, activation, body } = req.body;
  

  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res
        .status(400)
        .json({ status: "error", message: "No file uploaded" });
    }

    const imageName = req.file.filename;

    // Create new news entry
    const newNews = new news({
      title,
      image: imageName,
      description,
      date,
      activation,
      body,
    });

    // Save new news entry to database
    await newNews.save();

    res.status(201).json({ message: "News created successfully" });
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

exports.createnews1 = async (req, res, next) => {
  res.json({ message: "okay" });
};

exports.validation = async (req, res) => {
  const { _id, set } = req.body;
  console.log(set);

  if (!_id) {
    return res.status(400).send({ message: "Invalid ID provided" });
  }

  const results = await news.updateOne({ _id }, { $set: set });

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
};

exports.update = async (req, res, next) => {
  const { _id, set } = req.body;
  try {
    await news.updateOne({ _id }, { $set: set });
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
    next(err);
  }
};



exports.delete = async (req, res, next) => {
  const { _id } = req.body;

  const results = await news.deleteOne({ _id });

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
};

// // Define the route to handle file uploads
// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
// // Log information about the uploaded file

//     // Handle the file upload process (e.g., save to database, process further)
//     // Example: Save filename to a database
//     if (!req.file) {
//             console.log("No file uploaded");
//             return res.status(400).json({ status: "error", message: "No file uploaded" });
//           }

//     // res.status(200).json(req.file);
//     const imageName = req.file.filename;
//     try{
//       await Images.create({image:imageName})
//       res.send({ imageUrl: `${req.file.filename}` });
//     }
//     catch (error) {
//       res.json({status: error})
//     }
//   } catch (error) {
//     console.log(req.body); // Log any additional form data sent with the request
//     console.log(req.file);
//     console.error("Error uploading file:", error);
//     res.status(500).json({ error: error.message });
//   }
// });
