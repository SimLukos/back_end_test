const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  title: { type: String, required: true, default: "Tarpmiestinis maršrutas" },
  ticket_price: { type: Number, required: true },
  from_location: { type: String, required: true },
  to_location: { type: String, required: true },
  to_location_photo_url: { type: String, required: true },
  id: { type: String, required: false },
});

module.exports = mongoose.model("Ticket", ticketSchema);
