<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            class="card border border-dark  rounded m-4 animate__animated animate__zoomIn animate__delay-0s"
            v-for="item in forecast"
            :key="item"
            style="width: 18rem; border-radius: 5%"
          >
            <div
              class="card-body border-rounded text-dark hover:bg-green-900 hover:border-transparent"
            >
              <h4 class="card-title text-3xl text-center">
                {{ Math.floor(item.temp - 273.15) }} <span>°C</span>
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

</template>

<script>
export default {
  data() {
    
    return {
      icon_url: 'http://openweathermap.org/img/wn/',
      forecast: this.$store.getters.getHourlyDetailstoShow
    };
  },
  beforeCreate() {
    console.log('Loading Show Hourly component');
  },
  updated() {
    
      console.log("Passed props are: ", this.forecast)

    },
  methods: {
    showIcon(iconId) {
          // 10d@2x.png
          let to_set = this.icon_url + iconId + '@2x.png';
          //console.log(to_set);
          return to_set;
        },
      }
};
</script>
