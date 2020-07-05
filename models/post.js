const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
