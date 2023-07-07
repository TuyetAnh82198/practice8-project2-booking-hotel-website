const { Transaction } = require("mongodb");
const mongoose = require("mongoose");

const HotelModel = require("../models/hotel");
const RoomModel = require("../models/room");
const TransactionModel = require("../models/transaction");

const numberOfHotelsByCity = async (req, res) => {
  //Số lượng các khách sạn theo khu vực: Hà Nội, HCM và Đà Nẵng
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    const hotelList = await HotelModel.find();
    const cityHaNoiArr = hotelList.filter((hotel) => hotel.city === "Ha Noi");
    const cityHCMArr = hotelList.filter(
      (hotel) => hotel.city === "Ho Chi Minh"
    );
    const cityDaNangArr = hotelList.filter((hotel) => hotel.city === "Da Nang");
    return res.status(200).json({
      result: [
        { city: "Ha Noi", numberOfHotels: cityHaNoiArr.length },
        { city: "HCM", numberOfHotels: cityHCMArr.length },
        { city: "Da Nang", numberOfHotels: cityDaNangArr.length },
      ],
    });
  } catch (err) {
    console.log(err);
  }
};

const numberOfHotelsByType = async (req, res) => {
  //Số lượng khách sạn theo từng loại
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    const hotelList = await HotelModel.find();
    const hotelTypeArr = hotelList.filter((hotel) => hotel.type === "hotel");
    const apartmentTypeArr = hotelList.filter(
      (hotel) => hotel.type === "apartment"
    );
    const resortTypeArr = hotelList.filter((hotel) => hotel.type === "resort");
    const villaTypeArr = hotelList.filter((hotel) => hotel.type === "villa");
    const cabinTypeArr = hotelList.filter((hotel) => hotel.type === "cabin");
    return res.status(200).json({
      result: [
        { type: "Hotel", number: hotelTypeArr.length },
        { type: "Apartments", number: apartmentTypeArr.length },
        { type: "Resorts", number: resortTypeArr.length },
        { type: "Villas", number: villaTypeArr.length },
        { type: "Cabins", number: cabinTypeArr.length },
      ],
    });
  } catch (err) {
    console.log(err);
  }
};

const getTop3Hotel = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    const hotelList = await HotelModel.find();
    const top3Hotel = hotelList.sort((a, b) => b.rating - a.rating).slice(0, 4);
    // console.log(hotelList);
    return res.status(200).json({ result: top3Hotel });
  } catch (err) {
    console.log(err);
  }
};

const getDetail = async (req, res) => {
  const hotelID = req.params.id;
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );

    const hotel = await HotelModel.find({ _id: hotelID }).populate({
      path: "rooms",
    });
    // console.log(hotel);

    return res.status(200).json({ result: hotel });
  } catch {
    (err) => console.log(err);
  }
};

const getHotels = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    const hotels = await HotelModel.find();
    return res.status(200).json({ result: hotels });
  } catch {
    (err) => console.log(err);
  }
};

const addHotel = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    const room = await RoomModel.findOne({ title: req.body.rooms });
    const roomsArr = [room._id.valueOf()];
    const photosArr = [req.body.photos];
    // console.log(roomsArr);
    const newOj = {
      ...req.body,
      photos: photosArr,
      rooms: roomsArr,
      featured: req.body.featured === "no" ? false : true,
    };
    console.log(newOj);
    const newHotel = new HotelModel(newOj);
    newHotel.save();
    return res.redirect("http://localhost:3001/hotels");
  } catch {
    (err) => console.log(err);
  }
};

const deleteHotel = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    const id = req.body.id;
    const name = req.body.name;
    const hotelInTransaction = await TransactionModel.findOne({
      hotel: name,
    });
    console.log(hotelInTransaction);
    if (hotelInTransaction) {
      return res
        .status(404)
        .json({ message: "This hotel can not be deleted." });
    } else {
      await HotelModel.findOneAndDelete({ _id: id });
      return res.status(200).json({ message: "Done" });
    }
  } catch {
    (err) => console.log(err);
  }
};

module.exports = {
  numberOfHotelsByCity,
  numberOfHotelsByType,
  getTop3Hotel,
  getDetail,
  getHotels,
  addHotel,
  deleteHotel,
};
