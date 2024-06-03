const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.LoginController = async (req, res) => {
  // Handle login
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User dose not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid Email or Password! please try again",
        success: false,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ success: true, message: "Login Successfully", token, user });
  } catch (error) {
    res
      .status(401)
      .send({ success: false, message: `Login failed ${error.message}` });
  }
};

exports.RegisterController = async (req, res) => {
  // Handle registration
  if (req.body.password == req.body.Cpassword) {
    try {
      const existUser = await userModel.findOne({ email: req.body.email });
      if (existUser) {
        res.status(201).send({ message: "User Already exist", success: false });
      }
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      req.body.password = hashPassword;
      const newUser = new userModel(req.body);
      const user = await newUser.save();
      res
        .status(200)
        .send({ message: "Registered Successfully", success: true, user });
    } catch (error) {
      res
        .status(401)
        .send({ success: false, message: `Register Failed ${error.message}` });
    }
  } else {
    res
      .status(201)
      .send({ message: "Password Dose not match", success: false });
  }
};

exports.AuthController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    // console.log(user);
    user.password = undefined;
    if (!user) {
      return res.status(401).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(201).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};

exports.getUserController = async (req, res) => {
  const id = req.body.userId;
  console.log(id);
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User dose not find! please try again",
      });
    }
    res.status(200).send({
      success: true,
      message: "User find successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: `Something went wrong ${error}`,
      success: false,
      error,
    });
  }
};
