import API from './API';
export default {
  addCity(weatherData) {
    console.log('We are in weatherAPI now');
    return API().post('addCity', { weatherData });
  },
  fecthweatherData() {
    console.log('fetching data from mongo atlas');
    return API().get('fetchWeatherData');
  },
};
