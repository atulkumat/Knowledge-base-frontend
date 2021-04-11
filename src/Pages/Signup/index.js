import axios from 'axios';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import logo from 'assets/images/logo.png';
import DatePicker from 'react-datepicker';
import API_ROUTES from 'constants/api/apiRoutes';
import { confirmAlert } from 'react-confirm-alert';
import { message, title } from 'constants/dialogueBox';
import { signupSchema } from 'validations/formValidations';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'Pages/Signup/index.css';
import PageLoader from 'Components/PageLoader';

const SignUp = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  if (loading) {
    return <PageLoader />;
  }

  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        gender: '',
        dob: new Date(),
        password: '',
        email: '',
      }}
      validationSchema={signupSchema}
      onSubmit={(values) => {
        setLoading(true);
        axios.post(API_ROUTES.signup, values).then(() => {
          setLoading(false);
          confirmAlert({
            title,
            message,
            buttons: [
              {
                label: 'OK',
                onClick: () => {
                  history.push('/');
                },
              },
            ],
          });
        }).catch(() => {
          setLoading(false);
          setError('email already exists');
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
          setFieldValue,
          isSubmitting,
        } = obj;
        return (
          <div className='signup'>
            <div className='signup__container'>
              <img
                className='signup__logo'
                src={logo}
                alt='logo'
              />
              <h2 className='signup__heading'>
                Sign up to Knowledge Base
              </h2>
              <form
                className='signup__form'
                onSubmit={handleSubmit}
              >
                <div className='signup__input__group'>
                  <label className='form__label' htmlFor='first_name'>
                    First Name
                  </label>
                  <div className='effect'>
                    <input
                      type='text'
                      name='first_name'
                      id='first_name'
                      value={values.first_name}
                      placeholder='Enter your first name'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.first_name
                        && touched.first_name && 'error'
                      }
                    />
                    <div className='input-feedback'>
                      {
                        errors.first_name
                            && touched.first_name
                          ? errors.first_name : ''
                      }
                    </div>
                  </div>
                </div>
                <div className='signup__input__group'>
                  <label className='form__label' htmlFor='last_name'>
                    Last Name
                  </label>
                  <div className='effect'>
                    <input
                      type='text'
                      name='last_name'
                      id='last_name'
                      value={values.last_name}
                      placeholder='Enter your last name'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.last_name
                        && touched.last_name && 'error'
                      }
                    />
                    <div className='input-feedback'>
                      {
                        errors.last_name
                            && touched.last_name
                          ? errors.last_name : ''
                      }
                    </div>
                  </div>
                </div>
                <div className='signup__input__group'>
                  <label className='form__label' htmlFor='email'>
                    Email-Id
                  </label>
                  <div className='effect'>
                    <input
                      type='text'
                      name='email'
                      id='email'
                      value={values.email}
                      placeholder='Enter your email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email
                        && touched.email && 'error'
                      }
                    />
                    <div className='input-feedback'>
                      {
                        errors.email && touched.email
                          ? errors.email : ''
                      }
                    </div>
                  </div>
                </div>
                <div className='signup__input__group'>
                  <label className='form__label' htmlFor='password'>
                    Password
                  </label>
                  <div className='effect'>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      value={values.password}
                      placeholder='Enter your password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password
                        && touched.password && 'error'
                      }
                    />
                    <div className='input-feedback'>
                      {
                        errors.password
                            && touched.password
                          ? errors.password : ''
                      }
                    </div>
                  </div>
                </div>
                <div className='signup__input__group'>
                  <label className='form__label' htmlFor='gender'>
                    Gender
                  </label>
                  <div className='effect'>
                    <select
                      name='gender'
                      id='gender'
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option
                        value=''
                        label='Select your gender'
                      />
                      <option
                        value='male'
                        label='Male'
                      />
                      <option
                        value='female'
                        label='Female'
                      />
                      <option
                        value='others'
                        label='Others'
                      />
                    </select>
                    <div className='input-feedback'>
                      {
                        errors.gender
                            && touched.gender
                          ? errors.gender : ''
                      }
                    </div>
                  </div>
                </div>
                <div className='signup__input__group'>
                  <label className='form__label' htmlFor='dob'>
                    Date of Birth
                  </label>
                  <div className='effect'>
                    <DatePicker
                      selected={values.dob}
                      id='dob'
                      onChange={
                        (date) => setFieldValue('dob', date)
                      }
                      dateFormat='dd/MM/yyyy'
                      maxDate={new Date()}
                      showYearDropdown
                      scrollableYearDropdown
                    />
                    <div className='input-feedback'>
                      {
                        errors.dob
                            && touched.dob
                          ? errors.dob : ''
                      }
                    </div>
                  </div>
                </div>
                <div className='form__buttons'>
                  <div className='input-feedback signup-error'>
                    { error }
                  </div>
                  <button
                    type='submit'
                    className='login__btn'
                    disabled={isSubmitting}
                  >
                    Sign Up
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

export default SignUp;
