import { url } from "inspector";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import down from "./assets/desktop/arrowdown.svg";
import up from "./assets/desktop/arrowup.svg";
import sun from "./assets/desktop/sun.svg";
import moon from "./assets/desktop/moon.svg";

function App() {
  const [isday, setIsday] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [day, setDay] = useState("");
  const [week, setWeek] = useState("");
  const [year, setYear] = useState("");
  const [weekpassed, setWeekpassed] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [city, setCity] = useState("");
  const [ismorning, setIsmorning] = useState(true);

  let num = time.slice(0,2);

  function generator(num: any) {
    switch (num) {
      case "07":
        setIsmorning(true);
        break;
      case "05":
        setIsmorning(true);
        break;

      case "06":
        setIsmorning(true);
        break;
      case "08":
        setIsmorning(true);
        break;
      case "09":
        setIsmorning(true);
        break;
      case "10":
        setIsmorning(true);
        break;
      case "11":
        setIsmorning(true);
        break;
      case "12":
        setIsmorning(true);
        break;
      case "13":
        setIsmorning(true);
        break;

      default:
        setIsmorning(false);
    }
  }

  useEffect(() => {
    axios(`https://worldtimeapi.org/api/ip`)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setData(data);
        let formatedtime = data.datetime.slice(11, 16);
        setTime(formatedtime);
        setLocation(data.timezone);
        setWeek(data.day_of_week);
        setYear(data.day_of_year);
        setWeekpassed(data.week_number);
      })
      .catch(function (error) {
        alert(error + "Show error notification!");
      });

    generator(num);

    axios("https://ipapi.co/json/")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setCity(` ${data.city}, ${data.country_name}`);
      });
  }, []);

  useEffect(() => {
    axios("https://api.quotable.io/quotes/random")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setQuote(data[0].content);
        setAuthor(data[0].author);
      })
      .catch(function (error) {
        alert(error + "Show error notification!");
      });
  }, []);

  return (
    <div className="App">
      <div className={ismorning ? "box day" : "box night"}>
        <div className={show ? "activepositioner" : "positioner"}>
          <div className="place">
            <div className="display">
              <div className={show ? "quotesactive" : "quotes"}>
                <p>{quote}</p>
                <p>{author}</p>
              </div>
              <div className={show ? "showntime" : "time"}>
                <div className="welcomer">
                  <p>
                    {" "}
                    <img src={ismorning ? sun : moon} />
                    {ismorning ? "GOOD MORNING" : "GOOD EVENING"} IT'S CURRENTLY
                  </p>
                </div>
                <div className="clock">
                  <p>{time}</p>
                </div>
                <div className="location">
                  <p>IN {city.toUpperCase()}</p>
                </div>
              </div>
            </div>

            <div className="clicker">
              <button
                onClick={() => {
                  setShow(!show);
                }}
              >
                {" "}
                {show ? "LESS" : "MORE"}{" "}
                <div className="btnimg">
                  <img src={show ? up : down} />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className={show ? "active" : "passive"}>
          <div className="floors">
            <div className="side">
              <label>CURRENT TIMEZONE</label> <p>{location}</p>
            </div>
            <div className="side">
              <label>DAY OF THE YEAR</label> <p>{year}</p>
            </div>
          </div>
          <div className="floors">
            <div className="side">
              <label>DAY OF THE WEEK </label> <p>{week}</p>
            </div>
            <div className="side">
              <label>WEEK NUMBERS </label> <p>{weekpassed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
