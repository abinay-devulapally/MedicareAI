const mongoose = require("mongoose");

const UserContextSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  context: { type: mongoose.Schema.Types.Mixed, default: {} },
});

module.exports = mongoose.model("UserContext", UserContextSchema);
