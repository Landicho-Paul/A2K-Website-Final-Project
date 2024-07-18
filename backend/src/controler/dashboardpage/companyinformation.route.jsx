const Dasboardpage = require("../../model/companyinformation.jsx");



  exports.update = async (req, res, next) => {
    const { _id, set } = req.body;
    try {
      await Dasboardpage.updateOne({ _id }, { $set: set });
      res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error updating user", error: err.message });
      next(err);
    }
  };



  exports.fetch = async (req, res, next) => {
    try {
        const results = await Dasboardpage.find();
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching data", error: err.message });
        next(err);
    }
};


  





exports.create = async (req, res, next) => {
    const { name, email, hotline, viber, whatsapp, location,bussinesshour } = req.body;
  
    try {
     
  
      // Create new user
      const newUser = new Dasboardpage({
        name,
        email,
        hotline,
        viber,
        whatsapp,
        location,
        bussinesshour,

      });
  
      // Save new user to database
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      next(err); // Pass error to error handling middleware
    }
  };