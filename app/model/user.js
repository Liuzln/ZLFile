'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  /**
    * @param userName 用户名
    * @param password 密码
    * @param countryCode 国家区号
    * @param mobile 电话号码
    * @param email 电子邮箱
    * @param avatarUrl 用户头像
    * @param createdAt 创建时间
    * @param updatedAt 更新时间
    * @param isVefilyEmail 邮箱验证状态
    * @param isDelete 删除状态
    */
  const UserSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    countryCode: { type: String },
    mobile: { type: String },
    email: { type: String },
    avatarUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isVefilyEmail: { type: Number, default: 0 },
    isDelete: { type: Number, default: 0 },
  });

  return mongoose.model('User', UserSchema);
};
