const admin_accounts = require("../../model/model.jsx");

module.exports = async (_id) => {
  try {
    await admin_accounts.deleteOne({ _id });

    return true;
  } catch (err) {
    return false;
  }
};
