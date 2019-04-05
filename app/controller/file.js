'use strict';

const Controller = require('egg').Controller;

class FileController extends Controller {
  // 文件储存
  async save() {
    const { ctx } = this;
    ctx.body = 'hi, save';
  }
}

module.exports = FileController;
