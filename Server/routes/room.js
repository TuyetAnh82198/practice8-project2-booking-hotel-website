const express = require("express");

const { getRoom, addRoom, deleteRoom } = require("../controllers/room");

const route = express.Router();

route.get("/getData", getRoom);
route.post("/add", addRoom);
route.post("/delete", deleteRoom);

module.exports = route;
