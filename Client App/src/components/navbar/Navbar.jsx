import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { LoggedInUser } from "../../App";

import styles from "./navbar.module.css";

const Navbar = () => {
  const loggedInData = useContext(LoggedInUser);
  // console.log(loggedInData);

  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <span className={styles.logo}>Booking</span>
        <div className={styles.navItems}>
          {loggedInData.toggleBtns && (
            <span>{loggedInData.loggedInUser[0].username}</span>
          )}
          <button
            className={styles.navButton}
            onClick={() =>
              loggedInData.toggleBtns
                ? navigate("/transaction")
                : navigate("/signup")
            }
          >
            {loggedInData.toggleBtns ? "Transactions" : "Sign Up"}
          </button>
          <button
            className={styles.navButton}
            onClick={() =>
              loggedInData.toggleBtns
                ? fetch(`http://localhost:5000/logout`, { method: "GET" })
                    .then((response) => {
                      alert("You are logged out");
                      //tải lại trang
                      navigate("/");
                      window.location.reload(true);
                    })
                    .catch((err) => console.log(err))
                : navigate("/login")
            }
          >
            {loggedInData.toggleBtns ? "Log out" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
