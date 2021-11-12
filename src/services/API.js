import axios from 'axios';
export default () => {
  return axios.create({
    baseURL: `https://vueweather-pwa.herokuapp.com/`, // the url of our server
  });
};
