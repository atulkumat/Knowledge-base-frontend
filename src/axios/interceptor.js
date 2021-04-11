import axios from 'axios';
import { getItem } from 'services/browserStorage';

axios.interceptors.request.use(
  (request) => {
    if (!request.url.includes('auth')) {
      request.headers.Authorization = getItem('token');
    }
    return request;
  },
  (error) => {
    Promise.reject(error);
  },
);
