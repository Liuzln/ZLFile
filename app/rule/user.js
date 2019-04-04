'use strict';

module.exports = () => {
    const signinRule = {
        email: {
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
        email: {
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

    return {
        signinRule,
        signupRule,
    };
};
