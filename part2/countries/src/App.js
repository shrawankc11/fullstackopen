import { useState, useEffect } from "react";
import axios from "axios";
import Countries from './components/Countries';


const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState("")
  const [selectedCountry, setSelectedCountry] = useState([])

  const fetchData = () => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => response.data)
      .then(data => {
        setCountries(data)
      })
  }

  useEffect(() => {
    if (searchCountries.length) {
      setSelectedCountry(countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchCountries.toLowerCase())
      ))
    } else {
      setSelectedCountry([])
    }


  }, [searchCountries])


  useEffect(fetchData, []);






  return (
    <div>
      <label>
        find countries:
        <input
          value={searchCountries}
          onChange={e => setSearchCountries(e.target.value)}
        />
      </label>
      <Countries countries={selectedCountry} />
    </div>
  );
};

export default App;