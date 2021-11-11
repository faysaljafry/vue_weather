import { createApp } from 'vue';
//import { Vue } from 'vue';
import App from './App.vue';
import { store } from './store';
import router from './router';
// import wb from './registerServiceWorker';
<script type='text/javascript' src='./assets/pakistan.json'></script>;

const app = createApp(App);
//app.prototype.$workbox = wb;
// Vue.prototype.$workbox = wb;
app.use(store);
app.use(router);
app.mount('#app');
