import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import API_ROUTES from 'constants/api/apiRoutes';
import logo from 'assets/images/logo.png';
import PageLoader from 'Components/PageLoader';
import { logIn } from 'actions/authActions';
import { useDispatch } from 'react-redux';
import { loginSchema } from 'validations/formValidations';
import { setItem } from 'services/browserStorage';
import 'Pages/Login/index.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  if (loading) {
    return (
      <PageLoader />
    );
  }
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        setLoading(true);
        axios.post(API_ROUTES.login, values).then((res) => {
          setItem('token', res.data.token);
          setLoading(false);
          dispatch(logIn(res.data.user));
          history.push('/home');
        }).catch((err) => {
          setLoading(false);
          setError(err.response.data.error);
        });
      }}
    >
      {(obj) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        } = obj;
        return (
          <div className='login'>
            <div className='login__container'>
              <img className='login__logo' src={logo} alt='logo' />
              <h2 className='login__heading'>Sign-in</h2>
              <form className='form__section' onSubmit={handleSubmit}>
                <div className='input__group'>
                  <label className='form__label' htmlFor='email'>Email-Id</label>
                  <div className='effect'>
                    <input
                      type='text'
                      name='email'
                      id='email'
                      value={values.email}
                      placeholder='Enter your email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email && 'error'}
                    />
                    <div className='input-feedback'>
                      {errors.email && touched.email ? errors.email : ''}
                    </div>
                  </div>
                </div>

                <div className='input__group'>
                  <label className='form__label' htmlFor='password'>Password</label>
                  <div className='effect'>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      value={values.password}
                      placeholder='Enter your password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.password && touched.password && 'error'}
                    />
                    <div className='input-feedback'>
                      {errors.password && touched.password ? errors.password : ''}
                    </div>
                  </div>
                </div>
                <div className='form__buttons'>
                  <div className='login__error'>
                    {error}
                  </div>
                  <button type='submit' className='login__btn' disabled={isSubmitting}>
                    Sign In
                  </button>
                  <Link to='/' className='back__btn'>Back</Link>
                </div>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
