var axios = require('axios');

var axiosClient = axios.create({
  baseURL: 'http://localhost:3000'
});

export default axiosClient;
