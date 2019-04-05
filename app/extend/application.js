'use strict';

const fs = require('fs');
const path = require('path');

const PROJECT_PATH = process.cwd();
const MODULE_DIR_PATH = PROJECT_PATH + '/app/rule';
const RULE = Symbol('Application#rule');

module.exports = {
  get rule() {
    if (!this[RULE]) {
      try {
        this[RULE] = {};
        // 读取rule文件夹下的所有JS文件
        const moduleFile = fs.readdirSync(MODULE_DIR_PATH);
        for (const fileName of moduleFile) {
          // 检测是否是JS文件
          if (!/\.js$/.test(fileName)) {
            return;
          }
          const module = require(MODULE_DIR_PATH + '/' + fileName);
          // 去除文件名后缀
          const keyName = path.basename(fileName, '.js');
          this[RULE][keyName] = module();
        }
      } catch (err) {
        // 异常处理
        this.logger.error(err);
        this[RULE] = {};
        return;
      }
    }
    return this[RULE];
  },
};
