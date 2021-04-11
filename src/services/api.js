import axios from 'axios';

export const post = (url, values) => new Promise((resolve, reject) => {
  axios.post(url, values).then((res) => {
    resolve(res);
  }).catch((err) => {
    reject(err);
  });
});

export const get = (url) => new Promise((resolve, reject) => {
  axios.get(url).then((res) => {
    resolve(res);
  }).catch((err) => {
    reject(err);
  });
});

export const patch = (url, values) => new Promise((resolve, reject) => {
  axios.patch(url, values).then((res) => {
    resolve(res);
  }).catch((err) => {
    reject(err);
  });
});

export const deleteApi = (url) => new Promise((resolve, reject) => {
  axios.delete(url).then((res) => {
    resolve(res);
  }).catch((err) => {
    reject(err);
  });
});
