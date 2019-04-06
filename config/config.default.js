/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1552749927657_1634';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // close csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.validate = {
    enable: true,
    package: 'egg-validate',
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/zlfile',
    options: {},
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '12345',
      db: 0,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
