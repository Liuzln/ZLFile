'use strict';
const crypto = require('crypto');
const Service = require('egg').Service;

class UserService extends Service {
  /**
   * @description 创建用户
   * @param {Object} user 用户
   */
  async create(user) {
    const { ctx } = this;
    const createUser = await ctx.model.User.create({
      user_name: user.user_name,
      password: crypto.createHash('md5').update(user.password).digest('hex'),
      email: user.email,
      country_code: user.country_code,
      mobile: user.mobile,
    });
    return createUser;
  }

  async findById(id) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(id);
    return user;
  }

  async findByUserNameOrEmail({ user_name, email }) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({
      $or: [
        { user_name },
        { email },
      ],
    });
    return user;
  }
}

module.exports = UserService;
