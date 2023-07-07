import React from "react";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import moment from "moment";

import { LoggedInUser } from "../../App";

import styles from "./booking.module.css";

const Booking = (props) => {
  const navigate = useNavigate();
  const loggedInUserData = useContext(LoggedInUser);
  // console.log(loggedInUserData);

  // const [totalBill, setTotalBill] = useState(0);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const fullNameInput = useRef();
  const phoneInput = useRef();
  const idCardInput = useRef();

  const roomArr = props.hotel[0].rooms;
  console.log(props.hotel[0]);
  const filterdRoomArr = roomArr.filter(
    (room) =>
      moment(date.startDate).isAfter(room.updatedAt, "year") &&
      moment(date.startDate).isAfter(
        room.updatedAt,
        "month" && moment(date.startDate).isAfter(room.updatedAt, "day")
      )
  );
  // console.log(filterdRoomArr);
  // console.log(props.hotel);
  // console.log(roomArr);

  const userEmail = loggedInUserData.loggedInUser[0].username;
  // console.log(userEmail);

  const firstDay = moment(date[0].startDate);
  const lastDay = moment(date[0].endDate);
  const numberOfDays = lastDay.diff(firstDay, "days") + 1;
  // console.log(numberOfDays);

  const pickedRooms = [];
  //tiền phòng nhân số phòng
  let totalRoomCharge = 0;
  let totalBill;
  const pickRoom = (title, number, price, numberOfDays) => {
    const hasAdded = pickedRooms.findIndex(
      (room) => room.title === title && room.roomNumbers === number
    );

    // console.log(hasAdded);
    if (hasAdded !== -1) {
      pickedRooms.splice(hasAdded, 1);
    } else if (hasAdded == -1) {
      pickedRooms.push({ title: title, price: price, roomNumbers: number });
    }
    totalRoomCharge = pickedRooms.reduce((acc, room) => acc + room.price, 0);
    document.getElementById("totalBill").textContent =
      totalRoomCharge * numberOfDays;
    // console.log(totalRoomCharge, numberOfDays);
  };

  let paymentMethod;

  const resrveNow = () => {
    if (
      fullNameInput.current.value === "" ||
      phoneInput.current.value === "" ||
      idCardInput.current.value === ""
    ) {
      alert("Please fill the form");
    } else if (
      document.getElementById("selectPaymentMethod").value ===
      "Select Payment Method"
    ) {
      alert("Please select payment method");
    } else {
      navigate("/transaction");
      fetch("http://localhost:5000/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userEmail,
          fullname: fullNameInput.current.value,
          hotel: props.hotel[0].name,
          room: pickedRooms,
          dateStart: new Date(
            moment().year(date.startDate),
            moment().month(date.startDate) + 1,
            moment().day(date.startDate)
          ),
          dateEnd: new Date(
            moment().year(date.endDate),
            moment().month(date.endDate) + 1,
            moment().day(date.endDate)
          ),
          price: totalBill,
          payment: paymentMethod,
          status: "Booked",
        }),
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    }

    // console.log({
    //   user: userEmail,
    //   fullname: fullNameInput.current.value,
    //   hotel: props.hotel[0].name,
    //   room: pickedRooms,
    //   dateStart: new Date(
    //     moment().year(date.startDate),
    //     moment().month(date.startDate) + 1,
    //     moment().day(date.startDate)
    //   ),
    //   dateEnd: new Date(
    //     moment().year(date.endDate),
    //     moment().month(date.endDate) + 1,
    //     moment().day(date.endDate)
    //   ),
    //   price: totalBill,
    //   payment: paymentMethod,
    //   status: "Booked",
    // });
  };
  console.log(date);

  return (
    <React.Fragment>
      <div className={styles.bigdiv}>
        <div>
          <h3>Dates</h3>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
          />
        </div>
        <div className={styles.input}>
          <h3>Reserve Info</h3>
          <p>Your Full Name:</p>
          <input type="text" placeholder="Full Name" ref={fullNameInput} />
          <p>Your Email:</p>
          <input type="email" placeholder="Email" defaultValue={userEmail} />
          <p>Your Phone Number:</p>
          <input type="number" placeholder="Phone Number" ref={phoneInput} />
          <p>Your Identity Card Number:</p>
          <input type="number" placeholder="Card Number" ref={idCardInput} />
        </div>
      </div>
      <h3>Select Rooms</h3>
      <div className={styles.midbigdiv}>
        {filterdRoomArr.map((room) => (
          <div key={Math.random().toString()} className={styles.selectroom}>
            <div className={styles.roominfor}>
              <p className={styles.roomtype}>{room.title}</p>
              <p>{room.desc}</p>
              <p className={styles.maxpeople}>
                Max people:{" "}
                <span className={styles.maxpeoplespan}>{room.maxPeople}</span>
              </p>
              <p className={styles.price}>${room.price}</p>
            </div>
            <div style={{ display: "flex" }}>
              {room.roomNumbers.map((roomNumber) => (
                <div
                  key={Math.random().toString()}
                  style={{ marginLeft: "0.5rem" }}
                >
                  <label className={styles.label} htmlFor={`room${roomNumber}`}>
                    {roomNumber}
                  </label>
                  <input
                    onClick={() => {
                      pickRoom(
                        room.title,
                        roomNumber,
                        room.price,
                        numberOfDays
                      );
                      totalBill =
                        document.getElementById("totalBill").textContent;
                    }}
                    style={{ display: "block", marginLeft: "0.5rem" }}
                    className={styles.checkbox}
                    type="checkbox"
                    value={`${roomNumber}`}
                    name={`room${roomNumber}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h3 className={styles.totalbill}>
        Total Bill: $<span id="totalBill">0</span>
      </h3>
      <div className={styles.bigdiv}>
        <select
          id="selectPaymentMethod"
          onChange={(e) => {
            paymentMethod = e.target.value;

            console.log(paymentMethod);
          }}
          className={styles.select}
        >
          <option value="Select Payment Method">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>
        <button onClick={() => resrveNow()} className={styles.btn}>
          Reserve Now
        </button>
      </div>
    </React.Fragment>
  );
};

export default Booking;
