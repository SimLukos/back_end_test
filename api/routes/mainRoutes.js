const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  SIGN_UP,
  LOGIN,
  NEW_TOKEN,
  GET_ALL_USERS,
} = require("../controllers/user");

router.post("/signUp", SIGN_UP);
router.post("/login", LOGIN);
router.post("/getNewJwtToken", NEW_TOKEN);
router.post("/getAllUsers", auth, GET_ALL_USERS);

module.exports = router;
