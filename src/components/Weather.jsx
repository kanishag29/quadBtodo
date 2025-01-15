import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return; // Do not fetch if no city provided

      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d111fb1339a9003d0a3a41a9d24788d8`);
        setWeather(response.data);
        setError(null);
      } catch (error) {
        setError('Error fetching weather data');
        setWeather(null);
      }
    };

    fetchWeather();
  }, [city]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {weather ? (
        <p>Current Weather in {weather.name}: {weather.weather[0].description}</p>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

const TaskWeather = ({ isOutdoor, city }) => {
  return isOutdoor ? <Weather city={city} /> : null;
};

export default TaskWeather;
