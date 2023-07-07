import React from "react";

import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

import styles from "./signup.module.css";

const Signup = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.formdiv}>
        <form action="http://localhost:5000/signup" method="POST">
          <p>Sign Up</p>
          <input name="username" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Create Account</button>
        </form>
      </div>
      <MailList />
      <div className={`${styles.formdiv} ${styles.footer}`}>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Signup;
