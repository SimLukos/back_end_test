const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  email: { type: String, required: true },
  password: { type: String, required: true, min: 15 },
  bought_tickets: { type: Array },
  money_balance: { type: Number, default: 100 },
});

module.exports = mongoose.model("User", userSchema);
