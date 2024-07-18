const admin_accounts = require("../../model/model.jsx");

module.exports = async () => {
  try {
    const results = await admin_accounts.findOne({email:email});

    return results;
  } catch (err) {
    return [];
  }
};