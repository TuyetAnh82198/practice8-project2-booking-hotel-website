const mongoose = require("mongoose");
const HotelModel = require("../models/hotel");
const RoomModel = require("../models/room");
const moment = require("moment");

const search = async (req, res) => {
  const city = req.body.city;
  const date = req.body.date;
  const people = req.body.people;
  const room = req.body.room;
  // console.log(req.body);

  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    const joinHotelAndRoom = await HotelModel.find(
      city
        ? {
            city: city,
          }
        : {}
    ).populate({
      path: "rooms",
      match: {
        maxPeople: { $gte: people },
      },
    });

    const getHotelWithRoomsArrLengthGreaterThan0 = joinHotelAndRoom.filter(
      (hotel) => hotel.rooms !== undefined
    );

    //lọc theo số phòng và ngày tháng
    const availableHotel = [];
    for (let i = 0; i < getHotelWithRoomsArrLengthGreaterThan0.length; i++) {
      const insideArrLength =
        getHotelWithRoomsArrLengthGreaterThan0[i].rooms.length;
      for (let j = 0; j < insideArrLength; j++) {
        if (
          getHotelWithRoomsArrLengthGreaterThan0[i].rooms[j].roomNumbers
            .length >= room &&
          moment(date).isAfter(
            getHotelWithRoomsArrLengthGreaterThan0[i].rooms[j].updatedAt,
            "year"
          ) &&
          moment(date).isAfter(
            getHotelWithRoomsArrLengthGreaterThan0[i].rooms[j].updatedAt,
            "month"
          ) &&
          moment(date).isAfter(
            getHotelWithRoomsArrLengthGreaterThan0[i].rooms[j].updatedAt,
            "day"
          ) &&
          !availableHotel.includes(getHotelWithRoomsArrLengthGreaterThan0[i])
        ) {
          availableHotel.push(getHotelWithRoomsArrLengthGreaterThan0[i]);
        }
      }
    }

    // console.log(availableHotel);

    if (availableHotel.length > 0) {
      return res.status(200).json({ result: availableHotel });
    } else if (availableHotel.length == 0) {
      return res.status(404).json({ message: "Found no hotel." });
    }

    // console.log(getHotelWithRoomsArrLengthGreaterThan0);

    // const availableRoomsArr = roomsArr.filter(
    //   (room) =>
    //     moment(date).isSame(room.updatedAt, "year") &&
    //     moment(date).isSame(room.updatedAt, "month") &&
    //     moment(date).isSame(room.updatedAt, "day") &&
    //     room.maxPeople >= people
    // );

    // const hotelListFilteredByDateAndPeople =
    //   hotelListFilteredByRoomNumber.filter((hotel) => {
    //     return hotel.rooms.filter(
    //       (room) =>
    //         moment(date).isSame(room.updatedAt, "year month day") &&
    //         room.maxPeople >= people
    //     );
    //   });

    // console.log(
    //   moment("2022-09-01T06:43:27.616Z").isSame(
    //     hotelListFilteredByDateAndPeople[0].rooms[0].updatedAt,
    //     "year month day"
    //   )
    // );
  } catch (err) {
    console.log(err);
  }
};

module.exports = search;
