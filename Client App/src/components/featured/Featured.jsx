import { useState, useEffect } from "react";

import "./featured.css";
import imgHN from "../../HaNoi.jpg";
import imgHCM from "../../HCM.jpg";
import imgDN from "../../DaNang.jpg";

const Featured = () => {
  const [hotelArr, setHotelArr] = useState([
    { city: "Dublin", numberOfHotels: 123 },
    { city: "Reno", numberOfHotels: 533 },
    { city: "Austin", numberOfHotels: 532 },
  ]);

  useEffect(() => {
    fetch(`http://localhost:5000/hotel/number-by-city`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setHotelArr(data.result);
        console.log(data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          // src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          src={imgHN}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>{hotelArr[0].city}</h1>
          <h2>{hotelArr[0].numberOfHotels} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img
          // src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          src={imgHCM}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>{hotelArr[1].city}</h1>
          <h2>{hotelArr[1].numberOfHotels} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          // src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          src={imgDN}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>{hotelArr[2].city}</h1>
          <h2>{hotelArr[2].numberOfHotels} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
