import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';
import weatherAPI from './services/weatherAPI';
const vuexPersist = new VuexPersist({
  key: 'weather_information',
  storage: window.localStorage,
});

export const store = createStore({
  plugins: [vuexPersist.plugin],
  state: {
    cities: [],
    forecast_details: [],
    api_key: 'db225a9416a485c121752c8f2876d298',
    hourly_details_to_show : []
  },
  getters: {
    getCities(state) {
      return JSON.parse(JSON.stringify(state.cities));
    },
    getForecatsDetails(state) {
      return JSON.parse(JSON.stringify(state.forecast_details));
    },
    getHourlyDetailstoShow(state){
      return JSON.parse(JSON.stringify(state.hourly_details_to_show))
    }
  },
  mutations: {
    async getWeatherData(state) {
      console.log('In the Mutation for getWeatherdata');
      const FC_details = await weatherAPI.fecthweatherData();
      const city_Details = await weatherAPI.getCitiesData();
      // state.forecast_details = JSON.parse(JSON.stringify(FC_details.data));
      //state.cities = JSON.parse(JSON.stringify(city_Details.data));
      city_Details.data.forEach((obj) => state.cities.push(obj.title));
      FC_details.data.forEach((obj) => state.forecast_details.push(obj.title));
      console.log(JSON.parse(JSON.stringify(state.cities)));
    },
    setCity(state, city) {
      //console.log('passed city is : ', city);
      state.cities.push({ ...city });
    },
    setForecast_details(state, data) {
      //console.log('passed city is : ', data);
      state.forecast_details.push(data);
    },
    setHourlydetails(state, hourlydata){
      state.hourly_details_to_show = hourlydata
      console.log("Hourlydetails are set as:", state.hourly_details_to_show )
    }
  },
});
