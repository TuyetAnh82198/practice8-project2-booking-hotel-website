const express = require("express");

const signup = require("../controllers/signup");

const route = express.Router();

const signupRouter = route.post("/", signup);

module.exports = signupRouter;
