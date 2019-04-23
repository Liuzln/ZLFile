'use strict';

module.exports = () => {
  const signinRule = {
    user_name: {
      type: 'string',
      required: true,
      allowEmpty: false,
      min: 4,
    },
    password: {
      type: 'password',
      required: true,
      allowEmpty: false,
      min: 6,
      max: 18,
    },
  };
  const signupRule = {
    user_name: {
      type: 'string',
      required: true,
      allowEmpty: false,
      min: 4,
    },
    password: {
      type: 'password',
      required: true,
      allowEmpty: false,
      min: 6,
      max: 18,
    },
    email: {
      type: 'email',
      required: true,
      allowEmpty: false,
    },
    country_code: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
    mobile: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
  };

  return {
    signinRule,
    signupRule,
  };
};
