import React, { useState } from "react";
import "./styles.css";
import TextField from "@material-ui/core/TextField";

export default function App() {
  const [countries, setCountries] = useState([]);

  function debounce(func, wait) {
    let timeout;
    var debounced = function() {
      var context = this;
      var args = arguments;
      function later() {
        func.apply(context, args);
      }
      if (timeout) {
        clearInterval(timeout);
      }
      timeout = setTimeout(later, wait);
    };
    return debounced;
  }

  const fetchData = value => {
    // fetch(`https://reqres.in/api/users/${value}`)
    fetch(`https://restcountries.eu/rest/v2/name/${value}`)
      .then(function(resp) {
        return resp.json();
      })
      .then(json => {
        console.log(json);
        if (json.message !== "Not Found") {
          setCountries(json);
        }
      })
      .catch(error => console.log("api error: ", error));
  };

  const debounceCall = debounce(fetchData, 500);

  const handleKeyPress = event => {
    var value = event.target.value;
    console.log(value);
    if (value !== "") {
      debounceCall(value);
    } else {
      setCountries([]);
    }
  };

  return (
    <div className="App">
      <h1>Auto Complete Search</h1>
      <TextField
        className="search-input"
        onKeyUp={event => handleKeyPress(event)}
      />
      <ul>
        {countries &&
          countries.map((country, index) => (
            <li key={index}>{country.name}</li>
          ))}
      </ul>
    </div>
  );
}
