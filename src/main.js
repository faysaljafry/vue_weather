import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { store } from './store';
import './registerServiceWorker';
import ShowHourly from './components/ShowHourly.vue';
<script type='text/javascript' src='./assets/pakistan.json'></script>;

const app = createApp(App);
app.component('ShowHourly', ShowHourly);
app.use(store);
app.use(router);
app.mount('#app');
