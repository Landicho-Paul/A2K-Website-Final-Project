const admin_accounts = require("../../model/model.jsx");

module.exports = async (email2) => {
  try {
    // Fetching user details from the database using the email as a parameter
    const results = await admin_accounts.findOne({ email:email2 });

    return results;
  } catch (err) {
    return [];
  }
};
