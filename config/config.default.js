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

    config.validate = {
        enable: true,
        package: 'egg-validate',
    };

    config.mongoose = {
        url: 'mongodb://127.0.0.1/example',
        options: {},
    };
    return {
        ...config,
        ...userConfig,
    };
};
