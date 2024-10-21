import sunnyBg from './assets/SunnyDay.jpg';
import rainyBg from './assets/rainyDay.jpg';
import Descriptions from './descriptions';
import { useState, useEffect } from 'react';
import { getFormattedWeatherData } from './weatherService';


function App() {
 const [city, setCity] = useState('Chicago');
 const [weatherData, setWeatherData] = useState(null);
 const [units, setUnits] = useState('imperial');
 const [bg, setBg] = useState(sunnyBg);
 const [errorMessage, setErrorMessage] = useState('');


 useEffect(() => {
   const fetchWeatherData = async () => {
     try {
       const data = await getFormattedWeatherData(city, units);
       if (data) {
         setWeatherData(data);
         if (data.description && (data.description.toLowerCase().includes('rain') || data.description.toLowerCase().includes('drizzle'))) {
           setBg(rainyBg);
         } else {
           setBg(sunnyBg);
         }
         setErrorMessage('');
       } else {
         setWeatherData(null);
         setErrorMessage('City not found');
       }
     } catch (error) {
       console.error('Error fetching weather data:', error);
       setWeatherData(null);
       setErrorMessage('An error occurred while fetching weather data');
     }
   };


   fetchWeatherData();
 }, [units, city]);


 const enterKeyPressed = (e) => {
   if (e.keyCode === 13) {
     setCity(e.currentTarget.value);
     e.currentTarget.blur();
   }
 };


 const handleSearch = async (e) => {
   e.preventDefault();
   
   try {
     const data = await getFormattedWeatherData(city, units);
     if (data) {
       setWeatherData(data);
       if (data.description && (data.description.toLowerCase().includes('rain') || data.description.toLowerCase().includes('drizzle'))) {
         setBg(rainyBg);
       } else {
         setBg(sunnyBg);
       }
       setErrorMessage('');
     } else {
       setWeatherData(null);
       setErrorMessage('City not found');
     }
   } catch (error) {
     console.error('Error fetching weather data:', error);
     setWeatherData(null);
     setErrorMessage('An error occurred while fetching weather data');
   }
 };
 const fetchWeatherDataByCurrentLocation = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = position.coords;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=adc33d437180a08ec660022462a8008f&units=${units}`);
    const data = await response.json();
    setCity(`${data.name}, ${data.sys.country}`);
  } catch (error) {
    console.error('Error fetching weather data by current location:', error);
    setErrorMessage('Error fetching weather data by current location');
  }
};


  return (
   <div>
     <div className="app" style={{ backgroundImage: `url(${bg})` }}>
       {weatherData ? (
         <div>
           <div className='temperature'>
             <h1>{`${weatherData.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>
             <button className="toggle-unit" onClick={() => setUnits(units === 'metric' ? 'imperial' : 'metric')}>
               {units === 'metric' ? '°F' : '°C'}
             </button>
           </div>
           <Descriptions city={city} units={units} />
           <div className='overlay'>
             <div className='container'>
               <div className='section section_inputs'>
                 <input onKeyDown={enterKeyPressed} type="text" name='city' placeholder='Enter City..' />
                 <button onClick={handleSearch}>Search</button>
                 
               </div>
               <div className='section section_temperature'>
                 <div className='icon'>
                   <h3>{`${weatherData.name}, ${weatherData.country}`}</h3>
                   <hr />
                   <br />
                   <h4>{`${weatherData.description}`}</h4>
                   <hr />
                   <h4>humidity: {`${weatherData.humidity} %`}</h4>
                   <hr />
                   <h4>Visibility: {`${weatherData.visibility}`}</h4>
                   <hr />
                   <h4>Wind Speed: {`${weatherData.speed}`} MPH</h4>
                 </div>
                 <button onClick={fetchWeatherDataByCurrentLocation} className='current-location-button'>Current Location</button>
               </div>
             </div>
           </div>
         </div>
       ) : (
         <div>
           <div className='container'>
             <div className='section section_inputs'>
               <input id="cityInput" onKeyDown={enterKeyPressed} type="text" name='city' placeholder='Enter City..' />
               <button onClick={handleSearch}>Search</button>
             </div>
             <div className='section section_temperature'>
               <h1>{errorMessage}</h1>
             </div>
           </div>
         </div>
       )}
     </div>
   </div>
 );
       }; 


export default App;