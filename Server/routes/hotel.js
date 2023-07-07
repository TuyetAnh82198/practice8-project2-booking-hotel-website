const express = require("express");
const {
  numberOfHotelsByCity,
  numberOfHotelsByType,
  getTop3Hotel,
  getDetail,
  getHotels,
  addHotel,
  deleteHotel,
} = require("../controllers/hotel");

const route = express.Router();

route.get("/number-by-city", numberOfHotelsByCity);
route.get("/number-by-type", numberOfHotelsByType);
route.get("/top3", getTop3Hotel);
route.get("/detail/:id", getDetail);
route.get("/getdata", getHotels);
route.post("/add", addHotel);
route.post("/delete", deleteHotel);

module.exports = route;
