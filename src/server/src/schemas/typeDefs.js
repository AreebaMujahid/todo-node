const { ApolloServer, gql } = require('apollo-server');     //ApolloServer is a class, need to create instance of apollo server , gql is template literal


//typedefs is a string used for schema of each prop
//Mutation is used when u are adding or updating something in server
// signup(firstName: String!, lastName: String!, email: String!, phoneno: String, role: String!): User -------->this line means signup mutation will return an object of type User Schema


  

const typeDefs = gql`

  type Query {
    _: Boolean
  }
    
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneno: String
    role: String!
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, phoneno: String, role: String!): User
  }
`;

module.exports = typeDefs;
