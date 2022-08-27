import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";

const api_key = process.env.REACT_APP_API_KEY;

// const DisplayMultiple = ({ country, setDisplayCountries }) => {
//   const onClick = () => {
//     setDisplayCountries([].concat(country));
//   };

//   return (
//     <>
//       {country.name.common}
//       <Button onClick={onClick} />
//     </>
//   );
// };

//display selected countries
const DisplaySelectedCountries = ({ countries, setDisplayCountries }) => {
  // const onClick = () => {
  //   setDisplayCountries([].concat(country));
  // };

  return (
    <div>
      {countries.map((country, index) => (
        <p key={index}>
          {/* <DisplayMultiple
            country={country}
            setDisplayCountries={setDisplayCountries}
          /> */}
          {country.name.common}
          <Button onClick={() => setDisplayCountries([].concat(country))} />
        </p>
      ))}
    </div>
  );
};

//Display when there is more than 10 countries selected
const UserPrompt = ({ text }) => {
  return <p>{text}</p>;
};

// Display once country either by search or by button press
const DisplaySingle = ({ country }) => {
  const [countryWeather, setCountryWeather] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const fetchWeatherData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`
      )
      .then((response) => response.data)
      .then((data) => {
        setIsFetching(!isFetching);
        setCountryWeather(data);
      });
  };

  useEffect(fetchWeatherData, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Area : {country.area}</p>
      <p>Capital : {country.capital[0]}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.keys(country.languages).map((key, index) => <li key={index}>{country.languages[key]}</li>)}
      </ul>

      <img src={country.flags.png} alt="" />

      {isFetching && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <p>temperature: {countryWeather.main.temp}</p>
          <img
            src={`http://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>wind: {countryWeather.wind.speed}m/s</p>
        </div>
      )}
    </div>
  );
};

//Main function
const Countries = ({ countries }) => {
  const [displayCountries, setDisplayCountries] = useState([]);

  useEffect(() => {
    setDisplayCountries(countries);
  }, [countries]);

  if (displayCountries.length > 10) {
    return <UserPrompt text="Too many matches, specify another filter" />;
  } else if (displayCountries.length === 1) {
    const [country] = displayCountries;
    return <DisplaySingle country={country} />;
  } else {
    return (
      <DisplaySelectedCountries
        countries={displayCountries}
        setDisplayCountries={setDisplayCountries}
      />
    );
  }
};

export default Countries;
