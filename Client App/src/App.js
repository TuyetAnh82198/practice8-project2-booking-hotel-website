import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Transaction from "./pages/transaction/Transaction";
import { createContext, useEffect, useState } from "react";

//dùng context để chứa dữ liệu người dùng đang đăng nhập
export const LoggedInUser = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [toggleBtns, setToggleBtns] = useState(false);

  const fetchLoggedInUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/login`, {
        method: "GET",
      });
      const data = await response.json();

      if (data.result.length > 0) {
        setLoggedInUser(data.result);
        setToggleBtns(true);
      } else if (data.result.length == 0) {
        setToggleBtns(false);
        setLoggedInUser([]);
      }

      console.log(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);
  return (
    <LoggedInUser.Provider value={{ loggedInUser, toggleBtns }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </LoggedInUser.Provider>
  );
}

export default App;
