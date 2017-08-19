let axios = require('axios');

let axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

export default axiosClient;
