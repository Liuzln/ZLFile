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
      userName: user.userName,
      password: crypto.createHash('md5').update(user.password).digest('hex'),
      email: user.email,
      countryCode: user.countryCode,
      mobile: user.mobile,
    });
    return createUser;
  }

  async findById(id) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(id);
    return user;
  }

  async findByUserNameOrEmail({ userName, email }) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({
      $or: [
        { userName },
        { email },
      ],
    });
    return user;
  }
}

module.exports = UserService;
