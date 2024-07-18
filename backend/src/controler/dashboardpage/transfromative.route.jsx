const TransformativeModel = require("../../model/tranformativeservicesmodel.jsx");
const multer = require("multer");
const path = require("path");

exports.gettrans = async (req, res, next) => {
  try {
    const results = await TransformativeModel.find();
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
  const { title, text, validation, secondarytitle, image } = req.body;
  

  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res
        .status(400)
        .json({ status: "error", message: "No file uploaded" });
    }

    const imageName = req.file.filename;

    // Create new news entry
    const newNews = new TransformativeModel({
      title,
      image: imageName,
      text,
      secondarytitle: secondarytitle,
      validation,
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
  

  if (!_id) {
    return res.status(400).send({ message: "Invalid ID provided" });
  }

  const results = await TransformativeModel.updateOne({ _id }, { $set: set });

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

exports.delete = async (req, res, next) => {
  const { _id } = req.body;



  const results = await TransformativeModel.deleteOne({ _id });

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


exports.update = async (req, res, next) => {
  const { _id, set } = req.body;
  try {
    await TransformativeModel.updateOne({ _id }, { $set: set });
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
    next(err);
  }
};