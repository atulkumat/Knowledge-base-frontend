import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import logo from 'assets/images/logo.png';
import PageLoader from 'Components/PageLoader';
import GENDER_OPTIONS from 'constants/selectBox/genderSelect';
import { updateUserDetails } from 'actions/userActions';
import {
  validateFirstName, validateLastName, validateDob, validateGender,
} from './validationSchema';
import './index.css';

const Edit = () => {
  const user = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const flags = useSelector((state) => state.flags);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Gender');
  const [dob, setDob] = useState(new Date());
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setDob(new Date(user.dob));
      setGender(user.gender);
    }
  }, [user]);

  if (flags.loading || !user) {
    return <PageLoader />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length !== 0) {
      return;
    }
    const values = {
      first_name: firstName,
      last_name: lastName,
      gender: gender.value,
      dob,
    };
    dispatch(updateUserDetails(values, history));
  };
  return (
    <div className='editDetails'>
      <div className='editDetails-container'>
        <img
          className='editDetails-logo'
          src={logo}
          alt='logo'
        />
        <h2 className='editDetails-heading'>
          Edit Personal Details
        </h2>
        <form
          className='editDetails-form'
          onSubmit={handleSubmit}
        >
          <div className='editDetails-input-group'>
            <label className='form__label' htmlFor='first_name'>
              First Name
            </label>
            <div className='effect'>
              <input
                type='text'
                name='first_name'
                id='first_name'
                value={firstName}
                placeholder='Enter your first name'
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => setErrors(validateFirstName({ ...errors }, firstName))}
                className={errors.firstName && 'error'}
              />
              <div className='input-feedback'>
                { errors.firstName ? errors.firstName : '' }
              </div>
            </div>
          </div>
          <div className='editDetails-input-group'>
            <label className='form__label' htmlFor='last_name'>
              Last Name
            </label>
            <div className='effect'>
              <input
                type='text'
                name='last_name'
                id='last_name'
                value={lastName}
                placeholder='Enter your last name'
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => setErrors(validateLastName({ ...errors }, lastName))}
                className={errors.lastName && 'error'}
              />
              <div className='input-feedback'>
                { errors.lastName ? errors.lastName : '' }
              </div>
            </div>
          </div>
          <div className='editDetails-input-group'>
            <label className='form__label' htmlFor='gender'>
              Gender
            </label>
            <div className='effect'>
              <Select
                options={GENDER_OPTIONS}
                defaultValue={{ label: gender, value: gender }}
                id='gender'
                placeholder='Select your gender'
                onChange={(gender) => setGender(gender)}
                onBlur={() => setErrors(validateGender({ ...errors }, gender))}
                name='gender'
                className={errors.gender && 'error'}
              />
              <div className='input-feedback'>
                { errors.gender ? errors.gender : '' }
              </div>
            </div>
          </div>
          <div className='editDetails-input-group'>
            <label className='form__label' htmlFor='dob'>
              Date of Birth
            </label>
            <div className='effect'>
              <DatePicker
                selected={dob}
                id='dob'
                onChange={(date) => setDob(date)}
                className={errors.dob && 'error'}
                onBlur={() => setErrors(validateDob({ ...errors }, dob))}
                dateFormat='dd/MM/yyyy'
                showMonthDropdown
                showYearDropdown
                placeholderText='Select you date of birth'
                dropdownMode='select'
                name='dob'
              />
              <div className='input-feedback'>
                { errors.dob ? errors.dob : '' }
              </div>
            </div>
          </div>
          <div className='form__buttons'>
            <div className='editDetails-error'>
              {flags.errors}
            </div>
            <button
              type='submit'
              className='login__btn'
            >
              Save
            </button>
            <Link to='/home/profile' className='back__btn'>Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
