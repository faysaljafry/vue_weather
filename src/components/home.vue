<template>
  <div
    class="weatherapp relative text-grey-400 justify-content-center"
    style="height:100%"
  >
    <div class="drop-shadow-lg flex flex-row justify-center">
      <img src="../assets/cloud.png" />
      <h5
        class=" text-center mt-5 text-3xl md:text-5xl  p-4 rounded text-black  "
      >
        Weather App
      </h5>
    </div>
    <div>
      <h4 class="mb-10 text-sm text-center">
        check the current weather of a city
      </h4>
    </div>
    <div class="flex flex-col text-center justify-center">
      <div class="flex flex-col justify-center text-center items-center ">
        <select
          v-model="query"
          @keypress="search"
          name="cities"
          class=" appearance-none w-80 bg-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="cities"
        >
          <option
            v-for="city in cities_of_country"
            :value="city.name"
            :selected="city.name"
            :key="city.name"
            >{{ city['name'] }}</option
          >
        </select>
        <button
          class="border rounded-md mt-2 mb-2 p-2 text-sm  text-black  hover:bg-purple-300 hover:text-white  hover:p-3 "
          @click="searchClick"
        >
          Check Weather
        </button>
      </div>

      <div v-if="loading == true">
        <Spin />
        Loading
      </div>

      <div
        v-if="loading == false || checked == true"
        class="flex justify-center"
      >
        <div
          v-if="this.detail.weather != undefined"
          class="w-52 animate__animated animate__zoomIn animate__delay-0s"
        >
          <h4 class="text-3xl mt-5">
            {{ Math.ceil(this.detail.temp - 273.6) }}
            <span>°C</span>
          </h4>
          <h4 class="mt-2">
            {{ this.detail.weather[0].main }}
          </h4>
          <div class=" flex justify-center text-center  items-center ">
            <img
              id="icon"
              v-bind:src="showIcon(this.detail.weather[0].icon)"
              class="animate__animated animate__flip animate__delay-1s"
              alt=""
            />
          </div>
          <h3>{{ this.city_info.name }}, {{ this.city_info.country }}</h3>
        </div>
      </div>
    </div>
    <div
      class="text-center text-3xl mt-5 mb-5 animate-pulse"
      v-if="this.loading == false"
    >
      7 days Forecast
    </div>

    <div>
      <div
        class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 sm:gap-2 gap-4 justify-items-center"
        v-if="this.loading == false"
      >
        <div
          id="card"
          class="w-40 sm:w-44 items-center animate-none rounded animate__animated animate__zoomIn animate__delay-0s bg-gray-500 "
          v-for="item in forecast_details.daily"
          :key="item"
        >
          <div
            class="rounded text-dark hover:border-transparent items-center justify-center transition-shadow shadow-2xl"
          >
            <h4 class="text-black text-3xl text-center">
              {{ Math.floor(item.temp.day - 273.15) }} <span>°C</span>
            </h4>
            <h4 class="mt-2 text-center">{{ item.weather[0].main }}</h4>
            <img
              id="icon"
              v-bind:src="showIcon(item.weather[0].icon)"
              class="animate__animated animate__flip animate__delay-1s center"
              alt=""
            />
            <h5 class="text-center text-white">
              {{ timeConverter(item.dt, false) }}
            </h5>
            <h3 class="text-center text-white">
              {{ city_info.name }}, {{ city_info.country }}
            </h3>
            <div class="text-center">
              <router-link :to="'/showHourly/' + timeConverter(item.dt, true)">
                <button
                  :disabled="
                    !(timeConverter(item.dt, true) <= new Date().getDate() + 1)
                  "
                  class="bg-gray-800 hover:bg-gray-300 text-white hover:text-gray-900 font-bold py-2 justify-items-center px-4 my-2 rounded-full"
                >
                  Hourly data
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spin from '../components/Spin.vue';
import '../index.css';
import weatherAPI from '../services/weatherAPI';
// import showHourly from './components/showHourly.vue';

