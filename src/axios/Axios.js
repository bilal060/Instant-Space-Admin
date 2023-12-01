import axios from 'axios';

const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}api/v1/`,
  withCredentials: true
});

Axios.interceptors.request.use((request) => {
  document.querySelector('.api-loading-bg').style.display = 'block';
  return request;
});

Axios.interceptors.response.use(
  (response) => {
    document.querySelector('.api-loading-bg').style.display = 'none';

    return response;
  },
  (error) => {
    document.querySelector('.api-loading-bg').style.display = 'none';
    throw error;
  }
);

export default Axios;
