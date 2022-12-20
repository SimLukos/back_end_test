const express = require("express");
const router = express.Router();
const { CREATE_TICKET, BUY_TICKET } = require("../controllers/ticket");
const auth = require("../middleware/auth");

router.post("/ticket", CREATE_TICKET);
router.post("/buyTicket", auth, BUY_TICKET);

module.exports = router;
