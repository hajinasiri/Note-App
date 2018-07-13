
export default `
  type User {
    id: Int!
    username: String!
    createdAt: String!
    updatedAt: String!
    email: String!
  }
  type Query {
    allUsers: [User!]!
    getUser(username: String!): User
  }
  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    updateUser(username: String!, newUsername: String!): [Int!]!
    deleteUser(username: String!): Int!
    login(email: String!, password: String!): String!
  }
`;