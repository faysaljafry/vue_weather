import { createApp } from 'vue';
//import { Vue } from 'vue';
import App from './App.vue';
import { store } from './store';
import router from './router';
// import wb from './registerServiceWorker';
<script type='text/javascript' src='./assets/pakistan.json'></script>;
import AOS from 'aos';
import 'aos/dist/aos.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import VueSocialSharing from 'vue-social-sharing';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserSecret);

const app = createApp(App);
//app.prototype.$workbox = wb;
// Vue.prototype.$workbox = wb;
app.use(store);
app.use(router);
app.mount('#app');
AOS.init();
app.use(AOS);
app.use(VueSocialSharing);
