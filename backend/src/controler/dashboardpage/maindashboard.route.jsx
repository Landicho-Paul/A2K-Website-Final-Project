
const Wallpaper = require("../../model/wallpaper.jsx");

const BoardMember = require("../../model/boardmember.jsx");

const Specialize = require("../../model/Specialized.jsx");


exports.getWallpaper = async (req, res, next) => {
  try {
    const results = await Wallpaper.find();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error fetching data", error: err.message });
    next(err);
  }
};
exports.createWallpaper = async (req, res, next) => {
  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ status: "error", message: "No file uploaded" });
    }

    const imageName = req.file.filename;

    // Create new wallpaper entry
    const newWallpaper = new Wallpaper({
      image: imageName   
    });

    // Save new wallpaper entry to database
    await newWallpaper.save();

    res.status(201).json({ message: "Wallpaper created successfully" });
  } catch (err) {
    console.error("Error in createWallpaper:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error", error: err.message });
    next(err); // Pass error to error handling middleware
  }
};

exports.update = async (req, res, next) => {
  const { _id, set } = req.body;
  try {
    await Wallpaper.updateOne({ _id }, { $set: set });
    res.status(200).json({ message: "Updated successfully" });
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

  const results = await Wallpaper.deleteOne({ _id });

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

//Specialize

exports.createSpecialize = async (req, res, next) => {
  const {text} = req.body
  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ status: "error", message: "No file uploaded" });
    }

    const imageName = req.file.filename;

    // Create new wallpaper entry
    const newWallpaper = new Specialize({
      image: imageName  ,
      text:text
    });

    // Save new wallpaper entry to database
    await newWallpaper.save();

    res.status(201).json({ message: "Created successfully" });
  } catch (err) {
    console.error("Error in createWallpaper:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error", error: err.message });
    next(err); // Pass error to error handling middleware
  }
};
//fetch specialize
exports.getSpecialize = async (req, res, next) => {
  try {
    const results = await Specialize.find();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error fetching data", error: err.message });
    next(err);
  }
};


exports.deleteSpecialize = async (req, res, next) => {
  const { _id } = req.body;

  const results = await Specialize.deleteOne({ _id });

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



exports.createBoard = async (req, res, next) => {
  const {name,position} = req.body
  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ status: "error", message: "No file uploaded" });
    }

    const imageName = req.file.filename;

    // Create new wallpaper entry
    const newWallpaper = new BoardMember({
      name,
      image:imageName,
      position,
    });

    // Save new wallpaper entry to database
    await newWallpaper.save();

    res.status(201).json({ message: "Created successfully" });
  } catch (err) {
    console.error("Error in createWallpaper:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error", error: err.message });
    next(err); // Pass error to error handling middleware
  }
};


//fetch board
exports.getBoard = async (req, res, next) => {
  try {
    const results = await BoardMember.find();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error fetching data", error: err.message });
    next(err);
  }
};


exports.deleteBoard = async (req, res, next) => {
  const { _id } = req.body;

  const results = await BoardMember.deleteOne({ _id });

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





