const validateReply = (reply) => {
  if (reply.length === 0) {
    return 'Comment can not be blank';
  } if (reply.length > 500) {
    return 'Comment too long, Maximum 500 characters allowed';
  }
  return '';
};

export default validateReply;
