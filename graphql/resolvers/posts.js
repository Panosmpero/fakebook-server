const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const { isAuth } = require("../../util/helpers");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = isAuth(context);

      if (!body.trim().length) throw new UserInputError("Post body must not be empty")

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      // subscription beta
      context.pubsub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },
    deletePost: async (_, { postId }, context) => {
      const user = isAuth(context);
      // check if the user is the creator of the post
      try {
        const post = await Post.findById(postId);
        if (post.username === user.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    likePost: async (_, { postId }, context) => {
      const user = isAuth(context);

      try {
        const post = await Post.findById(postId);

        if (post) {
          if (post.likes.find((like) => like.username === user.username)) {
            // remove like
            post.likes = post.likes.filter(
              (like) => like.username !== user.username
            );
          } else {
            // add like
            post.likes.push({
              username: user.username,
              createdAt: new Date().toISOString(),
            });
          }
          await post.save();
          return post;
        } else throw new UserInputError("Post not found");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (parent, args, { pubsub }, info) =>
        pubsub.asyncIterator("NEW_POST"),
    },
  },
  Post: {
    likesCount: (parent, args, context, info) => parent.likes.length,
    commentsCount: (parent, args, context, info) => parent.comments.length,
  },
};
