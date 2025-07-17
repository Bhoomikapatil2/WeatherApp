import React, { useState } from 'react';
import styled from 'styled-components';

const API_KEY = 'your_api_key';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
`;

const Input = styled.input`
  padding: 10px;
  width: 250px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const WeatherBox = styled.div`
  text-align: center;
  background: #e0f7fa;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
`;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('City not found');

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert(error.message);
      setWeather(null);
    }
  };

  return (
    <Container>
      <h2>Weather App</h2>
      <Input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
      />
      {weather && (
        <WeatherBox>
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>💨 {weather.wind.speed} m/s</p>
        </WeatherBox>
      )}
    </Container>
  );
}

export default App;
