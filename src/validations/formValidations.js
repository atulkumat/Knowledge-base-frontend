import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password is to short - should be 8 character minimum')
    .max(20, 'Password is to long - should be 8 character maximum')
    .matches(/(?=.*[0-9])/, 'Password must contain a number'),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password is to short - should be 8 character minimum')
    .max(20, 'Password is to long - should be 8 character maximum')
    .matches(/(?=.*[0-9])/, 'Password must contain a number'),
  gender: Yup.string()
    .required('Required'),
  dob: Yup.string()
    .required('Required'),
  first_name: Yup.string()
    .required('Required')
    .max(20, 'Name should be 20 character maximum'),

  last_name: Yup.string()
    .required('Required')
    .max(20, 'Name should be 20 character maximum'),
});
