const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  body: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, required: true },
  comments: [
    {
      body: { type: String, required: true },
      username: { type: String, required: true },
      createdAt: { type: Date, required: true },
    },
  ],
  likes: [
    {
      username: { type: String, required: true },
      createdAt: { type: Date, required: true },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
