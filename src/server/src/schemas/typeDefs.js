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
  type Login{
    email: String!
    phoneno: String
  }
  type Task {
    id: String!
    description: String!
    email: String!
  }

  type Query {
    getTasks: [Task]
    getTaskById(id: String!): Task
  }
    
  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, phoneno: String, role: String!): User
    login(email: String!,phoneno: String ): Login
    addTask(id: String!, description: String!, email: String!): Task
    updateTodo(id: ID!, description: String!): Todo
  }
`;

module.exports = typeDefs;
