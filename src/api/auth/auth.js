const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  forgotUser,
  resetUser,
} = require("./controllers/login");
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);
router.post("/forgotUser", forgotUser);
router.post("/resetUser", resetUser);

module.exports = router;
