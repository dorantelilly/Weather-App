import React, { useState, useEffect } from 'react';
import { getWeeklyForecast } from './forecastService';
import "./descriptions.css";

const Descriptions = ({ city, units }) => {
  const [weeklyForecast, setWeeklyForecast] = useState(null);

  useEffect(() => {
    const fetchWeeklyForecast = async () => {
      const forecastData = await getWeeklyForecast(city, units);
      setWeeklyForecast(forecastData);
    };

    fetchWeeklyForecast();
  }, [city, units]);

  const getDayOfWeek = (index) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const targetDay = (today + index) % 7;
    return days[targetDay];
  };

  return (
    <div className='forcast'>
     
      {weeklyForecast && weeklyForecast.slice(0, 6).map((day, index) => (
        <div className="card" key={index}>
          <h3>{getDayOfWeek(index + 1)}</h3>
          <div className='description_card-icon'>
            <img src={day.iconURL} alt={day.description} />
          </div>
          <div className='description_card-icon'>
          <p>{`${day.temp} ${units === 'metric' ? '°C' : '°F'}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
      };  

export default Descriptions;
