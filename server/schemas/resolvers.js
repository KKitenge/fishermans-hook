const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment, Message } = require("../models/index");
const { signToken } = require("../utils/auth");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");

const configuration = new Configuration({
  organization: "org-YLNfaOCVsvPpQKVV3HN6Q391",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -posts -comments -messages -trips")
        .populate("friends")
        .populate("trips")
        .populate("posts")
        .populate("comments")
        .populate("messages");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -posts -comments -messages -trips")
        .populate("friends")
        .populate("trips")
        .populate("posts")
        .populate("comments")
        .populate("messages");
    },

    // get a user by _id
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -posts -comments -messages -trips")
          .populate("friends")
          .populate("trips")
          .populate("posts")
          .populate("comments")
          .populate("messages");
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    // get all posts
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },

    // get a post by _id
    post: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      if (!_id) {
        throw new Error("No post found with this id!");
      }
      return Post.findOne(params);
    },

    // get comments by postId
    comments: async (parent, { postId }) => {
      const params = postId ? { postId } : {};
      return Comment.find(params).sort({ createdAt: -1 });
    },

    // get a comment by _id
    comment: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      if (!_id) {
        throw new Error("No comment found with this id!");
      }

      return Comment.findOne(params);
    },

    // get messages by userId
    messages: async (parent, { userId }) => {
      const params = userId ? { userId } : {};

      return User.find(params).select("-__v -messages").populate("messages");
    },

    // get forecast by city
    getForecast: async (parent, { city }) => {
      const apiKey = process.env.WEATHER_API_KEY;
      const response = await fetch(
        `http://dataservice.accuweather.com/Locations/v1/cities/search?apikey=${apiKey}&q=${city}`
      );
      const locations = await response.json();
      const locationKey = locations[0].Key;

      const forecastResponse = await fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true`
      );
      const forecast = await forecastResponse.json();

      return forecast;
    },

    // getOpenAI
    ChatCompletion: async (parent, { model, amessage }) => {
      const completion = await openai.createChatCompletion({
        model: model,
        prompt: {
          prompt:
            "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
          max_tokens: 250,
          temperature: 0.7,
          frequency_penalty: 0,
          presence_penalty: 0.6,
          stop: ["\n", " Human:", " AI:"],
        },
        amessage: amessage,

        Mutation: {
          // login a user
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new AuthenticationError("Incorrect credentials");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
              throw new AuthenticationError("Incorrect credentials");
            }
            const token = signToken(user);
            return { token, user };
          },

          // add a user
          addUser: async (parent, { username, firstName, email, password }) => {
            const user = await User.create({
              username,
              firstName,
              email,
              password,
            });
            const token = signToken(user);
            return { token, user };
          },

          // add a trip
          addTrip: async (parent, args, context) => {
            if (context.user) {
              const trip = await Trip.create({
                ...args,
                username: context.user.username,
              });
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { trips: trip._id } },
                { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
          },

          // add a post
          addPost: async (parent, args, context) => {
            if (context.user) {
              const post = await Post.create({
                ...args,
                username: context.user.username,
              });
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { posts: post._id } },
                { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in to post !");
          },

          // add a comment
          addComment: async (parent, { postId, commentBody }, context) => {
            if (context.user) {
              const updatedPost = await Post.findOneAndUpdate(
                { _id: postId },
                {
                  $push: {
                    comments: { commentBody, username: context.user.username },
                  },
                },
                { new: true, runValidators: true }
              );
              return updatedPost;
            }
            throw new AuthenticationError(
              "You need to be logged in to comment !"
            );
          },

          // add a friend
          addFriend: async (parent, { username }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: username } },
                { new: true }
              ).populate("friends");
              return updatedUser;
            }
            throw new AuthenticationError(
              "You need to be logged in to add a friend !"
            );
          },

          // add a message
          newMessage: async (parent, { messageText, recipient }, context) => {
            const newMessage = await Message.create({
              messageText,
              recipient,
              sender: context.user.username,
              messageAuthor: context.user._id,
            });
            return newMessage;
          },

          // remove a trip
          removeTrip: async (parent, { tripId }, context) => {
            const user = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { trips: tripId } },
              { new: true }
            );
            return user;
          },

          // remove a post
          removePost: async (parent, { postId }, context) => {
            const user = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { posts: postId } },
              { new: true }
            );
            return user;
          },

          // remove a comment
          removeComment: async (parent, { postId, _id }, context) => {
            const updatedPost = await Post.findOneAndUpdate(
              { _id: postId },
              { $pull: { comments: { _id: _id } } },
              { new: true }
            );
            return updatedPost;
          },

          // remove a friend
          removeFriend: async (parent, { friendId }, context) => {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { friends: friendId } },
              { new: true }
            ).populate("friends");
            return updatedUser;
          },

          // remove a message
          deleteMessage: async (parent, { messageId }, context) => {
            const deletedMessage = await Message.findOneAndDelete({
              _id: messageId,
              messageAuthor: context.user._id,
            });
            return deletedMessage;
          },

          createChatCompletion: async (_, { model, amessages }) => {
            try {
              const response = await axios.post(
                "https://api.openai.com/v1/chat/completions", // This URL may need to be updated
                {
                  model,
                  amessages,
                },
                {
                  headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              return response.data;
            } catch (error) {
              throw new Error(error);
            }
          },
        },
      });
    },
  },
};

module.exports = resolvers;
