import React from "react";
import { useContext, useEffect, useState } from "react";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import styles from "./transaction.module.css";

import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { LoggedInUser } from "../../App";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  const username = useContext(LoggedInUser).loggedInUser[0].username;
  console.log(username);
  const fetchTransaction = () => {
    fetch("http://localhost:5000/transaction/getdata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: username, getAll: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data.result);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => fetchTransaction(), []);

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.header}>
        <div className={styles.headerList}>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
      </div>
      <div className={styles.transaction}>
        <h3>Your Transactions</h3>
        <table>
          <thead>
            <tr className={styles.title}>
              <th className={styles.number}>#</th>
              <th className={styles.hotel}>Hotel</th>
              <th className={styles.room}>Room</th>
              <th className={styles.date}>Date</th>
              <th className={styles.price}>Price</th>
              <th className={styles.payment}>Payment Method</th>
              <th className={styles.status}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, i) => (
              <tr
                style={{ backgroundColor: i % 2 === 0 ? "#d3d3d3" : "white" }}
                key={Math.random().toString()}
              >
                <td>{i + 1}</td>
                <td>{item.hotel}</td>
                <td>{item.room.map((roomNumber) => roomNumber).join(", ")}</td>
                <td>{`${moment(item.dateStart).format("DD/MM/YYYY")} - ${moment(
                  item.dateEnd
                ).format("DD/MM/YYYY")}`}</td>
                <td>${item.price}</td>
                <td>{item.payment}</td>
                {item.status === "Booked" && (
                  <td>
                    <span
                      style={{
                        color: "green",
                        backgroundColor: "orange",
                        padding: "0.2rem",
                        borderRadius: "0.2rem",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                )}
                {item.status === "Checkin" && (
                  <td>
                    <span
                      style={{
                        color: "green",
                        backgroundColor: "lightgreen",
                        padding: "0.2rem",
                        borderRadius: "0.2rem",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                )}
                {item.status === "Checkout" && (
                  <td>
                    <span
                      style={{
                        color: "green",
                        backgroundColor: "#CBC3E3",
                        padding: "0.2rem",
                        borderRadius: "0.2rem",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MailList />
      <div
        style={{
          marginTop: "1rem",
          display: "grid",
          justifyContent: "center",
        }}
      >
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Transaction;
