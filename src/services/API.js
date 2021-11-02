import axios from 'axios';
export default () => {
  return axios.create({
    baseURL: `http://localhost:8083/`, // the url of our server
  });
};
