const express = require("express");
const route = express.Router();

const {
  updateTransaction,
  getTransaction,
} = require("../controllers/transaction");

route.post("/getdata", getTransaction);
route.post("/", updateTransaction);

module.exports = route;
