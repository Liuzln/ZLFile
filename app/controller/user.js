'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 用户登录
  async signin() {
    const { ctx } = this;
    const body = ctx.request.body;
    // 参数校验
    ctx.validate(ctx.app.rule.user.signinRule, body);
    try {
      // 查询用户信息
      const user = await ctx.service.user.findByUserNameOrEmail({
        userName: body.userName,
        email: body.userName,
      });
      if (!user) {
        ctx.body = {
          message: '用户不存在',
        };
        ctx.status = 401;
        return;
      }
      if (user.password) {
        ctx.body = {
          message: '用户不存在',
        };
        ctx.status = 401;
        return;
      }
      ctx.body = 'hi, signin';
    } catch (err) {
      this.logger.error(err);
    }
  }

  // 用户注册
  async signup() {
    const { ctx } = this;
    const body = ctx.request.body;
    // 参数校验
    ctx.validate(ctx.app.rule.user.signupRule, body);
    try {
      // 查询此用户是否已注册
      let user = await ctx.service.user.findByUserNameOrEmail({
        userName: body.userName,
        email: body.email,
      });
      if (user) {
        ctx.body = {
          message: '用户已存在',
        };
        ctx.status = 403;
        return;
      }
      // 创建用户
      user = await ctx.service.user.create(body);
      // 根据用户信息生成JWT令牌
      const token = await ctx.service.jwt.generateJWTByUser(user);
      ctx.body = {
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          countryCode: user.countryCode,
          mobile: user.mobile,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      };
      ctx.status = 201;
    } catch (err) {
      this.logger.error(err);
    }
  }

  // 用户登出
  async signout() {
    const { ctx } = this;
    ctx.body = 'hi, signout';
  }
}

module.exports = UserController;
