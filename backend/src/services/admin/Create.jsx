const Admin = require("../../model/model.jsx"); // Adjust the path as necessary


module.exports = async (req,res, next) => {
  const {firstname, lastname, email, password} =req.body
  const hashedPassword = bycrypjs.hashSync(password, 10);
  const newUser = new Admin({firstname,lastname,password : hashedPassword})
  try {
    await Admin.save();
      res.status(201).json({messafe: 'User created successfully'});
    }catch (err) {
    next(err)
  }

 
};
