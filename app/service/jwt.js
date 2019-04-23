'use strict';

const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const Service = require('egg').Service;

// 常量
const REDIS_USER_TOKEN_HASH_PREFIX = 'userToken:';
const REDIS_USER_TOKEN_FIELD = 'tokenSecret';

class JwtService extends Service {
  /**
   * @description 根据用户信息生成 jwtToken
   * @param { Object } user 用户对象
   */
  async generateJWTByUser(user) {
    const { ctx } = this;
    const payload = {
      userId: user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // 生成随机的UUID作为密匙
    const secret = uuidv4();
    const options = {
      algorithm: 'HS256', // 签名算法
      issuer: 'zlfile', // 签发人
      jwtid: String(user._id), // 编号
      audience: String(user.userName), // 受众
      subject: 'normal', // 主题
      expiresIn: '15m', // 过期时间
    };
    // 生成JWT令牌
    const token = await jwt.sign(payload, secret, options);
    // 储存密钥到缓存
    const hash = REDIS_USER_TOKEN_HASH_PREFIX + user._id;
    await ctx.app.redis.hset(hash, REDIS_USER_TOKEN_FIELD, secret);
    await ctx.app.redis.expire(hash, 60 * 60 * 48);
    return token;
  }

  /**
   * @description 检验 jwtToken 完整性
   * @param { String } token jwtToken
   */
  async checkJwtToken(token) {
    const { ctx } = this;
    // 解析 jwtToken 获取 payload
    const decoded = jwt.decode(token, { complete: true });
    if (decoded) {
      const payload = decoded.payload;
      // 从缓存获取密钥
      const hash = REDIS_USER_TOKEN_HASH_PREFIX + payload.userId;
      const secret = await ctx.app.redis.hget(hash, REDIS_USER_TOKEN_FIELD);
      if (secret) {
        try {
          // 根据 jwtToken 和 secret 检验是否完整
          const decoded = jwt.verify(token, secret);
          return decoded;
        } catch (err) {
          this.logger.error(err);
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  /**
   * @description 通过 jwtToken 解析获取 header 和 payload
   * @param { String } token jwtToken
   */
  async decodeJwtToken(token) {
    const decoded = jwt.decode(token, { complete: true });
    return decoded;
  }

  /**
   * @description 作废 jwtToken
   * @param { String } token jwtToken
   */
  async invalidJwtToken(token) {
    const { ctx } = this;
    // 解析 jwtToken 获取 payload
    const decoded = jwt.decode(token, { complete: true });
    if (decoded) {
      const payload = decoded.payload;
      // 从缓存获取密钥
      const hash = REDIS_USER_TOKEN_HASH_PREFIX + payload.userId;
      await ctx.app.redis.hdel(hash, REDIS_USER_TOKEN_FIELD);
    }
  }
}

module.exports = JwtService;
