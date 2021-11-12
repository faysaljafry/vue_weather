import { createRouter, createWebHistory } from 'vue-router';
import ShowHourly from './components/ShowHourly.vue';
import home from './components/home.vue';
import { def } from '@vue/shared';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/showHourly/:date',
      name: 'ShowHourly',
      component: ShowHourly,
      //props: true,
      props: (route) => ({ date: route.params.date }),
    },
    {
      path: '/home',
      name: home,
      component: home,
    },
    {
      path: '/',
      name: def,
      component: home,
    },
  ],
});
export default router;
