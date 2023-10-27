//import logo from './logo.svg';
import './App.css';
//import Weather from './Weather';
import React, { useEffect, useState } from "react";
// import { Dimmer, Loader } from 'semantic-ui-react';
import './Style.css';
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";

const api = {
  key: "2872797018a60f546f7c8133b8b038f4",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {


  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [inialState, setInitialState] = useState(true);
  const config = {
    id: 0, // important
    percent: 50,
    colorSlice: "#E91E63"
  };

  const [update, setUpdate] = useState(config);


  const newObject = { ...config, ...update };

  const props = {
    percent: 100, // is require
    colorSlice: "#00a1ff",
    colorCircle: "#00a1ff",
    fontColor: "#365b74",
    fontSize: "1.6rem",
    fontWeight: 400,
    size: 150,
    stroke: 10,
    strokeBottom: 5,
    speed: 60,
    cut: 0,
    rotation: -90,
    opacity: 10,
    fill: "#00897B",
    unit: "%",
    textPosition: "0.35em",
    animationOff: false,
    strokeDasharray: "10,1",
    inverse: false,
    round: false,
    number: true,
    linearGradient: ["#ffff00", "brown"],


  };

  const search = evt => {

    if (evt.key === "Enter") {
      setIsLoading(true);
      setInitialState(false);
      console.log(isLoading);
      setUpdate({
        ...config,
        id: 0, // we indicate which component we want to change
        //percent: Math.floor(Math.random() * 100 + 1),
        colorSlice: "#000",
        fontColor: "#F50057",
        fontSize: "1.2rem",
        fontWeight: 700
      });

      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}&units=metric`)
        .then(res => res.json())
        .then(result => {

          setWeather(result)
          setQuery('');
          setIsLoading(false);
          console.log(result);
        });
    }
  }




  const dateBuilder = (d) => {
    let months = ["January", "Febuary", "March", "April",
      "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className="app">
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className="content">

            {(typeof weather.main != "undefined") ? (


              ((isLoading === true) ? (<div className="bar"><CircularProgressBar {...props} /></div>) :
                (<div>
                  <div className="location-box">
                    <div className="location">
                      {weather.name}, {weather.sys.country}
                    </div>
                    <div className="date">{dateBuilder(new Date())}</div>
                  </div>
                  <div className="weather-box">
                    <div className="temp">
                      {Math.round(weather.main.temp)}°c
                    </div>
                    <div className="weather">{weather.weather[0].main}</div>
                  </div>
                </div>
                ))

            ) : ((inialState !== true) ? (
              <div className="undefined">
                No location found, please enter a valid one!
              </div>
            ) : (<div className="undefined">
                Please enter any location....
              </div>))}

            <div className="search-box">
              <input
                type="text"
                className='search-bar'
                placeholder="Enter your location..."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search} />
            </div>

          </div>
        </main>
      </div>


    </div>


  );
}

export default App;
