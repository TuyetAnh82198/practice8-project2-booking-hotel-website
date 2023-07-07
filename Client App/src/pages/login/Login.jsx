import React from "react";

import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

import styles from "./login.module.css";

const Login = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.formdiv}>
        <form action="http://localhost:5000/login" method="POST">
          <p>Login</p>
          <input name="username" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
      <MailList />
      <div className={`${styles.formdiv} ${styles.footer}`}>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Login;
