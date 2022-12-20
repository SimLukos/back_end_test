const TicketSchema = require("../models/ticketMod");

module.exports.CREATE_TICKET = (req, res) => {
  const ticket = new TicketSchema({
    ticket_price: req.body.ticket_price,
    from_location: req.body.from_location,
    to_location: req.body.to_location,
    to_location_photo_url: req.body.to_location_photo_url,
  });

  ticket.save().then(() => {
    return res.status(200).json({ Message: "Ticket saved." });
  });
};
