import { confirmAlert } from 'react-confirm-alert';

const popUp = (history) => {
  confirmAlert({
    title: 'You need to Login/Signup',
    buttons: [
      {
        label: 'Login',
        onClick: () => {
          history.push('/login');
        },
      },
      {
        label: 'Signup',
        onClick: () => {
          history.push('/signup');
        },
      },
      {
        label: 'Cancel',
      },
    ],
  });
};
export default popUp;
