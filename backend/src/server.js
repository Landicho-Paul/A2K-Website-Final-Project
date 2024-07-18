const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const usersRoute = require("./routes/admin.jsx");
const authRoutes = require("./routes/auth.jsx");
const dashboard = require("./routes/dashboardpage/companyinformation.jsx");
const newsInformation = require("./routes/dashboardpage/newsinformation.jsx")
const tranformative = require("./routes/dashboardpage/transforamative.jsx")
const maindashboard = require("./routes/dashboardpage/maindashboard.jsx")
const dotenv = require('dotenv');
dotenv.config();
// import userRoutes from './routes/admin.jsx';
// import authRoutes from './routes/auth.jsx';

const app = express();


/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes */

app.use("/admin_accounts/dashboard", dashboard);
app.use("/admin_accounts", usersRoute);
app.use("/admin_accounts/auth", authRoutes);
app.use("/admin_accounts/news", newsInformation);
app.use("/admin_accounts/trans", tranformative);
app.use("/admin_accounts/maindashboard", maindashboard);

/* Connection to MongoDB */
const dbConfig = "mongodb://localhost:27017";
const dbName = "a2k-cms";



mongoose.connect(`${dbConfig}/${dbName}`)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



app.use((err, reg, res, next) => {
  const statusCode = err.statusCode || 500;
  const message =  err.message || 'Ineternal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  })
 
})

