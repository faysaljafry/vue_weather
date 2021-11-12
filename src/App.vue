<template>
  <router-view />
</template>

<script>
// import Spin from './components/Spin.vue';
// import './index.css';
// import weatherAPI from './services/weatherAPI';
// import showHourly from './components/showHourly.vue';

export default {
  name: 'App',
  beforeCreate() {
    this.$store.replaceState({ cities: [], forecast_details: [] });
    this.$store.commit('getWeatherData');
  },
};
</script>
