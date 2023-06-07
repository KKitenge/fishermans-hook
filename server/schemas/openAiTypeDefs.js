const {gql} = require('apollo-server-express');

const typeDefs = gql`
type Message {
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
    message: Message!
    finish_reason: String!
  }

  type Query {
    getChatCompletion(messages: [MessageInput!]!): ChatCompletion
  }

  input MessageInput {
    role: String!
    content: String!
  }

    type Query {
        openAICompletion: OpenAICompletion

        openAIChatCompletion: OpenAIChatCompletion
    }

    type Mutation {
        openAICompletion(prompt: String!, maxTokens: Int!, temperature: Float!, topP: Float!, n: Int!, stream: Boolean!, logprobs: Int!, echo: Boolean!, stop: String!): OpenAICompletion

        openAIChatCompletion(model:String!,messages: String!) : OpenAIChatCompletion
    }


    
        
`;

