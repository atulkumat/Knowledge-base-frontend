export const validateFirstName = (errorsObj, firstName) => {
  const errors = errorsObj;

  if (firstName.length === 0) {
    errors.firstName = 'Required';
  } else if (firstName.length > 20) {
    errors.firstName = 'Maximum 20 characters allowed';
  } else {
    delete errors.firstName;
  }
  return errors;
};

export const validateLastName = (errorsObj, lastName) => {
  const errors = errorsObj;

  if (lastName.length === 0) {
    errors.lastName = 'Required';
  } else if (lastName.length > 20) {
    errors.lastName = 'Maximum 20 characters allowed';
  } else {
    delete errors.lastName;
  }
  return errors;
};

export const validateGender = (errorsObj, gender) => {
  const errors = errorsObj;

  if (gender.length === 0) {
    errors.gender = 'Required';
  } else {
    delete errors.gender;
  }
  return errors;
};

export const validateDob = (errorsObj, dob) => {
  const errors = errorsObj;

  const date = new Date();
  if (dob.length === 0) {
    errors.dob = 'Required';
  } else if (date.getFullYear() - dob.getFullYear() < 15) {
    errors.dob = 'You should be older than 15 years';
  } else {
    delete errors.dob;
  }
  return errors;
};
