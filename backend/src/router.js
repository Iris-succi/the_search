const express = require("express");
const multer = require("multer");
// On définit la destination de stockage de nos fichiers
const upload = multer({ dest: process.env.UPLOAD_DIR });
const router = express.Router();

const userController = require("./controllers/userController");
const visitedController = require("./controllers/visitedController");
const authController = require("./controllers/authController");
const commentController = require("./controllers/commentController");
const fileController = require("./controllers/fileController");
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
router.get("/api/users/bytoken", verifyToken, userController.findByToken);
router.put("/api/users/modify", userController.edit);
router.get("/api/users/:id", userController.browse);

// Route for favorite
router.get("/api/favorites", verifyToken, favoriteController.getFavorites);
router.post("/api/addfavorite", verifyToken, favoriteController.addFavorite);
router.delete(
  "/api/favorites/:id",
  verifyToken,
  favoriteController.deleteFavorite
);

// Route for spots visited
router.get("/api/spots-visited", verifyToken, visitedController.getSpotVisited);

// Route for spot
router.get("/api/spots", verifyToken, spotController.browse);
router.get("/api/spots/:id", verifyToken, spotController.read);

// Route for comment
router.post(
  "/api/spots/:id/comment",
  verifyToken,
  commentController.addComment
);

// Routes for update avatar
router.post(
  "/api/avatar",
  verifyToken,
  upload.single("avatar"),
  fileController.renameAvatar,
  userController.updateAvatar
);
router.get("/api/avatar/:fileName", fileController.sendAvatar);

module.exports = router;
