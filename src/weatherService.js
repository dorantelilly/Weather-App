
const API_KEY='adc33d437180a08ec660022462a8008f'
const makeIconURL = (iconId) => `http://openweathermap.org/img/wn/${iconId}.png`

export const getFormattedWeatherData = async (location, units = 'metric') => {
  try {
    let URL;
    if (typeof location === 'string') {
      // If location is a string, treat it as a city name
      URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${units}`;
    } else if (location.latitude && location.longitude) {
      // If location is an object with latitude and longitude properties, treat it as coordinates
      URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=${units}`;
    } else {
      throw new Error('Invalid location format');
    }

    const response = await fetch(URL);
    const data = await response.json();

    // Extract necessary information from the current weather data
    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      visibility,
      sys: { country },
      name,
    } = data;

    // Extract weather description and icon
    const { description, icon } = weather[0];

    // Return current weather data
    return {
      description,
      iconURL: makeIconURL(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      visibility,
      country,
      name,
    };
  } catch (error) {
    // Handle errors
    console.error('Error fetching current weather data:', error);
    return null;
  }
};
