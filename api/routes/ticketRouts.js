const express = require("express");
const router = express.Router();
const { BUY_TICKET } = require("../controllers/ticket");
const auth = require("../middleware/auth");

router.post("/buyTicket", auth, BUY_TICKET);

module.exports = router;
