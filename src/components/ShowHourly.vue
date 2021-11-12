<template>
  <div>
    <div class="mt-2 ml-2">
      <router-link to="/">
        <button>Go back</button>
      </router-link>
    </div>
    <div class="flex flex-wrap mt-5">
      <div
        v-for="item in this.$store.getters.getHourlyDetailstoShow"
        :key="item"
      >
        <div
          id="card"
          data-aos="fade-up"
          v-if="item.date == this.$route.params.date"
          :class="{ invisible: item.date != this.$route.params.date }"
          class="text-center w-40 sm:w-40 xs:w-40 items-center animate-none mb-2  rounded animate__animated animate__zoomIn animate__delay-0s mx-3 bg-gray-500 "
        >
          <div
            class="rounded text-dark hover:border-transparent items-center justify-center transition-shadow shadow-2xl"
          >
            <!-- <h1>{{ date }}</h1> -->
            <h4 class="text-black text-center text-3xl">
              {{ Math.ceil(item.temp - 273.6) }} <span>°C</span>
            </h4>
            <h4 class="mt-2 text-center">{{ item.weather[0].main }}</h4>
            <img
              id="icon"
              v-bind:src="showIcon(item.weather[0].icon)"
              class="animate__animated animate__flip animate__delay-1s center"
              alt=""
            />
            <!-- <h5 class="text-center">{{ timeConverter(item.dt) }}</h5> -->
            <!-- <h3>{{ city_info.name }}, {{ city_info.country }}</h3> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: ['date'],
      icon_url: 'http://openweathermap.org/img/wn/',
      //forecast: ,
    };
  },
  beforeCreate() {
    console.log(
      'Loading Show Hourly component and passed prop is:',
      typeof this.$route.params.date
    );
  },
  methods: {
    showIcon(iconId) {
      // 10d@2x.png
      let to_set = this.icon_url + iconId + '@2x.png';
      //console.log(to_set);
      return to_set;
    },
  },
};
</script>

<style scoped>
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
