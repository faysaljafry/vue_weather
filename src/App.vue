<template>
  <div
    class="weatherapp relative text-white justify-content-center"
    style="height:100%"
  >
    <div class=" flex justify-center ">
      <h1
        class=" text-center mt-5 text-4xl  bg-gray-400  bg-opacity-25 p-4 rounded  text-green-100 "
      >
        Weather App
      </h1>
    </div>
    <div>
      <h4 class="mb-10 text-sm text-center">
        check the current weather of a city
      </h4>
    </div>
    <div class="flex flex-col text-center justify-center">
      <div class="flex flex-col justify-center text-center items-center ">
        <input
          placeholder="Enter City..."
          v-model="query"
          @keypress="search"
          class=" w-70 h-8 border rounded outline-none  px-2 mb-2 flex justify-self-center text-green-500 "
          type="search"
          name="searchWeather"
          id="weatherid"
        />
        <button
          class="border rounded-md mt-2 mb-2 p-2 text-sm  text-gray-500  hover:bg-gray-400 hover:text-white  hover:p-3 "
          @click="searchClick"
        >
          Check Weather
        </button>
      </div>

      <div v-if="loading">
        <Spin />
        Loading
      </div>
      <div v-if="detail.cod == 404" class="mt-3">
        <h1
          class="text-2xl mt-3 animate__animated animate__fadeInUp animate__delay-0s  "
        >
          Opps not a valid state ... please enter a valid location 😊
        </h1>
      </div>

      <div v-if="detail.cod != undefined && loading == false">
        <div
          v-if="this.detail.main != undefined"
          class="animate__animated animate__zoomIn animate__delay-0s"
        >
          <h4 class="text-3xl mt-5">
            {{ Math.round(detail.main.temp) }} <span>°C</span>
          </h4>
          <h4 class="mt-2">{{ detail.weather[0].main }}</h4>
          <div class=" flex justify-center text-center  items-center ">
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              class="animate__animated animate__flip animate__delay-1s"
              alt=""
            />
          </div>
          <h3>{{ detail.name }}, {{ detail.sys.country }}</h3>
        </div>
      </div>
    </div>
    <div class="text-center" v-if="this.forecast_details.daily != undefined">
      7 days Forecast
    </div>
    <div class="row justify-center text-center  items-center">
      <div class="col flex">
        <div
          class="card border border-dark  rounded m-4 animate__animated animate__zoomIn animate__delay-0s"
          v-for="item in forecast_details.daily"
          :key="item"
          style="width: 18rem; border-radius: 5%"
        >
          <div
            class="card-body border-rounded text-dark hover:bg-green-900 hover:border-transparent"
          >
            <h4 class="card-title text-3xl text-center">
              {{ Math.round(item.temp.day - 273.15) }} <span>°C</span>
            </h4>
            <h4 class="mt-2 text-center">{{ item.weather[0].main }}</h4>
            <img
              id="icon"
              v-bind:src="showIcon(item.weather[0].icon)"
              class="animate__animated animate__flip animate__delay-1s center"
              alt=""
            />
            <h5 class="text-center">{{ timeConverter(item.dt) }}</h5>
            <h3>{{ detail.name }}, {{ detail.sys.country }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spin from './components/Spin.vue';
import './index.css';
import weatherAPI from './services/weatherAPI';

export default {
  data() {
    return {
      api_key: 'db225a9416a485c121752c8f2876d298',
      base_url: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      detail: {},
      url: '',
      loading: false,
      forecast_details: {},
      is_data_fetched: false,
      icon_url: 'http://openweathermap.org/img/wn/',
      cities: ['new york'],
    };
  },
  updated() {
    if (this.is_data_fetched) {
      setTimeout(() => {
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.detail.coord.lat}&lon=${this.detail.coord.lon}&appid=db225a9416a485c121752c8f2876d298`
        )
          .then((response) => response.json())
          .then(this.forecast_result);
      }, 1000);
      this.is_data_fetched = false;
    }
  },
  methods: {
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
      //this.cities = this.query
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

      // 'https://api.openweathermap.org/data/2.5/onecall?lat=31.5287&lon=74.3504&appid=db225a9416a485c121752c8f2876d298'
      //  api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&appid={API key}
    },
    results(result) {
      this.detail = result;
      this.is_data_fetched = true;
      //this.url = `http://openweathermap.org/img/wn/${this.detail.weather[0].icon}@2x.png`
      console.log(JSON.parse(JSON.stringify(this.detail)));
      console.log('This is loading details attribute');
    },
    forecast_result(result) {
      this.forecast_details = result;
      this.forecast_details.city = this.query;
      //API Request to MOngo
      console.log(
        'This is going to be added:',
        JSON.parse(JSON.stringify(this.forecast_details))
      );
      this.addCity(JSON.parse(JSON.stringify(this.forecast_details)));
    },
    timeConverter(UNIX_timestamp) {
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
      var time = date + ' ' + month + ' ' + year;
      return time;
    },
    showIcon(iconId) {
      // 10d@2x.png
      let to_set = this.icon_url + iconId + '@2x.png';
      console.log(to_set);
      return to_set;
    },
    getCity(city) {
      return city == this.query;
    },
    async addCity() {
      if (!this.cities.find(this.getCity)) {
        const response = await weatherAPI.addCity(this.forecast_details);
        console.log('this was returned', response);
        this.cities.push(this.query);
      }
    },
  },
  components: {
    Spin,
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
  width: 50%;
}
body {
  background-color: dodgerblue;
}
</style>
