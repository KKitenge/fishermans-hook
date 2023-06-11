import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me{
    me{
      _id
      username
      firstName
      email
      trips {
        id
        destination
        time
      }
      posts {
        _id
        postTitle
        postText
        postAuthor
        createdAt
        comments {
          id
          commentText
          commentAuthor
          createdAt
        }
      }
      messages {
        id
        messageText
        messageAuthor
        createdAt
      }
      friends {
        username
        email
        _id
        firstName
      }
      comments {
        id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_MESSAGES = gql`
query Messages($userId: ID!) {
    messages(userId: $userId) {
      messageAuthor
      id
      createdAt
      messageText
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
        }
    } 
`;

// export const QUERY_USER = gql`
//     query user($username: String!) {
//         user(username:$username) {
//             _id
//             username
//             firstName
//             email
//             friends {
//                 _id
//                 username
//                 firstName
//                 email
//             }
//             trips {
//                 _id
//                 tripText
//                 username
//                 createdAt
//             }
//             posts {
//                 _id
//                 postTitle
//                 postText
//                 postAuthor
//                 createdAt
//                 comments {
//                     _id
//                     commentText
//                     commentAuthor
//                     createdAt
//                 }
//             }
//             comments {
//                 _id
//                 commentText
//                 commentAuthor
//                 createdAt
//             }
//         }
//     }
// `;

// export const QUERY_POSTS = gql`
//     query posts {
//         posts {
//             _id
//             postTitle
//             postText
//             postAuthor
//             createdAt
//             comments {
//                 _id
//                 commentText
//                 commentAuthor
//                 createdAt
//             }
//         }
//     }
// `;

// export const QUERY_SINGLE_POST = gql`
//     query singlePost($postId: ID!) {
//         singlePost(postId:$postId) {
//             _id
//             postTitle
//             postText
//             postAuthor
//             createdAt
//             comments {
//                 _id
//                 commentText
//                 commentAuthor
//                 createdAt
//             }
//         }
//     }
// `;

// export const QUERY_FORCAST = gql`
//     query forcast($city: String!) {
//         forcast(city:$city) {
//             Headline {
//                 text
//                 category
//             }
//             DailyForecasts {
//                 Date
//                 Temperature {
//                     minimum {
//                         Value
//                         Unit
//                     }
//                     maximum {
//                         Value
//                         Unit
//                     }
//                 }
//                 Day {
//                     Icon
//                     IconPhrase
//                 }
//                 Night {
//                     Icon
//                     IconPhrase
//                 }
//             }
//         }
//     }
// `;

// export const QUERY_TRIPS = gql`
//     query trips {
//         trips {
//             _id
//             tripText
//             username
//             createdAt
//         }
//     }
// `;



