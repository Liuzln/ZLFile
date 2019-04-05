'use strict';

module.exports = () => {
  return async function checkJwtToken(ctx, next) {
    const token = ctx.request.header.authorization;
    // 检查 jwt token 的完整性
    const decoded = await ctx.service.jwt.checkJwtToken(token);
    if (!decoded) {
      ctx.body = {
        message: '登录凭证失效',
      };
      ctx.status = 401;
      return;
    }
    await next();
  };
};
