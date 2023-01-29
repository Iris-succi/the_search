const express = require("express");

const router = express.Router();

const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const { hashPassword, verifyPassword } = require("./middleware/auth");

// Route for login
router.post(
  "/api/login",
  authController.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Route for user
router.post("/api/user/inscription", hashPassword, userController.add);

module.exports = router;
