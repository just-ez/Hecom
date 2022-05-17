  const mongoose = require('mongoose');

  let Schema = mongoose.Schema;
  let BlogSchema = new Schema ({
      // image: {
      //     type: String,
      //     required: true
      // },
     caption: {
          type: String,
          required: true
      },
      snipnet: {
        type: String,
        required: true
    },
    body: {
      type: String,
      required: true
  }
  },{timestamps: true})
  const Blog = mongoose.model('Blog',BlogSchema);
  module.exports = Blog