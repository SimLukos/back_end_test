const express = require("express");
const router = express.Router();
const { CREATE_TICKET } = require("../controllers/ticket");

router.post("/ticket", CREATE_TICKET);

module.exports = router;
