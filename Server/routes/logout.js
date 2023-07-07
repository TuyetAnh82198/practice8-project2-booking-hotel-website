const express = require("express");

const logOut = require("../controllers/logout");

const route = express.Router();

const logOutRouter = route.get("/", logOut);

module.exports = logOutRouter;
