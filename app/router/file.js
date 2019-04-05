'use strict';

module.exports = app => {
  const checkJwtToken = app.middleware.checkJwtToken();
  app.router.post('/file/save', checkJwtToken, app.controller.file.save);
};
