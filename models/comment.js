const mongoose = require("mongoose");
const schema = mongoose.Schema;

const commentSchema = new schema({
  post_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  commentor_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  comment: { type: String, required: true },
});

module.exports = mongoose.model("comment", commentSchema);
