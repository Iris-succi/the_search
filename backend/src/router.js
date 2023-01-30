const express = require("express");

const router = express.Router();

const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const favoriteController = require("./controllers/favoriteController");
const spotController = require("./controllers/spotController");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./middleware/auth");

// Route for login
router.post(
  "/api/login",
  authController.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword,
  verifyToken
);

// Route for user
router.post("/api/user/inscription", hashPassword, userController.add);
router.get("/api/user/:id", userController.browse);
router.get("/api/user/bytoken", verifyToken, userController.findByToken);

// Route for favorite
router.get("/api/user/:id/favorites", favoriteController.getFavorites);

// Route for spot
router.get("/api/spots", spotController.browse);

module.exports = router;
