'use strict';

module.exports = app => {
  app.router.post('/user/signin', app.controller.user.signin);
  app.router.post('/user/signup', app.controller.user.signup);
};
