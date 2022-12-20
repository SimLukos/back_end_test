const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  SIGN_UP,
  LOGIN,
  NEW_TOKEN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  GET_ALL_WITH_TICKETS,
  GET_USER_BY_ID_WITH_TICKETS,
} = require("../controllers/user");

router.post("/signUp", SIGN_UP);
router.post("/login", LOGIN);
router.post("/getNewJwtToken", NEW_TOKEN);
router.get("/getAllUsers", auth, GET_ALL_USERS);
router.get("/getUserById", auth, GET_USER_BY_ID);
router.get("/getAllUsersWithTickets", auth, GET_ALL_WITH_TICKETS);
router.get("/getUserByIdWithTickets", auth, GET_USER_BY_ID_WITH_TICKETS);

module.exports = router;
