const mongoose = require("mongoose");

const MemeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meme", MemeSchema);

