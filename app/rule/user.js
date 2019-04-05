'use strict';

module.exports = () => {
  const signinRule = {
    userName: {
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
    userName: {
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
    countryCode: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
    mobile: {
      type: 'number',
      required: true,
      allowEmpty: false,
    },
  };

  return {
    signinRule,
    signupRule,
  };
};
