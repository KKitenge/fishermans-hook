const {gql} = require('apollo-server-express');


const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        firstName: String!
        email: String!
        friends: [User]
        trips: [Trip]
        posts: [Post]
        comments: [Comment]
        messages: [Message]

    }

    type Post {
        _id: ID
        postTitle: String!
        postText: String!
        postAuthor: String!
        createdAt: String
        comments: [Comment]
    }

    type Comment {
        id: ID
        commentText: String!
        commentAuthor: String!
        createdAt: String
    }

    type Message {
        id: ID
        messageText: String!
        messageAuthor: String!
        createdAt: String
    }

    type Forecast {
        Headline: Headline
        DailyForecasts: [DailyForecast]
    }

    type Headline {
        text: String
        category: String
    }

    type DailyForecast {
        Date: String!
        Temperature: ForecastTemperature
        Day: Day
        Night: Night
    }

    type ForecastTemperature {
        minimum: Temperature
        maximum: Temperature
    }

    type Day {
        iconPhrase: String
    }

    type Night {
        iconPhrase: String
    }

        

    type Weather {
        weatherText: String!
        temperature: Temperature!
    }

    type Temperature {
        Metric: Metric!
    }

    type Metric {
        Value: Float
        Unit: String
    }


    type Trip {
        id: ID
        destination: String!
        time: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input AMessagesInput {
        role: String!
        content: String!
      }
    
      type ChatCompletion {
        id: ID!
        object: String!
        created: Int!
        model: String!
        usage: Usage!
        choices: [Choice!]!
      }
    
      type Usage {
        prompt_tokens: Int!
        completion_tokens: Int!
        total_tokens: Int!
      }
    
      type Choice {
        amessages: AMessages!
        finish_reason: String!
      }
    
      type AMessages {
        role: String!
        content: String!
      }
  

    
    


    type Query {
        me: User
        users: [User]
        user(username: String!): User
        post(_id: ID!): Post
        posts: [Post]
        comments(postId: ID!): [Comment]
        comment(commentId: ID!): Comment
        messages(userId:ID!):[Message]
        message(messageId: ID!): Message
        trips(username: String): [Trip]
        trip(tripId: ID!): Trip
        getWeather(locationKey: String!): Weather
        getForecast(city: String!): Forecast
        ChatCompletion(model: String!, amessages: [AMessagesInput!]!): ChatCompletion
        
        
       

    
    }

    type Mutation {
        createChatCompletion(model: String!, amessages: [AMessagesInput!]!): ChatCompletion
        addUser(username: String!, firstName: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addPost(postTitle: String!, postText: String!): Post
        addComment(postId: ID!, commentText: String!): Post
        newMessage(messageText: String!, username: String!): Message
        addTrip(username: String!, destination: String!, time: String!): Trip
        addFriend(username: String!): User
        removeFriend(username: String!): User
        removePost(postId: ID!): Post
        removeComment(postId: ID!, commentId: ID!): Post
        deleteMessage(messageId: ID!): Message
        removeTrip(tripId: ID!): Trip
        getWeather(locationKey: String!): Weather
        getForecast(city: String!): Forecast
        
    }
    
`;
   
module.exports = typeDefs;