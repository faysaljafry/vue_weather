import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store';
<script type='text/javascript' src='./assets/pakistan.json'></script>;

const app = createApp(App);

app.use(store);
app.mount('#app');
