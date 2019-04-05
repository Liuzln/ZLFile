'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FileSchema = new Schema({
  });

  return mongoose.model('File', FileSchema);
};
