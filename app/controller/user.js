'use strict';

const crypto = require('crypto');
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
          message: '用户名或邮箱不存在',
        };
        ctx.status = 401;
        return;
      }
      const password = crypto.createHash('md5').update(body.password).digest('hex');
      if (password !== user.password) {
        ctx.body = {
          message: '密码错误',
        };
        ctx.status = 401;
        return;
      }
      // 生成 jwtToken
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
    const token = ctx.request.header.authorization;
    if (token) {
      try {
        await ctx.service.jwt.invalidJwtToken(token);
      } catch (err) {
        this.logger.error(err);
      }
    }
    ctx.body = {
      message: '登出成功',
    };
  }

  // 用户信息
  async info() {
    const { ctx } = this;
    const id = ctx.params.id;
    const user = ctx.service.user.findById(id);
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
    };
  }

  // TODO: 管理员功能 更改密码 提交旧密码 新密码
  // TODO: 验证邮箱
  // TODO: 修改密码 展示已绑定邮箱地址 点击发送 根据邮箱地址 储存URL信息到缓存 发送URL邮件给邮箱
  // TODO: 找回密码 展示已绑定邮箱地址 点击发送 根据邮箱地址 储存URL信息到缓存 发送URL邮件给邮箱
}

module.exports = UserController;
