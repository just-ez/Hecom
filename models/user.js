const mongoose = require('mongoose');

  let Schema = mongoose.Schema;
  let UserSchema = new Schema ({
      name: {
          type: String,
        //   required: true
      },
      email: {
          type: String,
        //   required: true
      }
  },{timestamps: true})
  const User = mongoose.model('User',UserSchema);
  module.exports = User