'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // sequelize ORM
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};
