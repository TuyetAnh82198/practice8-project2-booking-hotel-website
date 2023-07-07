const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//lấy dữ liệu từ sessions trong mongodb

const { MongoClient } = require("mongodb");

const UserModel = require("../models/user");

const client = new MongoClient(
  "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
);

const loginGet = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("test");
    const coll = db.collection("sessions");
    const data = await coll.findOne();
    // console.log(data.session.isLoggedIn);
    if (data.session.isLoggedIn) {
      return res.status(200).json({ result: [data.session.user] });
    } else {
      return res.status(200).json({ result: [] });
    }
  } catch {
    (err) => console.log(err);
  } finally {
    await client.close();
  }
};
const loginGetForAdmin = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("test");
    const coll = db.collection("sessions");
    const data = await coll.findOne({ session: { user: { isAdmin: true } } });
    console.log(data);
    if (data.session.isLoggedIn) {
      return res.status(200).json({ result: [data.session.user] });
    } else {
      return res.status(200).json({ result: [] });
    }
  } catch {
    (err) => console.log(err);
  } finally {
    await client.close();
  }
};

const loginPost = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    //kiểm tra người dùng này đã đăng ký chưa
    let existingUser = await UserModel.findOne({
      username: req.body.username,
    }).exec();

    //kiểm tra mật khẩu có khớp không
    const isCorrectPassword = bcrypt.compareSync(
      req.body.password,
      existingUser.password
    );
    // console.log(existingUser, isCorrectPassword);

    if (isCorrectPassword) {
      //không hiện mật khẩu
      existingUser.password = undefined;
      req.session.isLoggedIn = true;
      req.session.user = existingUser;
      console.log(req.session.user);
      return res.redirect("http://localhost:3000/");
    } else {
      return res.status(409).json({ message: "Wrong username or password" });
    }
    // console.log(req.body);
  } catch (err) {
    console.log(err);
  }
};

const loginPostForAdmin = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    //kiểm tra người dùng này đã đăng ký chưa
    let existingUser = await UserModel.findOne({
      username: req.body.username,
      isAdmin: true,
    }).exec();

    if (existingUser) {
      //kiểm tra mật khẩu có khớp không
      const isCorrectPassword = bcrypt.compareSync(
        req.body.password,
        existingUser.password
      );
      // console.log(existingUser, isCorrectPassword);

      if (isCorrectPassword) {
        //không hiện mật khẩu
        existingUser.password = undefined;
        req.session.isLoggedIn = true;
        req.session.user = existingUser;
        console.log(req.session.user);
        return res.redirect("http://localhost:3001/");
      }
    } else {
      return res.status(409).json({ message: "Wrong username or password" });
    }
    // console.log(req.body);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { loginGet, loginPost, loginPostForAdmin, loginGetForAdmin };
