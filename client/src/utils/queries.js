import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
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
      trips {
        _id
        tripText
        username
        createdAt
      }
      posts {
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
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
      messages {
        _id
        messageText
        messageAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
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
      trips {
        _id
        tripText
        username
        createdAt
      }
      posts {
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
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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
      trips {
        _id
        tripText
        username
        createdAt
      }
      posts {
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
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query posts {
    posts {
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

export const QUERY_SINGLE_POST = gql`
  query singlePost($postId: ID!) {
    singlePost(postId: $postId) {
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

export const QUERY_FORECAST = gql`
  query forecast($city: String!) {
    forecast(city: $city) {
      Headline {
        text
        category
      }
      DailyForecasts {
        Date
        Temperature {
          minimum {
            Value
            Unit
          }
          maximum {
            Value
            Unit
          }
        }
        Day {
          Icon
          IconPhrase
        }
        Night {
          Icon
          IconPhrase
        }
      }
    }
  }
`;

export const QUERY_TRIPS = gql`
  query trips {
    trips {
      _id
      tripText
      username
      createdAt
    }
  }
`;
