const mongoose = require("mongoose");

const TracsactionModel = require("../models/transaction");

const updateTransaction = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(req.body);
    const reqBody = {
      ...req.body,
      room: req.body.room.map((item) => item.roomNumbers),
    };

    const newTransaction = new TracsactionModel(reqBody);
    newTransaction.save();
    return res.status(200).json({ message: "done" });
  } catch {
    (err) => console.log(err);
  }
};

const getTransaction = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(req.body);
    const transactions = await TracsactionModel.find({
      user: req.body.user,
    });

    if (req.body.getAll) {
      return res.status(200).json({ result: transactions });
    } else {
      const lastestTransaction = transactions.reverse().slice(0, 9);
      return res.status(200).json({ result: lastestTransaction });
    }
  } catch {
    (err) => console.log(err);
  }
};

module.exports = { updateTransaction, getTransaction };
