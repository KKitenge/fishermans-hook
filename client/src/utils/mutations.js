import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation newMessage($messageText: String!, $username: String!) {
    newMessage(messageText: $messageText, username: $username) {
      _id
      messageText
      username
      createdAt
    }
  }
`;

export const ADD_POST = gql`
  mutation newPost(
    $postTitle: String!
    $postText: String!
    $postAuthor: String!
  ) {
    newPost(
      postTitle: $postTitle
      postText: $postText
      postAuthor: $postAuthor
    ) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $postId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      postId: $postId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation addTrip($username: String!, $tripText: String!) {
    addTrip(username: $username, tripText: $tripText) {
      _id
      tripText
      username
      createdAt
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($username: String!) {
    addFriend(username: $username) {
      _id
      username
      firstName
      email
      friends {
        _id
        username
        firstName
        email
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($username: String!) {
    removeFriend(username: $username) {
      _id
      username
      firstName
      email
      friends {
        _id
        username
        firstName
        email
      }
    }
  }
`;

export const REMOVE_MESSAGE = gql`
  mutation deleteMessage($messageId: ID!) {
    deleteMessage(messageId: $messageId) {
      _id
      messageText
      username
      createdAt
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const REMOVE_TRIP = gql`
  mutation removeTrip($tripId: ID!) {
    removeTrip(tripId: $tripId) {
      _id
      tripText
      username
      createdAt
    }
  }
`;

export const GET_WEATHER = gql`
  mutation getWeather($locationKey: String!) {
    getWeather(locationKey: $locationKey) {
      locationKey
      locationName
      temperature
      weatherText
    }
  }
`;

export const GET_FORECAST = gql`
  mutation getForecast($city: String!) {
    getForecast(city: $city) {
      city
      forecast {
        date
        day
        maximum
        minimum
        text
      }
    }
  }
`;

export const CREATE_CHAT_COMPLETION = gql`
  mutation createChatCompletion($model: String!, $messages: [MessageInput!]!) {
    createChatCompletion(model: $model, messages: $messages) {
      _id
      object
      created
      model
      usage {
        prompt_tokens
        completion_tokens
        total_tokens
      }
      choices {
        messages {
          role
          content
        }
        finish_reason
      }
    }
  }
`;
