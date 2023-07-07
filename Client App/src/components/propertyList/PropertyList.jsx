import { useState, useEffect } from "react";

import "./propertyList.css";

const PropertyList = () => {
  const [fetchResult, setFetchResult] = useState([
    { type: "Hotel", number: 233 },
    { type: "Apartments", number: 2331 },
    { type: "Resorts", number: 2331 },
    { type: "Villas", number: 2331 },
    { type: "Cabins", number: 2331 },
  ]);

  useEffect(() => {
    fetch(`http://localhost:5000/hotel/number-by-type`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setFetchResult(data.result);
        console.log(data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pList">
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>{fetchResult[0].type}</h1>
          <h2>{fetchResult[0].number} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>{fetchResult[1].type}</h1>
          <h2>{fetchResult[1].number} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>{fetchResult[2].type}</h1>
          <h2>{fetchResult[2].number} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>{fetchResult[3].type}</h1>
          <h2>{fetchResult[3].number} hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>{fetchResult[4].type}</h1>
          <h2>{fetchResult[4].number} hotels</h2>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
