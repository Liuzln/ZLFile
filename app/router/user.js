'use strict';

module.exports = app => {
  // const checkJwtToken = app.middleware.checkJwtToken();
  app.router.post('/user/signin', app.controller.user.signin);
  app.router.post('/user/signup', app.controller.user.signup);
  app.router.post('/user/signout', app.controller.user.signout);
};
