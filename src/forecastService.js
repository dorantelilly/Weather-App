const API_KEY = 'adc33d437180a08ec660022462a8008f';
const makeIconURL = (iconId) => `http://openweathermap.org/img/wn/${iconId}.png`;

export const getWeeklyForecast = async (city, units = 'metric') => {
  try {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`;
    const response = await fetch(URL);
    const data = await response.json();

    // get weekly forecast data
    const weeklyForecast = data.list
      .map((forecastItem) => {
        const {
          dt_txt,
          main: { temp },
          weather: [{ description, icon }],
        } = forecastItem;

        // get day of the week from date
        const date = new Date(dt_txt);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

        return {
          day: dayOfWeek,
          description,
          iconURL: makeIconURL(icon),
          temp: temp.toFixed(),
        };
      })
      .slice(1); // dont include current day in forecast

    
    return weeklyForecast;
  } catch (error) {
    // Handle errors
    console.error('Error fetching weekly forecast:', error);
    return null;
  }
};
