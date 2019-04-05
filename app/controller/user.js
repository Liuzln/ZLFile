'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async signin() {
    const { ctx } = this;
    ctx.body = 'hi, signin';
  }
  async signup() {
    const { ctx } = this;
    ctx.body = 'hi, signup';
  }
}

module.exports = UserController;
