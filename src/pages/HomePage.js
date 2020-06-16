import React from "react";
import "../styles/HomePage.css";
const HomePage = () => {
  const iconsData = [
    {
      iconName: "restaurant_menu",
      text: "Restaurants",
    },
    {
      iconName: "local_bar",
      text: "Local Pubs",
    },
    {
      iconName: "museum",
      text: "Places",
    },
    {
      iconName: "pin_drop",
      text: "Directions",
    },
    {
      iconName: "comment",
      text: "Leave Your Opinion",
    },
  ];
  const icons = iconsData.map((icon) => {
    return (
      <div key={icon.iconName} className="iconDiv">
        <i id="homeicons" className="material-icons">
          {icon.iconName}
        </i>
        <p>{icon.text}</p>
      </div>
    );
  });

  return (
    <div>
      <div id="dragon">
        <img src="http://localhost:8080/api/image/dragon.jpg" alt="dragon" />
        <div id="krakowDef">
          <p>
            Kraków (Cracow) is one of the largest and oldest cities in Poland,
            with the urban population of 756,441 (2008). Situated on the Vistula
            river (Polish: Wisła) in the Lesser Poland region, the city dates
            back to the 7th century.It was the capital of Poland from 1038 to
            1596, the capital of the Grand Duchy of Kraków from 1846 to 1918,
            and the capital of Kraków Voivodeship from the 14th century to 1999.
            It is now the capital of the Lesser Poland Voivodeship.
          </p>
        </div>
      </div>
      <div id="iconsHeader">Information Website Offer</div>
      <div className="iconsMainDiv">{icons}</div>
      <div id="imgDiv">
        <img
          src="http://localhost:8080/api/image/zakrzowek.jpg"
          alt="zakrzowek"
        />
        <img
          src="http://localhost:8080/api/image/clothhall.jpg"
          alt="zakrzowek"
        />
        <img src="http://localhost:8080/api/image/wawel.jpg" alt="wawel" />
      </div>
    </div>
  );
};

export default HomePage;
