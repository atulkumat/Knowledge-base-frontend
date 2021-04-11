const groupValidationSchema = (name, description) => {
  const errors = {};

  if (name.length === 0) {
    errors.name = 'Required';
  } else if (name.length > 20) {
    errors.name = 'Maximum 20 characters allowed';
  }

  if (description.length > 1500) {
    errors.description = 'Maximum 1500 characters allowed';
  }

  return errors;
};

export default groupValidationSchema;
