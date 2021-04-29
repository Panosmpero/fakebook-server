const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const { isAuth } = require("../../util/helpers");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const user = isAuth(context);
      if (!body.trim().length)
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      try {
        const post = await Post.findById(postId);

        if (post) {
          post.comments.unshift({
            body,
            username: user.username,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        } else throw new UserInputError("Post not found");
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const user = isAuth(context);
      try {
        const post = await Post.findById(postId);

        if (post) {
          const commentIdx = post.comments.findIndex(
            (com) => com.id === commentId
          );

          if (post.comments[commentIdx].username === user.username) {
            post.comments.splice(commentIdx, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
