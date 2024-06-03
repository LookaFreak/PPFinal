const express = require("express");
const {
  LoginController,
  RegisterController,
  AuthController,
  getUserController,
} = require("../controllers/authController");
const { authenticate } = require("../midelwares/authentication");

const router = express.Router();

// Login user
router.post("/login", LoginController);

// Register user
router.post("/register", RegisterController);

// Home // Auth
router.post("/setUserData", authenticate, AuthController);
// get user by id
router.get("/getuser", authenticate, getUserController);

module.exports = router;
