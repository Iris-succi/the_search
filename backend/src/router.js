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
router.post("/api/users/inscription", hashPassword, userController.add);
router.get("/api/users/:id", verifyToken, userController.browse);
router.get("/api/users/bytoken", verifyToken, userController.findByToken);

// Route for favorite
router.get("/api/favorites", verifyToken, favoriteController.getFavorites);

// Route for spot
router.get("/api/spots", verifyToken, spotController.browse);
router.get("/api/spots/:id", verifyToken, spotController.read);

module.exports = router;
