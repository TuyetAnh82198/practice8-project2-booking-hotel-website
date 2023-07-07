const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: { type: String, required: true },
  fullname: { type: String, required: true },
  hotel: { type: String, required: true },
  room: [{ type: Number, required: true }],
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
