<template>
  <div class="flex">
    {{ forecast }}
  </div>
</template>

<script>
export default {
  name: 'ShowHourly',
  pros: ['city_info'],
  data() {
    return {
      forecast: this.city_info,
    };
  },
  beforeCreate() {
    console.log('Loading Show Hourly component');
  },
  computed: {
    normalizedSize() {
      return this.city_info.trim().toLowerCase();
    },
  },
};
</script>
