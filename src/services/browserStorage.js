import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getItem = (item) => cookies.get(item);

export const setItem = (item, value) => {
  cookies.set(item, value, { path: '/' });
};

export const removeItem = (item) => {
  cookies.remove(item, { path: '/' });
};
