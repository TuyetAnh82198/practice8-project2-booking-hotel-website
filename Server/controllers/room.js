const mongoose = require("mongoose");

const HotelModel = require("../models/hotel");
const RoomModel = require("../models/room");
const TransactionModel = require("../models/transaction");

const getRoom = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    const rooms = await RoomModel.find();
    return res.status(200).json({ result: rooms });
  } catch {
    (err) => console.log(err);
  }
};

const addRoom = async (req, res) => {
  try {
    const roomsArr = req.body.rooms.split(",");
    const roomsNumberArr = roomsArr.map((item) => Number(item));
    // console.log(typeof roomsNumberArr[0] === "number");
    if (typeof roomsNumberArr[0] === "number") {
      await mongoose.connect(
        "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
      );
      const newOj = {
        ...req.body,
        roomNumbers: roomsNumberArr,
      };
      console.log(newOj);
      const newRoom = new RoomModel(newOj);
      newRoom.save();
    }
    return res.redirect("http://localhost:3001/rooms");
  } catch (err) {
    console.log(err);
  }
};

const deleteRoom = async (req, res) => {
  // console.log(req.body);
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );

    const id = req.body.id;
    //tìm trong hotel có loại phòng đó không, nếu có thì tìm trong transaction có hotel đó không
    const hotels = await HotelModel.find();
    let hotel;
    for (let i = 0; i < hotels.length; i++) {
      for (let j = 0; j < hotels[i].rooms.length; j++) {
        if (hotels[i].rooms[j].valueOf() === id) {
          hotel = hotels[i];
        }
      }
    }
    if (hotel) {
      const hotelInTransaction = await TransactionModel.findOne({
        hotel: hotel.name,
      });

      if (hotelInTransaction.hotel) {
        return res
          .status(404)
          .json({ message: "This room can not be deleted." });
      } else {
        await RoomModel.findOneAndDelete({ _id: id });
        return res.status(200).json({ message: "Done" });
      }
    } else {
      await RoomModel.findOneAndDelete({ _id: id });
      return res.status(200).json({ message: "Done" });
    }
  } catch {
    (err) => console.log(err);
  }
};

module.exports = { getRoom, addRoom, deleteRoom };
