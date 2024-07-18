const admin_accounts = require("../../model/model.jsx");

module.exports = async (_id, set) => {
  try {
    await admin_accounts.updateOne({ _id }, { $set: set });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
