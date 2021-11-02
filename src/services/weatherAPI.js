import API from './API';
export default {
  getToDos() {
    return API().get('todo');
  },
  addCity(weatherData) {
    console.log('We are in weatherAPI now');
    return API().post('addCity', { weatherData });
  },
};
