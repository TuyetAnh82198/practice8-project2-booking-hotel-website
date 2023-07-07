const express = require("express");

const {
  loginGet,
  loginPost,
  loginPostForAdmin,
  loginGetForAdmin,
} = require("../controllers/login");

const route = express.Router();

route.get("/admin", loginGetForAdmin);
route.get("/", loginGet);
route.post("/admin", loginPostForAdmin);
route.post("/", loginPost);

module.exports = route;
