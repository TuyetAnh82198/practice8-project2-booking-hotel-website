//npm run dev
//admin: abc@gmail.com, pass: 123
//em chưa rành về hiệu suất nên sẽ hơi chậm ạ
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: "mongodb+srv://antu12666:PDqQAHKRoaGJfjSk@cluster0.4ppxljj.mongodb.net/?retryWrites=true&w=majority",
  collection: "sessions",
});

// const User = require("./models/user");
// const Hotel = require("./models/hotel");
// const Room = require("./models/room");
// const Transaction = require("./models/transaction");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const logOutRouter = require("./routes/logout");
const hotelRouter = require("./routes/hotel");
const searchRouter = require("./routes/search");
const transactionRouter = require("./routes/transaction");
const roomRouter = require("./routes/room");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// sử dụng session
app.set("trust proxy", 1); //trust first proxy

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    // cookie: {
    //   // secure: true,
    // },
  })
);

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logOutRouter);
app.use("/hotel", hotelRouter);
app.use("/search", searchRouter);
app.use("/transaction", transactionRouter);
app.use("/room", roomRouter);
app.use((req, res) => res.status(404).send({ message: "Route not found" }));

app.listen(5000);
