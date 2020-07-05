const { gql, withFilter } = require("apollo-server-express");
const { PubSub } = require("apollo-server-express");

const pubSub = new PubSub();
//import models
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const user = require("../models/user");
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
  }

  type Post {
    _id: ID!
    user_id: ID!
    title: String!
    content: String!
  }
  type Comment {
    _id: ID!
    post_id: ID!
    commentor_id: ID!
    comment: String!
  }
  type message {
    message: String!
    _id: ID
    status:Int
  }
  type Mutation {
    addUser(username: String!, password: String!): message
    addPost(title: String!, content: String!,user_id:String!): message
    addComment(comment: String!, post_id: ID!,commentor_id:String!): message
    login(username: String!, password: String!): message
  }
  type Query {
    viewPost: [Post!]
    viewComment(post_id: ID!): [Comment!]
  }
`;

const resolvers = {
  Query: {
    viewPost: async (parent, args, context) => {
      let posts = await Post.find();
      return posts;
    },
    viewComment: async (parent,args, context) => {
      let comments = await Comment.find({ post_id: args.post_id });
      console.log(comments)
      return comments;
    },
  },
  Mutation: {
    login: async (parent, { username, password }, context) => {
      const user = await User.findOne({username:username,password:password})
      if(user){
          console.log(user)
        console.log("user logged in");
        return { message: "user logged in",_id:user._id ,status:200};
      }
      else{
        console.log("user log in fail");
        return { message: "user log in failed",status:409 };
      }
    },
    addUser: async (parent, args, context) => {
      const user = new User({
        username: args.username,
        password: args.password,
      });
      try {
        await user.save();
      } catch (err) {
        console.log(err);
        console.log("user not created");
        return { message: "User Not Created",status:400 };
      }
      console.log("user created");
      return { message: "User Created" ,status:200};
    },
    addPost: async (parent, args, context) => {
      const post = new Post({
        user_id: args.user_id,
        title: args.title,
        content: args.content,
      });
      await post.save();
      return { message: "Post Created",status:200 };
    },
    addComment: async (parent, args, context) => {
        console.log(args.comment)
      const comment = new Comment({
        post_id: args.post_id,
        commentor_id: args.commentor_id,
        comment: args.comment,
      });
      await comment.save();
      return { message: "Comment added" ,status:200};
    },
  },
};

module.exports = { typeDefs, resolvers };
