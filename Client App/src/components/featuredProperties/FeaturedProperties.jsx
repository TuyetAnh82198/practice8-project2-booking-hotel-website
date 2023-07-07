import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoggedInUser } from "../../App";

import "./featuredProperties.css";

const FeaturedProperties = () => {
  const loggedInUserData = useContext(LoggedInUser);

  const [top3, setTop3] = useState([
    {
      title: "Aparthotel Stare Miasto",
      city: "Madrid",
      cheapestPrice: 120,
      photos: [
        "https://pix8.agoda.net/hotelImages/14501735/-1/25517748837ba92fcb96c176f627d498.jpg?ce=0&s=1024x",
        "https://pix8.agoda.net/hotelImages/14501735/-1/0a77da6e3c4f95e95bd84f5dbaeb2a74.jpg?ca=11&ce=1&s=1024x",
      ],
      rating: 8.9,
    },
    {
      title: "Comfort Suites Airport",
      city: "Austin",
      cheapestPrice: 140,
      photos: [
        "https://pix8.agoda.net/hotelImages/8315970/-1/95c472f9e927d2f62293cb721818e6ad.jpg?ca=15&ce=1&s=1024x",
        "https://pix8.agoda.net/hotelImages/8315970/-1/70c9f415d4bbc7d2d86b492d46e5aa68.jpg?ca=10&ce=1&s=1024x",
      ],
      rating: 9.3,
    },
    {
      title: "Hilton Garden Inn",
      city: "Berlin",
      cheapestPrice: 105,
      photos: [
        "https://pix8.agoda.net/hotelImages/410473/-1/d4473f0de8949a127c9f25070c63fc42.jpg?ca=27&ce=0&s=1024x768",
        "https://pix8.agoda.net/hotelImages/410473/-1/136f8e319bb58c8dce21a5cfb8a0b1b9.jpg?ca=27&ce=0&s=1024x768",
      ],
      rating: 8.9,
    },
  ]);

  const navigate = useNavigate();
  const clickHotelName = (i) => {
    if (loggedInUserData.loggedInUser.length == 0) {
      navigate("/login");
    } else if (loggedInUserData.loggedInUser.length > 0) {
      navigate(`./hotels/${top3[i]._id}`);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/hotel/top3`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setTop3(data.result);
        console.log(data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(top3[0].photos[0]);
  return (
    <div className="fp">
      <div className="fpItem">
        <img src={top3[0].photos[0]} alt="" className="fpImg" />
        <span className="fpName">
          <p onClick={() => clickHotelName(0)}>{top3[0].title}</p>
        </span>
        <span className="fpCity">{top3[0].city}</span>
        <span className="fpPrice">Starting from ${top3[0].cheapestPrice}</span>
        {/* <div className="fpRating">
          <button>{top3[0].rating}</button>
          <span>Excellent</span>
        </div> */}
      </div>
      <div className="fpItem">
        <img src={top3[1].photos[0]} alt="" className="fpImg" />
        <span className="fpName">
          <p onClick={() => clickHotelName(1)}>{top3[1].title}</p>
        </span>
        <span className="fpCity">{top3[1].city}</span>
        <span className="fpPrice">Starting from ${top3[1].cheapestPrice}</span>
        {/* <div className="fpRating">
          <button>{top3[1].rating}</button>
          <span>Excellent</span>
        </div> */}
      </div>
      <div className="fpItem">
        <img src={top3[2].photos[0]} alt="" className="fpImg" />
        <span className="fpName">
          <p onClick={() => clickHotelName(2)}>{top3[2].title}</p>
        </span>
        <span className="fpCity">{top3[2].city}</span>
        <span className="fpPrice">Starting from ${top3[2].cheapestPrice}</span>
        {/* <div className="fpRating">
          <button>{top3[2].rating}</button>
          <span>Excellent</span>
        </div> */}
      </div>
    </div>
  );
};

export default FeaturedProperties;
