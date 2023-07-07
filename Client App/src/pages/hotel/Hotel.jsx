import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Booking from "../../components/booking/Booking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openBooking, setOpenBooking] = useState(false);
  const params = useParams();
  const hotelID = params.id;
  // console.log(params.id);

  // const navigate = useNavigate();
  // console.log(JSON.parse(localStorage.getItem("loggedInUser").length));
  const fetchHotel = (id) => {
    fetch(`http://localhost:5000/hotel/detail/${id}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setDetail(data.result);
        setIsLoading(false);
        console.log(data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchHotel(hotelID), []);

  const photos =
    detail.length > 0
      ? detail[0].photos.map((photo) => {
          return {
            src: photo,
          };
        })
      : [];

  // console.log(photos);

  //tìm index để làm đối số cho hàm chuyển ảnh handleMove
  const lastIndex = detail.length > 0 ? photos.length - 1 : 0;
  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction, lastIndex) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? lastIndex : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === lastIndex ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {!isLoading && (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l", lastIndex)}
              />
              <div className="sliderWrapper">
                <img
                  src={photos[slideNumber].src}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r", lastIndex)}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{detail[0].title}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{detail[0].address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {detail[0].distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${detail[0].cheapestPrice} at this property and
              get a free airport taxi
            </span>
            <div className="hotelImages">
              {photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{detail[0].name}</h1>
                <p className="hotelDesc">{detail[0].desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                {/* <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span> */}
                <h2>
                  <b>${detail[0].cheapestPrice}</b> (1 nights)
                </h2>
                <button onClick={() => setOpenBooking(!openBooking)}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openBooking && (
        <div style={{ marginLeft: "15.5rem" }}>
          <Booking hotel={detail} />
        </div>
      )}
      <div className="hotelContainer">
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
