const admin_accounts = require("../../model/model.jsx");

module.exports = async () => {
  try {
    const results = await admin_accounts.find();

    return results;
  } catch (err) {
    return [];
  }
};
