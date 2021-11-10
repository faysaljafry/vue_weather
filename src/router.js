import { createRouter, createWebHistory } from 'vue-router';
import ShowHourly from './components/ShowHourly.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/showHourly',
      name: 'ShowHourly',
      component: ShowHourly,
      props: { city_info: true },
    },
  ],
});
export default router;
