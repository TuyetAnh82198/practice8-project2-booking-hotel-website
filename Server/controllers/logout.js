const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const client = new MongoClient(
  "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority"
);

const logOut = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("test");
    const coll = db.collection("sessions");
    await coll.findOneAndDelete({});
    return res.status(200).json({ message: "You are logged out." });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

module.exports = logOut;
