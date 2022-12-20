const TicketSchema = require("../models/ticketMod");
const UserSchema = require("../models/userMod");
const jwt = require("jsonwebtoken");

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

module.exports.BUY_TICKET = async (req, res) => {
  const userId = req.body.user_id;
  const ticketId = req.body.ticket_id;

  const user = await UserSchema.findById(userId);
  const ticket = await TicketSchema.findById(ticketId);

  if (user.money_balance < ticket.ticket_price) {
    res.status(400).json({ Message: "Insufficient funds." });
  } else {
    const newBalance = user.money_balance - ticket.ticket_price;

    UserSchema.updateOne(
      { _id: userId },
      { money_balance: newBalance, $push: { bought_tickets: ticketId } }
    ).then(() => {
      return res.status(200).json({ Message: "Ticket was bought." });
    });
  }
};
