const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  SIGN_UP,
  LOGIN,
  NEW_TOKEN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
} = require("../controllers/user");

router.post("/signUp", SIGN_UP);
router.post("/login", LOGIN);
router.post("/getNewJwtToken", NEW_TOKEN);
router.get("/getAllUsers", auth, GET_ALL_USERS);
router.get("/getUserById", auth, GET_USER_BY_ID);

module.exports = router;
