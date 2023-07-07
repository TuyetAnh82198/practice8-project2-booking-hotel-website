const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserModel = require("../models/user");

const signup = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    const existingUser = await UserModel.findOne({
      username: req.body.username,
    }).exec();
    // console.log(existingUser);
    if (!existingUser) {
      const newUser = new UserModel({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.username,
        isAdmin: false,
      });
      newUser.save();
      return res.redirect("http://localhost:3000/login");
    } else {
      return res.status(409).json({ message: "Existing user" });
    }
    // console.log(req.body);
  } catch (err) {
    console.log(err);
  }
};

module.exports = signup;
