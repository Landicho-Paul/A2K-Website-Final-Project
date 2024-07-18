// import User from '../model/model'
const User = require("../model/model.jsx");
const bcryptjs = require("bcryptjs");
const { errorHandeler  } = require("../utils/error.jsx");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// import bcryptjs from 'bcrypt.js';

exports.signup = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      superadmin: "0",
      newsadmin: "0",
      informationadmin: "0",
      specializedadmin: "0",
      coverphotoadmin: "0",
    });

    // Save new user to database
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandeler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandeler(401, "Wrong redentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    //const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    const { password: hashedPassword, ...rest } = validUser._doc;
    
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(errorHandeler);
  }
};


exports.log = async (req, res, next) =>{
    
        const { email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        User.findOne({ email: email }).then((user) => {
          if (user) {
            if (user.password === hashedPassword) {
                
              res.json("Success");
            } else {
              res.json("The Password is incorrect ");
            }
          } else {
            res.json("No record existed");
          }
        });
    
}


