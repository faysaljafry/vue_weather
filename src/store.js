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
  },
  getters: {
    getCities(state) {
      return state.cities;
    },
    getForecatsDetails(state) {
      return state.forecast_details;
    },
  },
  mutations: {
    async getWeatherData(state) {
      console.log('In the Mutation for getWeatherdata');
      const response = await weatherAPI.fecthweatherData();
      const cityRes = await weatherAPI.getCitiesData();
      let cities = response.data;
      let city_details = cityRes.data;
      console.log('returned Records Combined', cities);
      // let index = 0;
      // let available_cities = [];
      // for (index; index < cities.length; index++) {
      //   //console.log('Running loop for times', cities[index].title.city);
      //   available_cities.push(city_details[index]);
      //   state.forecast_details = JSON.parse(JSON.stringify(cities));
      // }
      for (let city in city_details) {
        state.cities.push(city_details[city].title);
      }
      console.log(state.cities);
      // state.cities = city_details;
      console.log('Cities in store: ', state.cities);
      state.forecast_details = JSON.parse(JSON.stringify(cities));
      // state.cities = available_cities;
    },
    setCity(state, city) {
      state.cities.push(city);
      console.log('Sett city with added details are: ', state.cities);
    },
    setForecast_details(state, data) {
      state.forecast_details.push(data);
    },
  },
});
