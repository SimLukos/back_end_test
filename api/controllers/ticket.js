const TicketSchema = require("../models/ticketMod");
const UserSchema = require("../models/userMod");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.BUY_TICKET = async (req, res) => {
  const ticket = new TicketSchema({
    ticket_price: req.body.ticket_price,
    from_location: req.body.from_location,
    to_location: req.body.to_location,
    to_location_photo_url: req.body.to_location_photo_url,
  });

  ticket.save().then(async (result) => {
    TicketSchema.updateOne({ _id: result._id }, { id: result._id }).exec();
    const ticketUpdated = await TicketSchema.find({ _id: result._id });
    const userId = req.body.user_id;

    const user = await UserSchema.findById(userId);
    console.log(user);
    console.log(ticketUpdated);

    if (user.money_balance < result.ticket_price) {
      res.status(400).json({ Message: "Insufficient funds." });
    } else {
      const newBalance = user.money_balance - result.ticket_price;

      await UserSchema.updateOne(
        { _id: user._id },
        {
          money_balance: newBalance,
          $push: { bought_tickets: ticketUpdated[0].id },
        }
      ).then(() => {
        return res.status(200).json({ Message: "Ticket was bought." });
      });
    }
  });
};
