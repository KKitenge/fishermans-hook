import React, { useEffect, useState } from "react";

const Forecast = () => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const API_KEY = "d9768940cf03b7928016d29e01976bf0";

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherstack.com/forecast?access_key=${API_KEY}&query=New York&forecast_days=7`
        );
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <h2>Weekly Weather Forecast</h2>
      {forecastData ? (
        <div>
          {forecastData.forecast.map((day) => (
            <div key={day.date}>
              <h3>{day.date}</h3>
              <p>Temperature: {day.temperature}°C</p>
              <p>Description: {day.weather_descriptions[0]}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading forecast data...</p>
      )}
    </div>
  );
};

export default Forecast;
