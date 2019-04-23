'use strict';

module.exports = app => {
  /**
  * @param { Integer } id 主键ID
  * @param { String } user_name 用户名
  * @param { String } password 密码
  * @param { Integer } country_code 国家区号
  * @param { Integer } mobile 电话号码
  * @param { String } email 电子邮箱
  * @param { String } avatar_url 用户头像
  * @param { Date } created_at 创建时间
  * @param { Date } updated_at 更新时间
  * @param { Integer } is_vefily_email 邮箱验证状态
  * @param { Integer } is_delete 删除状态
  */
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_name: { type: STRING(32), allowNull: false },
    password: { type: STRING(256), allowNull: false },
    country_code: { type: STRING(8) },
    mobile: { type: STRING(32) },
    email: { type: STRING(255) },
    avatar_url: { type: STRING(255) },
    created_at: { type: DATE, defaultValue: new Date() },
    updated_at: { type: DATE, defaultValue: new Date() },
    is_vefily_email: { type: INTEGER, defaultValue: 0 },
    is_delete: { type: INTEGER, defaultValue: 0 },
  });

  return User;
};
