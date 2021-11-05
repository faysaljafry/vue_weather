import API from './API';
export default {
  addCity(city_info) {
    console.log('We are in weatherAPI now');
    return API().post('addCity', { city_info });
  },
  fecthweatherData() {
    console.log('fetching data from mongo atlas');
    return API().get('fetchWeatherData');
  },
  addForecast(weatherData) {
    return API().post('addForecast', { weatherData });
  },
  getCitiesData() {
    return API().get('getCitiesData');
  },
};
