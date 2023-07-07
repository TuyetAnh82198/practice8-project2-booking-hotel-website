import React from "react";
import "./searchItem.css";

const SearchItem = (props) => {
  return (
    <React.Fragment>
      {props.availableHotel.map((hotel) => (
        <div className="searchItem">
          <img src={hotel.photos[0]} alt="" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">{hotel.name}</h1>
            <span className="siDistance">{hotel.distance} from center</span>
          </div>
          <div className="siDetails">
            <div className="siRating">
              <span>Excellent</span>
              <button>{hotel.rating}</button>
            </div>
            <div className="siDetailTexts">
              <span className="siPrice">${hotel.cheapestPrice}</span>
              <button className="siCheckButton">See availability</button>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default SearchItem;
