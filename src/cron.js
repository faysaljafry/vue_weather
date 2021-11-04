var cron = require('node-cron');

cron.schedule('5 * * * * *', () => {
  console.log('running a task every minute at the 5th second');
  setTimeout(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.city_info.latitude}&lon=${this.city_info.longitude}&appid=db225a9416a485c121752c8f2876d298`
    )
      .then((response) => response.json())
      .then((result) => {
        this.forecast_result(result);
        this.results(result.hourly);
      });
  }, 1000);
});