export default {
  data() {
    return {
      api_key: 'db225a9416a485c121752c8f2876d298',
      base_url: 'https://api.openweathermap.org/data/2.5/',
      query: 'Lahore',
      country: ['Pakistan'],
      cities_of_country: {},
      detail: {},
      url: '',
      loading: false,
      forecast_details: {},
      is_data_fetched: false,
      icon_url: 'http://openweathermap.org/img/wn/',
      coords: {},
      city_info: {
        name: '',
        country: '',
        longitude: '',
        latitude: '',
      },
    };
  },

  created() {
    let _city = require('../assets/pakistan.json');
    this.cities_of_country = _city;
    if (this.$workbox) {
      this.$workbox.addEventListener('waiting', () => {
        this.showUpgradeUI = true;
      });
    }
    if (this.$store.getters.getLastSearched) {
      console.log(
        'Getting last searhed as :',
        this.$store.getters.getLastSearched
      );
      this.query = this.$store.getters.getLastSearched;
      this.searchClick();
    }
  },
  updated() {},
  methods: {
    async accept() {
      this.showUpgradeUI = false;
      await this.$workbox.messageSW({ type: 'SKIP_WAITING' });
    },
    search(e) {
      if (e.key == 'Enter') {
        this.loading = true;
        //this.cities.push(this.query)
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        setTimeout(() => {
          fetch(
            `${this.base_url}weather?q=${this.query}&units=metric&appid=${this.api_key}`
          )
            .then((response) => response.json())
            .then(this.results);
        }, 1000);
      }
    },
    searchClick() {
      this.loading = true;
      this.$store.checked = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      if (this.$store.getters.getCities.find((e) => e.name == this.query)) {
        console.log('Match Found in City array, loading data from store:');
        let forecast = this.$store.getters.getForecatsDetails.find(
          (e) => e.city === this.query
        );
        console.log('Query to get is : ', forecast);
        this.getlocation(this.query);
        this.results(forecast.hourly);
        this.forecast_result(forecast);
        console.log('returned from forecast result');
        this.forecast_details.hourly.forEach((obj) => {
          console.log('In loop');
          let day = this.setDate(obj.dt);
          obj.date = day;
        });
        this.$store.commit('setHourlydetails', forecast.hourly);
        this.$store.commit('setLastSearched', this.query);
      } else {
        console.log('Not found in the store, sending request to WeatherAPI');
        this.getlocation(this.query);
        setTimeout(() => {
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${this.city_info.latitude}&lon=${this.city_info.longitude}&appid=db225a9416a485c121752c8f2876d298`
          )
            .then((response) => response.json())
            .then((result) => {
              console.log('API repsonse is: ', result);
              this.results(result.hourly);
              this.forecast_result(result);
              this.addCity(JSON.parse(JSON.stringify(result)));
              this.$store.commit('setHourlydetails', result.hourly);
              this.$store.commit('setLastSearched', this.query);
            });
        }, 1000);
      }
    },
    setDate(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp * 1000);
      console.log(a.getDate());
      return a.getDate();
    },
    getlocation(city) {
      //console.log('In city info Function...', city);
      let index = 0;
      for (; index < this.cities_of_country.length; index++) {
        if (this.cities_of_country[index].name == city) {
          //console.log('Found City', this.cities_of_country[index]);
          this.city_info.name = this.cities_of_country[index].name;
          this.city_info.country = this.cities_of_country[index].country;
          this.city_info.longitude = this.cities_of_country[index].lng;
          this.city_info.latitude = this.cities_of_country[index].lat;
        }
      }
    },
    results(hourly_forecast) {
      console.log('In results Function');
      let parsed_data = JSON.parse(JSON.stringify(hourly_forecast));
      //console.log('Hourly forecast in result function', parsed_data);
      for (let index = 0; index < parsed_data.length; index++) {
        if (this.compareTime(parsed_data[index].dt)) {
          //console.log('index is: ', index);
          this.detail = parsed_data[index];
          //console.log('the app data value (hourly is ): ', this.detail);
          return;
        }
      }
    },
    forecast_result(result) {
      console.log('In forecast result function');
      this.forecast_details = result;
      this.forecast_details.city = this.query;
      //API Request to MOngo
    },
    timeConverter(UNIX_timestamp, route_call) {
      var a = new Date(UNIX_timestamp * 1000);
      var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      if (route_call == true) {
        console.log(date <= new Date().getDate() + 1);
        return date;
      }
      var time = date + ' ' + month + ' ' + year;
      return time;
    },
    showIcon(iconId) {
      // 10d@2x.png
      let to_set = this.icon_url + iconId + '@2x.png';
      //console.log(to_set);
      return to_set;
    },
    getCity(city) {
      console.log('City', city.name);
      if (this.query == city.name) {
        // console.log('city name is', city.name, city.name.length);
        // console.log('qyert ', this.query, this.query.length);
        return true;
      }
      return false;
    },
    async addCity() {
      console.log('In addCity funcuton');
      const response = await weatherAPI.addForecast(this.forecast_details);
      const response2 = await weatherAPI.addCity(this.city_info);
      console.log('this was returned', response);
      console.log('city was added as:', response2);
      console.log('this is being overwritten', this.city_info);
      this.$store.commit('setCity', this.city_info);
      this.$store.commit('setForecast_details', this.forecast_details);
      // }
    },
    compareTime(UNIX_timestamp) {
      let current_hour = new Date().getHours();
      let current_date = new Date().getDate();
      var hour = new Date(UNIX_timestamp * 1000).getHours();
      var database_date = new Date(UNIX_timestamp * 1000).getDate();

      if (current_hour == hour && current_date == database_date) {
        console.log(current_hour, current_date);
        return true;
      } else return false;
    },
    showHourlyData(hourly_data) {
      let current_hour = false;
      let index = 0;
      for (index; current_hour == true; index++) {
        current_hour = this.compareTime(hourly_data[index]);
      }

      console.log(
        'hourly data to show on next page is:',
        this.timeConverter(hourly_data[index].dt)
      );
      //this.$router.push('/showHourly');
    },
  },
  components: {
    Spin,
    // showHourly,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

.weatherapp {
  font-family: 'Montserrat', sans-serif;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* width: 50%; */
}
body {
  background: #83a4d4; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #b6fbff,
    #83a4d4
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #b6fbff,
    #83a4d4
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#card {
  background: #e6dada; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #274046,
    #e6dada
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #274046, #e6dada);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
